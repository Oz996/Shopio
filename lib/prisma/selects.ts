import { ProductCardType } from "../types";

type BooleanValues<T> = {
  [key in keyof T]: boolean;
};

type ProductCardSelect = BooleanValues<ProductCardType>;

export const productCardSelect: ProductCardSelect = {
  brand: true,
  description: true,
  thumbnails: true,
  rating: true,
  name: true,
  slug: true,
  price: true,
  id: true,
};
