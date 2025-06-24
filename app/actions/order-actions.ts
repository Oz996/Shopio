"use server";

import { CartItem } from "@/contexts/cart-context/cart-types";
import prisma from "@/lib/prisma/prisma";
import { OrderReturnType } from "./action-types";
import { getCurrentUser } from "../get-user";

export async function submitOrderAction(
  prevSate: OrderReturnType,
  products: CartItem[]
) {
  const user = await getCurrentUser();

  if (!user) {
    return {
      error: "Sign in to submit order",
    };
  }

  const order = await prisma.order.create({
    data: {
      userId: user.id,
    },
  });

  for (const product of products) {
    await prisma.orderItem.create({
      data: {
        orderId: order.id,
        quantity: product.quantity,
        productId: product.id,
      },
    });
  }

  return { success: true };
}
