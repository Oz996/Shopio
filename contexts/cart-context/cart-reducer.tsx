import { ActionTypes, CartType } from "./cart-types";

export function cartReducer(cart: CartType, action: ActionTypes) {
  const productIndex = cart.findIndex(
    (product) => product.id === action.payload.id
  );

  switch (action.type) {
    case "ADD": {
      if (productIndex !== -1) {
        const updatedProduct = {
          ...cart[productIndex],
          quantity: cart[productIndex].quantity + action.quantity,
        };

        const updatedCart = [...cart];
        updatedCart[productIndex] = updatedProduct;

        return updatedCart;
      } else {
        const newProduct = {
          ...action.payload,
          quantity: action.quantity,
        };

        return [...cart, newProduct];
      }
    }

    case "REMOVE": {
      if (productIndex !== -1) {
        return cart.filter((product) => product.id !== action.payload.id);
      }
    }

    default: {
      return cart;
    }
  }
}
