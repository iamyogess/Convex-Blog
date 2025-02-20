import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "./_generated/server";
import { checkPermission, VALID_ROLES } from "./lib/permissions";

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
