"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { PencilIcon, Trash2 } from "lucide-react";
import Link from "next/link";

const AllPosts = () => {
  const allPosts = useQuery(api.posts.getPosts);

  return (
    <div className="w-full mt-24">
      <div className="w-full max-w-screen-xl mx-auto">
        <Table>
          <TableCaption>A list of all the posts.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Caption</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allPosts?.map((post) => (
              <TableRow key={post._id}>
                <TableCell className="font-medium">{post.title}</TableCell>
                <TableCell>{post.category}</TableCell>
                <TableCell>{post.content}</TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-4">
                    <Button variant="destructive">
                      <Trash2 className="h-4" />
                    </Button>
                    <Link href="#">
                      <Button variant="outline">
                        <PencilIcon className="h-4" />
                      </Button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AllPosts;
