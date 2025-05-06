"use server";

import { signIn } from "@/auth";
import prisma from "@/lib/prisma/prisma";
import { signUpSchema } from "@/lib/schemas";
import { AuthError } from "next-auth";
import { AuthenticateReturnType, SignUpReturnType } from "./action-types";
import { redirect } from "next/navigation";

export async function authenticate(
  prevState: AuthenticateReturnType,
  formData: FormData
) {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  let success;

  try {
    await signIn("credentials", { email, password, redirect: false });
    success = true;
  } catch (error) {
    success = false;
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "Invalid credentials.",
            data: email,
          };

        default:
          return {
            error: "Something went wrong.",
            data: email,
          };
      }
    }
    throw error;
  }

  if (success) redirect("/home");
}

export async function signUp(prevState: SignUpReturnType, formData: FormData) {
  let success;

  try {
    const email = formData.get("email")?.toString() as string;
    const name = formData.get("name")?.toString() as string;
    const password = formData.get("password")?.toString() as string;
    const cPassword = formData.get("cPassword")?.toString() as string;

    const result = signUpSchema.safeParse({
      email,
      password,
      cPassword,
    });

    if (!result.success) {
      return {
        errors: result.error.errors.map((error) => ({
          message: error.message,
        })),
        data: {
          email,
          password,
          cPassword,
        },
      };
    }

    await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    await signIn("credentials", { email, password, redirect: false });
    success = true;
  } catch (error) {
    success = false;
    console.error(error);
    throw new Error("Something went wrong");
  }

  if (success) redirect("/home");
}
