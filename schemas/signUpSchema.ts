import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(3)
  .max(20, "Max 20 characters!")
  .regex(
    /^[a-zA-Z0-9_]+$/,
    "Username can only contain letters, numbers, and underscores"
  );

export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email({ message: "Invalid email address!" }),
  password: z
    .string()
    .min(6, { message: "Password length must be at least 6 characters!" }),
});
