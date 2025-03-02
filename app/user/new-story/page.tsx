"use client";

import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GalleryHorizontal } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createPostSchema } from "@/schemas/postSchema";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { toast } from "react-hot-toast";
import Image from "next/image";

const NewStory = () => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const createPost = useMutation(api.posts.createPost);
  const isAllowedToPost = useQuery(api.auth.getMe);
  const isBlogger = isAllowedToPost?.role === "write";
  const generateUploadUrl = useMutation(api.posts.generateUploadUrl);

  const form = useForm<z.infer<typeof createPostSchema>>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: "",
      content: "",
      category: "",
      images: "",
    },
  });

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

  const handleCreatePost = async (data: z.infer<typeof createPostSchema>) => {
    try {
      let imageStorageId = data.images;

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

      await createPost({
        title: data.title,
        content: data.content,
        category: data.category,
        images: imageStorageId,
      });
      form.reset();
      setSelectedImage(null);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }
      toast.success("Post created!");
    } catch (error) {
      toast.error("Post creation error!");
      console.error("Post creation error", error);
    }
  };

  if (!isAllowedToPost) return <div className="mt-52">Loading...</div>;
  if (!isBlogger) return <div className="mt-52">You are not a blogger!</div>;

  return (
    <div className="min-h-screen mt-32 pb-20">
      <div className="fixed top-0 w-full bg-background border-b dark:border-gray-800 z-10 mt-20">
        <div className="max-w-screen-md mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Draft in {form.watch("category") || "Category"}
          </div>
          <Button
            type="submit"
            onClick={form.handleSubmit(handleCreatePost)}
            className="bg-green-600 hover:bg-green-700 text-white rounded-full px-6"
          >
            {form.formState.isSubmitting ? "Publishing..." : "Publish"}
          </Button>
        </div>
      </div>

      <main className="max-w-screen-md mx-auto px-4 pt-24">
        <Form {...form}>
          <form className="space-y-8">
            <div
              className="w-full aspect-[2/1] bg-gray-100 dark:bg-gray-800 rounded-lg flex flex-col justify-center items-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              onClick={() => imageInputRef.current?.click()}
            >
              {previewUrl ? (
                <Image
                  src={previewUrl}
                  height={400}
                  width={600}
                  alt="Selected cover"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <>
                  <GalleryHorizontal className="h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">
                    Add a cover image
                  </p>
                </>
              )}
            </div>

            <FormField
              control={form.control}
              name="images"
              render={() => (
                <FormItem>
                  <FormLabel>Cover Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      ref={imageInputRef}
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Title"
                      {...field}
                      className="border-none text-4xl font-bold py-8 px-0 placeholder:text-4xl placeholder:font-light placeholder:text-gray-400 dark:placeholder:text-gray-600 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Tell your story..."
                      {...field}
                      className="min-h-[50vh] resize-none border-none text-xl leading-relaxed px-0 placeholder:text-2xl placeholder:text-gray-400 dark:placeholder:text-gray-600 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Add a topic..."
                      {...field}
                      className="border-none text-lg py-4 px-0 placeholder:text-gray-400 dark:placeholder:text-gray-600 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </main>
    </div>
  );
};

export default NewStory;
