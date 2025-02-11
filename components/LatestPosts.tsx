import React from "react";
import BlogCard from "./BlogCard";

const LatestPosts = () => {
  return (
    <section className="w-full px-6 py-6">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-3xl lg:text-4xl font-semibold mb-6">Latest Posts</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <BlogCard key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestPosts;
