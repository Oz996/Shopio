import { z } from "zod";

export const signUpSchema = z
  .object({
    email: z.string().email().trim(),
    password: z
      .string()
      .min(4, { message: "Password must be at least 4 characters" })
      .trim(),
    cPassword: z
      .string()
      .min(4, { message: "Confirm Password must be at least 4 characters" })
      .trim(),
  })
  .refine((data) => data.password === data.cPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
