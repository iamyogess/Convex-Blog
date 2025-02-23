"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import React from "react";

const ManagePosts = () => {
  const currentUser = useQuery(api.users.currentUser);
  
  // Pass userId as an object
  const myPosts = useQuery(
    api.posts.getMyPosts,
    currentUser?._id ? { userId: currentUser._id } : "skip"
  );
  
  console.log("my id", currentUser?._id);
  console.log("my posts", myPosts);

  if (!currentUser) return <div>Loading user...</div>;
  if (myPosts === undefined) return <div>Loading posts...</div>;
  if (!myPosts?.length) return <div>No posts found.</div>;

  return (
    <div>
      {myPosts.map((post) => (
        <div key={post._id}>{post.title}</div>
      ))}
    </div>
  );
};

export default ManagePosts;