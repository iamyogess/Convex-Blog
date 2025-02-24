"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { PencilIcon, Trash2 } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

const ManagePosts = () => {
  const currentUser = useQuery(api.users.currentUser);
  const deletePost = useMutation(api.posts.deletePost);
  const [deletingPostId, setDeletingPostId] = useState(null);

  // Pass userId as an object
  const myPosts = useQuery(
    api.posts.getMyPosts,
    currentUser?._id ? { userId: currentUser._id } : "skip"
  );

  const handleDelete = async (postId: any) => {
    try {
      setDeletingPostId(postId);
      await deletePost({ id: postId });
      toast("Post deleted successfully");
    } catch (error) {
      toast.error("Failed to delete post. Please try again.");
    } finally {
      setDeletingPostId(null);
    }
  };

  if (!currentUser) return <div>Loading user...</div>;
  if (myPosts === undefined) return <div>Loading posts...</div>;
  if (!myPosts?.length) return <div>No posts found.</div>;

  return (
    <section className="w-full mt-24">
      <div className="w-full max-w-screen-xl mx-auto">
        <Table>
          <TableCaption>A list of all the posts.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Caption</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {myPosts?.map((post) => (
              <TableRow key={post._id}>
                <TableCell className="font-medium">{post.title}</TableCell>
                <TableCell>{post.category}</TableCell>
                <TableCell>{post.content}</TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-4 justify-end">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="destructive"
                          disabled={deletingPostId === post._id}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle className="dark:text-gray-100">
                            Delete Post
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-gray-800 dark:text-gray-300">
                            Are you sure you want to delete this post? This
                            action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(post._id)}
                            disabled={deletingPostId === post._id}
                            className="bg-red-500 text-white hover:bg-red-800"
                          >
                            {deletingPostId === post._id
                              ? "Deleting..."
                              : "Delete Post"}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <Link href={`/posts/edit/${post._id}`}>
                      <Button variant="outline">
                        <PencilIcon className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default ManagePosts;
