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
export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated!");

    const isWriter = await checkPermission(ctx, userId, VALID_ROLES.WRITE);
    if (!isWriter) {
      throw new Error("You do not have access to generate upload url!");
    }

    return await ctx.storage.generateUploadUrl();
  },
});

export const getPostImageUrl = query({
  args: {
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    const imageUrl = await ctx.storage.getUrl(args.storageId);
    if (!imageUrl) {
      throw new Error(`No file found for storageId: ${args.storageId}`);
    }
    return imageUrl; 
  },
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

//get my posts
export const getMyPosts = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    //verify if user is authenticated
    const user = await getAuthUserId(ctx);
    if (!user) throw new Error("User is not authenticated!");

    //check if user has write permission
    const hasBloggingAccess = await checkPermission(
      ctx,
      user,
      VALID_ROLES.WRITE
    );
    if (!hasBloggingAccess)
      throw new Error("You do not have access to view this page!");

    // Use the "by_user" index we created to efficiently fetch posts
    const posts = await ctx.db
      .query("posts")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      // Optionally order by creation time, newest first
      .order("desc")
      .collect();

    return posts;
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
      images:args.images || "",
      userId,
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
