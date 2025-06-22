import { ActionTypes, CartItem } from "./cart-types";

export function cartReducer(cart: CartItem[], action: ActionTypes) {
  switch (action.type) {
    case "ADD": {
      const productIndex = cart.findIndex(
        (product) => product.id === action.payload.id
      );

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

    case "INCREMENT": {
      const productIndex = cart.findIndex(
        (product) => product.id === action.payload.id
      );

      if (productIndex !== -1) {
        const updatedProduct = {
          ...cart[productIndex],
          quantity: cart[productIndex].quantity + 1,
        };

        const updatedCart = [...cart];
        updatedCart[productIndex] = updatedProduct;

        return updatedCart;
      }

      return cart;
    }

    case "DECREMENT": {
      const productIndex = cart.findIndex(
        (product) => product.id === action.payload.id
      );

      if (productIndex !== -1) {
        const product = cart[productIndex];

        if (product.quantity === 1) {
          return cart.filter((product) => product.id !== action.payload.id);
        }

        const updatedProduct = {
          ...product,
          quantity: cart[productIndex].quantity - 1,
        };

        const updatedCart = [...cart];
        updatedCart[productIndex] = updatedProduct;

        return updatedCart;
      }

      return cart;
    }

    case "REMOVE": {
      const productIndex = cart.findIndex(
        (product) => product.id === action.payload.id
      );

      if (productIndex !== -1) {
        return cart.filter((product) => product.id !== action.payload.id);
      }

      return cart;
    }

    case "SET_QUANTITY": {
      const productIndex = cart.findIndex(
        (product) => product.id === action.payload.id
      );

      if (productIndex !== -1) {
        const updatedProduct = {
          ...cart[productIndex],
          quantity: action.quantity,
        };

        const updatedCart = [...cart];
        updatedCart[productIndex] = updatedProduct;

        return updatedCart;
      }
    }

    case "CLEAR": {
      return (cart = []);
    }

    default: {
      return cart;
    }
  }
}
