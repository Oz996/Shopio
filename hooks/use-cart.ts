import { CartContext } from "@/contexts/cart-context/cart-context";
import { use } from "react";

export function useCart() {
  const cart = use(CartContext);

  if (!cart) throw new Error("Failed to use CartContext");

  return cart;
}
