import prisma from "@/lib/prisma/prisma";
import { productCardSelect } from "@/lib/prisma/selects";
import { ProductCardType, ProductCategory } from "@/lib/types";

const select = {
  ...productCardSelect,
};

export async function productsQuery(
  query: QueryType
): Promise<ProductCardType[]> {
  return await prisma.product.findMany({
    where: query,
    select,
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

export async function getSpecs(category: ProductCategory) {
  const type = category.slice(0, -1);
  const results = await prisma.product.findMany({
    where: { category },
    select: {
      [type]: true,
    },
  });

  const specs: Record<string, Set<any> | string[]> = Object.keys(
    results[0][type]
  )
    .filter((key) => key !== "productId" && key !== "id")
    .reduce((acc, key) => {
      acc[key] = results[0][type][key];
      return acc;
    }, {});

  const specValues = results.map((object) => object[type]);

  // using Sets to avoid duplicate values, later converting them to arrays
  for (const key in specs) {
    specs[key] = new Set();
  }

  for (const spec of specValues) {
    for (const key in spec) {
      if (specs[key] && !Array.isArray(specs[key])) specs[key].add(spec[key]);
    }
  }

  for (const spec in specs) {
    specs[spec] = Array.from(specs[spec]);
  }

  return specs;
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
