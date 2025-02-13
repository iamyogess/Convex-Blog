import { z } from "zod";
import { zid } from "convex-helpers/server/zod";

export const createPostSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title should contain at least 3 characters!" }),
  images: z.string().optional(),
  content: z.string(),
  category: z.string(),
});

export const updatePostSchema = z.object({
  id: zid("posts"),
  title: z
    .string()
    .min(3, { message: "Title should contain at least 3 characters!" }),
  content: z
    .string()
    .min(10, { message: "At least 10 characters are required!" }),
  category: z.string(),
});

export const deletePostSchema = z.object({
  id: zid("posts"),
});

export const getAPostSchema = z.object({
  id: zid("posts"),
});
