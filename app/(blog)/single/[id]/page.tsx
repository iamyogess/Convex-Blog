"use client";

import React from "react";
import { Clock, User, Calendar } from "lucide-react";
import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";

const BlogPost = () => {
  const params = useParams();
  const id = params?.id as string | undefined;

  const singlePost = useQuery(api.posts.getAPost, {
    postId: id as Id<"posts">,
  });
  const author = useQuery(api.users.getUserWithId, {
    userId: singlePost?.userId as Id<"users">,
  });

  const postImageUrl = useQuery(
    api.posts.getPostImageUrl,
    singlePost?.images
      ? { storageId: singlePost.images as Id<"_storage"> }
      : "skip"
  );

  const authorImageUrl = useQuery(
    api.users.getImageUrl,
    author?.image ? { storageId: author.image as Id<"_storage"> } : "skip"
  );

  // Handle loading state
  if (singlePost === undefined || author === undefined) {
    return (
      <div className="w-full h-full">
        <div className="max-w-screen-lg mx-auto min-h-screen mt-20">
          Loading...
        </div>
      </div>
    );
  }

  // Handle error state (no post found)
  if (singlePost === null) {
    return (
      <div className="w-full h-full">
        <div className="max-w-screen-lg mx-auto min-h-screen mt-20">
          Post not found
        </div>
      </div>
    );
  }

  // Convert _creationTime to readable date (milliseconds to Date)
  const creationDate = new Date(singlePost._creationTime).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  // Calculate reading time (assuming 200 words per minute)
  const wordCount = singlePost.content.split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="min-h-screen mt-20 lg:mt-28">
      <main className="container mx-auto px-4 py-8">
        <article className="mx-auto max-w-3xl">
          {/* Featured Image */}
          <div className="mb-8 overflow-hidden rounded-lg">
            <Image
              src={
                postImageUrl ||
                "https://images.pexels.com/photos/8052684/pexels-photo-8052684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              }
              alt={singlePost.title}
              className="object-cover"
              height={400}
              width={800}
            />
          </div>

          {/* Article Header */}
          <div className="mb-8">
            <h1 className="mb-4 text-3xl font-bold">{singlePost.title}</h1>

            {/* Article Metadata */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{author?.name || "Unknown Author"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{creationDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>
                  {readingTime} min{readingTime !== 1 ? "s" : ""} read
                </span>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="prose max-w-none">
            <p className="mb-6 text-lg leading-relaxed dark:text-gray-200">
              {singlePost.content}
            </p>
          </div>

          {/* Author Bio */}
          <div className="mt-12 rounded-lg p-6 border">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 overflow-hidden rounded-full">
                <Image
                  src={
                    authorImageUrl ||
                    "https://images.pexels.com/photos/18390118/pexels-photo-18390118/free-photo-of-sitting-woman-against-orange-background.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  }
                  alt={author?.name || "Author"}
                  className="object-cover"
                  height={200}
                  width={200}
                />
              </div>
              <div>
                <h3 className="font-semibold">
                  {author?.name || "Unknown Author"}
                </h3>
                <p className="text-sm dark:text-gray-300">
                  {author?.bio || "Frontend Developer & Technical Writer"}
                </p>
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
};

export default BlogPost;
