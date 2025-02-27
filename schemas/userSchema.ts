import { z } from "zod";
import { zid } from "convex-helpers/server/zod";

export const userSchema = z.object({
  id: zid("users"),
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long!" }),
  bio: z.string().max(150, { message: "Max 150 characters!" }),
  pronouns: z.string(),
  image: z.string().optional(),
});
