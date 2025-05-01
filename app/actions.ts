"use server";

import prisma from "@/lib/prisma/prisma";
import { reviewSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";

export async function submitReviewAction(prevState: any, formData: FormData) {
  const id = formData.get("id")?.toString() as string;
  const rating = Number(formData.get("rating"));
  const content = formData.get("content")?.toString() as string;
  const userEmail = formData.get("userEmail")?.toString() as string;

  const result = reviewSchema.safeParse({
    content,
    rating,
  });

  if (!result.success) {
    console.log("errr", result.error.errors);
    // also returning content to persist input field if error
    return {
      errors: result.error.errors,
      data: content,
    };
  }

  const product = await prisma.product.findUnique({
    where: { id },
    select: {
      rating: true,
      _count: { select: { reviews: true } },
    },
  });

  if (!product) throw new Error("Product not found");

  const currentTotal = product.rating * product._count.reviews;
  const newTotal = currentTotal + rating;
  const newAverage = newTotal / (product._count.reviews + 1);

  const rounded = Math.round(newAverage * 2) / 2;

  try {
    await prisma.review.create({
      data: {
        name: "",
        rating,
        content,
        productId: id,
        user_email: userEmail,
      },
    });

    await prisma.product.update({
      where: {
        id,
      },
      data: {
        rating: rounded,
      },
    });
    revalidatePath("/product");
    return { success: true };
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong");
  }
}
