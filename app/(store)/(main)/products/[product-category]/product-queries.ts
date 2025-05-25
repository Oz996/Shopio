import prisma from "@/lib/prisma/prisma";
import { productCardSelect } from "@/lib/prisma/selects";
import { BrandOptions, ProductCardType, ProductCategory } from "@/lib/types";

const select = {
  ...productCardSelect,
};

export function searchParamsConstructor(
  category: ProductCategory,
  args: Record<string, string>
) {
  const where: QueryType = {
    category,
    price: { gt: 0, lt: 100_000_000_000 },
    description: {
      contains: "",
    },
  };

  const { brand, price, ...specs } = args;

  // assigning specs dynamically
  const type = category.slice(0, -1) as Specification;

  where[type] = {
    ...specs,
  };

  if (brand) {
    where.brand = brand;
  }

  if (price) {
    const prices = price?.split("-");
    const priceFrom = Number(prices[0]);
    const priceTo = Number(prices[1]);

    where.price.gt = priceFrom;
    where.price.lt = priceTo;
  }

  return where;
}

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

export async function getSpecs(
  category: ProductCategory
): Promise<Record<string, string[]>> {
  const type = category.slice(0, -1);
  const results = await prisma.product.findMany({
    where: { category },
    select: {
      [type]: true,
    },
  });

  const specs: Record<string, Set<any> | string[]> = {};

  for (const key of Object.keys(results[0][type])) {
    if (key !== "id" && key !== "productId") {
      // using Sets to avoid duplicate values, later converting them to arrays
      specs[key] = new Set();
    }
  }

  const specValues = results.map((object) => object[type]);

  for (const spec of specValues) {
    for (const key in spec) {
      if (specs[key] && !Array.isArray(specs[key])) specs[key].add(spec[key]);
    }
  }

  for (const spec of Object.keys(specs)) {
    specs[spec] = Array.from(specs[spec]);
  }

  return specs as Record<string, string[]>;
}

type Specification = "monitor" | "headphone";

interface QueryType {
  category: string;
  brand?: string;
  price: { gt: number; lt: number };
  description: {
    contains: string;
  };
  monitor?:
    | {
        id: string;
        resolution: string;
        refresh_rate: string;
        panel_type: string;
        productId: string;
      }
    | {}
    | null;
  headphone?:
    | {
        id?: string;
        connection?: string;
        battery_life?: string;
        noise_cancelling?: string;
        productId?: string;
      }
    | {}
    | null;
}
