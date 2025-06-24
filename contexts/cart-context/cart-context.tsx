import { createContext, ReactNode, useEffect, useReducer } from "react";
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

  function incrementQuantity(product: Product) {
    dispatch({ type: "INCREMENT", payload: product });
  }

  function decrementQuantity(product: Product) {
    dispatch({ type: "DECREMENT", payload: product });
  }

  function setQuantity(product: Product, quantity: number) {
    dispatch({ type: "SET_QUANTITY", payload: product, quantity });
  }

  function clearCart() {
    dispatch({ type: "CLEAR" });
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        clearCart,
        setQuantity,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
