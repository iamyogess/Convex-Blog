"use client";

import React from "react";
import BlogCard from "./BlogCard";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

// Define a type that matches what comes from api.posts.getPosts
interface PostType {
  _id: Id<"posts">;
  creationTime: number; // This is added automatically by Convex
  title: string;
  content: string;
  category: string;
  images: string; // In createPost function, it's set to empty string if undefined
  userId: Id<"users">;
}

const LatestPosts = () => {
  const posts = useQuery(api.posts.getPosts) || [];

  return (
    <section className="w-full px-6 py-6">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-3xl lg:text-4xl font-semibold mb-6">
          Latest Posts
        </h1>
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostWithImage key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No posts available.</p>
        )}
      </div>
    </section>
  );
};

const PostWithImage = ({ post }: { post: PostType }) => {
  const imageUrl = useQuery(
    api.posts.getPostImageUrl,
    post.images ? { storageId: post.images } : "skip"
  );

  return <BlogCard post={post} imageUrl={imageUrl} />;
};

export default LatestPosts;