import { Product } from "@prisma/client";
import { productCategories } from "./constants";

export type ProductCardType = Pick<
  Product,
  | "name"
  | "slug"
  | "brand"
  | "description"
  | "thumbnails"
  | "price"
  | "rating"
  | "id"
>;

export interface ProductSlug {
  slug: string;
}

export interface BrandOptions {
  brand: string;
}

export type ProductCategory = Lowercase<(typeof productCategories)[number]>;

export type FeaturedType = "featured" | "popular";
