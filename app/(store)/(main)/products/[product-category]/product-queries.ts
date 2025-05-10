import prisma from "@/lib/prisma/prisma";
import { productCardSelect } from "@/lib/prisma/selects";
import { ProductCardType, ProductCategory } from "@/lib/types";

export async function productsQuery(
  query: QueryType
): Promise<ProductCardType[]> {
  return await prisma.product.findMany({
    where: query,
    select: productCardSelect,
  });
}

export async function productsBrands(
  category: ProductCategory
): Promise<BrandOptions[]> {
  return await prisma.product.findMany({
    where: { category },
    distinct: ["brand"],
    select: { brand: true },
  });
}

interface QueryType {
  category: string;
  brand?: string;
  price: { gt: number; lt: number };
  description: {
    contains: string;
  };
}

export interface BrandOptions {
  brand: string;
}
