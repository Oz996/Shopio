import { Product } from "@prisma/client";

export interface CartItem extends Product {
  quantity: number;
}

export type ActionTypes =
  | { type: "ADD"; payload: Product; quantity: number }
  | { type: "REMOVE"; payload: Product }
  | { type: "INCREMENT"; payload: Product }
  | { type: "DECREMENT"; payload: Product }
  | { type: "SET_QUANTITY"; payload: Product; quantity: number }
  | { type: "CLEAR" };

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  clearCart: () => void;
  setQuantity: (product: Product, quantity: number) => void;
  removeFromCart: (product: Product) => void;
  incrementQuantity: (product: Product) => void;
  decrementQuantity: (product: Product) => void;
}
