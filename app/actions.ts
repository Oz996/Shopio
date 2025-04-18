"use server";

import prisma from "@/lib/prisma/prisma";
import { Review } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function helpfulReviewAction(
  reviews: Review[],
  id: string,
  userEmail: string
) {
  const review = reviews.find((review) => review.id === id);

  if (!review) {
    throw new Error("Review not found");
  }

  const isHelpful = review.helpful.includes(userEmail);

  const updatedHelpful = isHelpful
    ? review.helpful.filter((email) => email !== userEmail)
    : [...review.helpful, userEmail];

  try {
    await prisma.review.update({
      where: { id },
      data: { helpful: updatedHelpful },
    });
    revalidatePath("/product");
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong");
  }
}

export async function submitReviewAction(
  id: string,
  rating: number,
  content: string,
  userEmail: string
) {
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
        helpful: [],
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
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong");
  }
}
