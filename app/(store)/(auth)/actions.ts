"use server";

import { signIn } from "@/auth";
import prisma from "@/lib/prisma/prisma";
import { signUpSchema } from "@/lib/schemas";
import { AuthError } from "next-auth";
import { ZodIssue } from "zod";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
  callbackUrl = "/home"
) {
  try {
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    await signIn("credentials", { email, password, redirectTo: callbackUrl });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function signUp(
  prevState: ZodIssue[] | undefined,
  formData: FormData,
  callbackUrl = "/home"
) {
  try {
    const email = formData.get("email")?.toString() as string;
    const name = formData.get("name")?.toString() as string;
    const password = formData.get("password")?.toString() as string;
    const cPassword = formData.get("cPassword")?.toString() as string;

    const result = signUpSchema.safeParse({
      email,
      password,
      cPassword,
      redirectTo: callbackUrl,
    });

    if (!result.success) {
      return result.error.errors;
    }

    await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    await signIn("credentials", { email, password, redirectTo: callbackUrl });
  } catch (error) {
    console.error(error);
  }
}
