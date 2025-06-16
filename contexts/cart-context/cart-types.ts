import { Product } from "@prisma/client";

export interface CartItem extends Product {
  quantity: number;
}

export type ActionTypes =
  | { type: "ADD"; payload: Product; quantity: number }
  | { type: "REMOVE"; payload: Product };

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (product: Product) => void;
}
