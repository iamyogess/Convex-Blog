import { mutation, query } from "./_generated/server";
import {
  createPostSchema,
  updatePostSchema,
  deletePostSchema,
  getAPostSchema,
} from "@/schemas/postSchema";
import { zCustomMutation } from "convex-helpers/server/zod";
import { NoOp } from "convex-helpers/server/customFunctions";
import { v } from "convex/values";

const zMutation = zCustomMutation(mutation, NoOp);

//get posts
export const getPosts = query({
  handler: async (ctx) => {
    const posts = await ctx.db.query("posts").collect();
    return posts.reverse();
  },
});

export const getAPost = query({
  //   args: getAPostSchema.shape,
  args: { postId: v.id("posts") },
  handler: async (ctx, args) => {
    const post = await ctx.db.get(args.postId);

    if (!post) {
      throw new Error("Post not found");
    }

    return post;
  },
});
//create post
export const createPost = zMutation({
  args: createPostSchema.shape,
  handler: async (ctx, args) => {
    return ctx.db.insert("posts", {
      title: args.title,
      images: args.images,
      content: args.content,
      category: args.category,
    });
  },
});

//update post
export const updatePost = zMutation({
  args: updatePostSchema.shape,
  handler: async (ctx, args) => {
    return ctx.db.patch(args.id, {
      title: args.title,
      images: args.images,
      content: args.content,
      category: args.category,
    });
  },
});

//delete post
export const deletePost = zMutation({
  args: deletePostSchema.shape,
  handler: async (ctx, args) => {
    return ctx.db.delete(args.id);
  },
});
