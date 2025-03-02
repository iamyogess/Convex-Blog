import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  ...authTables,
  users: defineTable({
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
    // Custom field.
    favoriteColor: v.optional(v.string()),
    bio: v.optional(v.string()),
    pronouns: v.optional(v.string()),
    /*
     * must be optional because OAuth providers don't return a role
     */
    role: v.optional(
      v.union(v.literal("read"), v.literal("write"), v.literal("admin"))
    ),
  })
    .index("email", ["email"])
    .index("phone", ["phone"]),
  posts: defineTable({
    title: v.string(),
    content: v.string(),
    category: v.string(),
    images: v.optional(v.string()),
    userId: v.id("users"),
  }).index("by_user", ["userId"]),
});
