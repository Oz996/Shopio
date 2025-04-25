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

export const reviewSchema = z.object({
  content: z.string().max(300, { message: "Review is too long" }),
  rating: z.number().positive({ message: "Rating is required" }),
});
