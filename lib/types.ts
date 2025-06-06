import { Product } from "@prisma/client";
import { productCategories, sortOptions } from "./constants";

export type ProductCardType = Pick<
  Product,
  | "description"
  | "thumbnails"
  | "rating"
  | "brand"
  | "price"
  | "name"
  | "slug"
  | "id"
>;

export interface BrandOptions {
  brand: string;
}

export type ProductCategory = Lowercase<(typeof productCategories)[number]>;

export type SortValue = (typeof sortOptions)[number]["value"];

export type FeaturedType = "featured" | "popular";
