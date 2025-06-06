import { ProductCardType } from "../types";

type BooleanValues<T> = {
  [key in keyof T]: boolean;
};

type ProductCardSelect = BooleanValues<ProductCardType>;

export const productCardSelect: ProductCardSelect = {
  description: true,
  thumbnails: true,
  rating: true,
  brand: true,
  price: true,
  name: true,
  slug: true,
  id: true,
};
