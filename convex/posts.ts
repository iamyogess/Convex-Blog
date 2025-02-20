import { mutation, query } from "./_generated/server";
import { zCustomMutation } from "convex-helpers/server/zod";
import { NoOp } from "convex-helpers/server/customFunctions";
import { v } from "convex/values";
import {
  createPostSchema,
  updatePostSchema,
  deletePostSchema,
} from "../schemas/postSchema";
import { getAuthUserId } from "@convex-dev/auth/server";
import { checkPermission, VALID_ROLES } from "./lib/permissions";

const zMutation = zCustomMutation(mutation, NoOp);

//generateUploadUrl
export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

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
    //verify if user is authenticated
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("User is not authenticated!");

    //check if user has write permission
    const hasBloggingAccess = await checkPermission(
      ctx,
      userId,
      VALID_ROLES.WRITE
    );
    if (!hasBloggingAccess) throw new Error("You do not have access to post!");

    //create a new post
    return ctx.db.insert("posts", {
      title: args.title,
      content: args.content,
      category: args.category,
    });
  },
});

//update post
export const updatePost = zMutation({
  args: updatePostSchema.shape,
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("You are not authenticated!");

    const hasAccess = await checkPermission(ctx, userId, VALID_ROLES.WRITE);
    if (!hasAccess)
      throw new Error("You do not have access to update the post!");

    return ctx.db.patch(args.id, {
      title: args.title,
      content: args.content,
      category: args.category,
    });
  },
});

//delete post
export const deletePost = zMutation({
  args: deletePostSchema.shape,
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("You are not authenticated!");

    const hasAccess = await checkPermission(ctx, userId, VALID_ROLES.WRITE);
    if (!hasAccess)
      throw new Error("You do not have access to delete the post!");

    return ctx.db.delete(args.id);
  },
});
