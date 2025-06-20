import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from "react";
import { CartContextType, CartItem } from "./cart-types";
import { cartReducer } from "./cart-reducer";
import { Product } from "@prisma/client";

export const CartContext = createContext<CartContextType | null>(null);

function savedCart(): CartItem[] {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("cart");
    if (saved) return JSON.parse(saved);
  }
  return [];
}

export function CartContextProvider({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, [], savedCart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(product: Product, quantity: number) {
    dispatch({ type: "ADD", payload: product, quantity });
  }

  function removeFromCart(product: Product) {
    dispatch({ type: "REMOVE", payload: product });
  }

  console.log("cart", cart);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
