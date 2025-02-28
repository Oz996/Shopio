import { Product } from "@prisma/client";

export type ProductCardType = Pick<
  Product,
  "name" | "slug" | "brand" | "description" | "thumbnails" | "price" | "id"
>;

export interface ProductSlug {
  slug: string;
}
