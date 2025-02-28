import { z } from "zod";

export const userSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long!" }),
  bio: z.string().max(150, { message: "Max 150 characters!" }),
  pronouns: z.string(),
  image: z.string().optional(),
});
