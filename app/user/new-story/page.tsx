"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Image } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createPostSchema } from "@/schemas/postSchema";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { toast } from "sonner";

const NewStory = () => {
  const createPost = useMutation(api.posts.createPost);
  const isAllowedToPost = useQuery(api.auth.getMe);
  const isBlogger = isAllowedToPost?.role === "write";

  const form = useForm<z.infer<typeof createPostSchema>>({
    defaultValues: {
      title: "",
      content: "",
      category: "",
    },
  });

  // const handlePostCreationError = (error: unknown) => {
  //   if (error instanceof ConvexError && error.data.ZodError) {
  //     const zodError = error.data.ZodError as ZodIssue[];
  //     const titleError = zodError.find((err) => err.path.includes("title"));
  //     if (titleError) {
  //       form.setError("title", { message: titleError.message });
  //     }
  //     'content'
  //     'category'
  //   } else {
  //   }
  // };

  const handleCreatePost = async (data: z.infer<typeof createPostSchema>) => {
    try {
      await createPost({
        title: data.title,
        content: data.content,
        category: data.category,
      });
      form.reset();
      toast("Post created!")
    } catch (error) {
      console.log("Post creation error", error);
    }
  };

  if (!isBlogger) return <div className="mt-52">You are not a blogger!</div>;

  return (
    <div className="min-h-screen  mt-32 pb-20">
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
            Publish
          </Button>
        </div>
      </div>

      <main className="max-w-screen-md mx-auto px-4 pt-24">
        <Form {...form}>
          <form className="space-y-8">
            <div
              className="w-full aspect-[2/1] bg-gray-100 dark:bg-gray-800 rounded-lg flex flex-col justify-center items-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              onClick={() => console.log("Add image")}
            >
              <Image className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                Add a cover image
              </p>
            </div>

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
