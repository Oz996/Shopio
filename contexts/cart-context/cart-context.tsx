import { createContext, ReactNode, useReducer } from "react";
import { CartContextType, CartType } from "./cart-types";
import { cartReducer } from "./cart-reducer";
import { Product } from "@prisma/client";

export const CartContext = createContext<CartContextType | null>(null);

export function CartContextProvider({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, [] as CartType);

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
