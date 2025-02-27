import { Product } from "@prisma/client";

export type ProductCardType = Pick<
  Product,
  "name" | "slug" | "brand" | "description" | "images" | "price" | "id"
>;
