import React from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { Clock, User } from "lucide-react";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

interface Post {
  _id: Id<"posts">; // Updated from string to match LatestPosts
  title: string;
  content: string;
  category: string;
  images?: string; // Made optional to match LatestPosts
  userId: Id<"users">;
}

interface BlogCardProps {
  post: Post;
  imageUrl?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, imageUrl }) => {
  const wordCount = post.content.split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));
  const author = useQuery(api.users.getUserWithId, { userId: post.userId });

  return (
    <Card className="flex flex-col h-full">
      {imageUrl ? (
        <div className="relative w-full h-48">
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="rounded-t-lg object-cover"
          />
        </div>
      ) : (
        <div className="w-full h-48 bg-gray-200 dark:bg-gray-800 rounded-t-lg flex items-center justify-center">
          <span className="text-gray-400">No image available</span>
        </div>
      )}

      <CardHeader>
        <CardTitle className="text-lg">{post.title}</CardTitle>
        <div className="flex justify-between text-sm text-muted-foreground mt-2">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{author?.name || 'Loading...'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{readingTime} min read</span>
          </div>
        </div>
        <CardDescription className="mt-3">
          {post.content.length > 100
            ? `${post.content.substring(0, 100)}...`
            : post.content}
        </CardDescription>
      </CardHeader>

      <CardFooter className="mt-auto">
        <Link href={`/single/${post._id}`} passHref className="w-full">
          <Button className="w-full">Read More</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;