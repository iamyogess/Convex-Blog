import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  posts: defineTable({
    title: v.string(),
    images: v.string(),
    content: v.string(),
    category: v.string(),
  }),
});
