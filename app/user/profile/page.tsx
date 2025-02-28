"use client";

import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/schemas/userSchema";
import { CameraIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import toast from "react-hot-toast";
import { Id } from "@/convex/_generated/dataModel"; // Import Id type from Convex
import Image from "next/image";

// Update UserProfile to use Id<"_storage"> for image
interface UserProfile {
  name?: string;
  pronouns?: string;
  bio?: string;
  image?: Id<"_storage">; // Use Convex's Id type
}

const Profile = () => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const generateUploadUrl = useMutation(api.users.generateUploadUrl);
  const updateUserDetails = useMutation(api.users.updateUserDetails);
  const currentUser = useQuery(api.users.currentUser) as UserProfile | undefined;

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      pronouns: "",
      bio: "",
      image: "",
    },
  });

  useEffect(() => {
    if (currentUser) {
      form.reset({
        name: currentUser.name || "",
        pronouns: currentUser.pronouns || "",
        bio: currentUser.bio || "",
        image: currentUser.image || "", // This is fine as form expects string
      });
    }
  }, [currentUser, form]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedImage(file);
      setPreviewUrl(url);
    } else {
      setSelectedImage(null);
      setPreviewUrl(null);
    }
  };

  const onSubmit = async (values: z.infer<typeof userSchema>) => {
    try {
      let imageStorageId = values.image;
  
      if (selectedImage) {
        const uploadUrl = await generateUploadUrl();
        const result = await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": selectedImage.type },
          body: selectedImage,
        });
        const { storageId } = await result.json();
        imageStorageId = storageId;
      }
  
      await updateUserDetails({
        name: values.name,
        pronouns: values.pronouns,
        bio: values.bio,
        image: imageStorageId,
      });
  
      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }
      setSelectedImage(null);
  
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Profile could not update!");
      console.error("Error updating profile:", error);
    }
  };

  // Fix the useQuery call to match expected type
  const userImageUrl = useQuery(
    api.users.getImageUrl,
    currentUser?.image ? { storageId: currentUser.image } : "skip" // Use "skip" instead of undefined
  );

  return (
    <div className="mt-24 w-full">
      <div className="w-full max-w-screen-lg mx-auto">
        <div className="flex justify-center items-center flex-col">
          <div className="h-32 w-32 rounded-full flex justify-center items-center border mb-10 overflow-hidden">
            {previewUrl ? (
              <Image src={previewUrl} alt="Profile preview" className="h-full w-full object-cover" height={200} width={200}/>
            ) : userImageUrl ? ( // Remove .imageUrl since getImageUrl returns a string
              <Image src={userImageUrl} alt="Profile" className="h-full w-full object-cover" height={200} width={200}/>
            ) : (
              <CameraIcon />
            )}
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="image"
                render={() => (
                  <FormItem>
                    <FormLabel>Profile Picture</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        ref={imageInputRef}
                        onChange={handleImageChange}
                      />
                    </FormControl>
                    <FormDescription>Your Profile Picture</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pronouns"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pronouns</FormLabel>
                    <FormControl>
                      <Input placeholder="Pronouns" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Bio" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Profile;