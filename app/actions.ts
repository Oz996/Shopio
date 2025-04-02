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

  await prisma.review.update({
    where: { id },
    data: { helpful: updatedHelpful },
  });
  revalidatePath("/product");
}
