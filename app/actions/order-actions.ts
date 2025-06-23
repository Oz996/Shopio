"use server";

import { auth } from "@/auth";
import { CartItem } from "@/contexts/cart-context/cart-types";
import prisma from "@/lib/prisma/prisma";

export async function submitOrderAction(prevSate: any, products: CartItem[]) {
  const session = await auth();

  if (!session) {
    return {
      error: "Sign in to submit order",
    };
  }

  const order = await prisma.order.create({
    data: {
      userId: session.user?.id!,
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
}
