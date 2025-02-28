import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { checkPermission, VALID_ROLES } from "./lib/permissions";
import { zCustomMutation } from "convex-helpers/server/zod";
import { NoOp } from "convex-helpers/server/customFunctions";
import { userSchema } from "./../schemas/userSchema";
import { v } from "convex/values";

const zMutation = zCustomMutation(mutation, NoOp);

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated!");
    return await ctx.storage.generateUploadUrl();
  },
});

export const currentUser = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }
    return await ctx.db.get(userId);
  },
});

export const allUsers = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("You are not authenticated!");

    const isAdmin = await checkPermission(ctx, userId, VALID_ROLES.ADMIN);
    if (!isAdmin)
      throw new Error("You do not have permission to view all users! ");
    return await ctx.db.query("users").collect();
  },
});

export const updateUserDetails = zMutation({
  args: userSchema.shape,
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId)
      throw new Error("You are not authorized to update the details!");

    const patchData = {
      name: args.name,
      pronouns: args.pronouns,
      bio: args.bio,
    };

    return ctx.db.patch(userId, {
      ...patchData,
      ...(args.image ? { image: args.image } : {}),
    });
  },
});

export const getImageUrl = query({
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