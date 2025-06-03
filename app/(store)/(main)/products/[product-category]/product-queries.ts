import prisma from "@/lib/prisma/prisma";
import { productCardSelect } from "@/lib/prisma/selects";
import {
  BrandOptions,
  ProductCardType,
  ProductCategory,
  SortValue,
} from "@/lib/types";
import { removeDuplicates } from "@/lib/utils";
import {
  QueryType,
  SortReturnValue,
  Specification,
} from "./product-query-types";

export function searchParamsConstructor(
  category: ProductCategory,
  args: Record<string, string>
) {
  const where: QueryType = {
    category,
    price: { gte: 0, lte: 100_000_000_000 },
    description: {
      contains: "",
    },
  };

  const { brand, price, sort, ...specs } = args;

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

    where.price.gte = priceFrom;
    where.price.lte = priceTo;
  }

  return where;
}

export function sortResults(value: SortValue): SortReturnValue {
  if (!value) return;

  if (value === "recommended") {
    return { createdAt: "asc" };
  }

  if (value === "popularity") {
    return { reviews: { _count: "desc" } };
  }

  if (value.includes("name")) {
    if (value.endsWith("asc")) return { brand: "asc" };
    else return { brand: "desc" };
  }

  if (value.includes("price")) {
    if (value.endsWith("asc")) return { price: "asc" };
    else return { price: "desc" };
  }
}

export async function productsQuery(
  query: QueryType,
  orderBy?: any
): Promise<ProductCardType[]> {
  return await prisma.product.findMany({
    where: query,
    select: { ...productCardSelect },
    orderBy,
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

  const specs: Record<string, string[]> = {};

  // creating an empty array in the specs object for each type of specialization found
  for (const key of Object.keys(results[0][type])) {
    if (key !== "id" && key !== "productId") {
      specs[key] = [];
    }
  }

  // extracting values from each products category data
  const specValues = results.map((object) => object[type]);

  // type checking and making sure a value exists before assigning it to its array
  for (const spec of specValues) {
    for (const key in spec) {
      if (specs[key] && typeof spec[key] === "string")
        specs[key].push(spec[key]);
    }
  }

  // removing any duplicate values
  for (const [key, value] of Object.entries(specs)) {
    specs[key] = removeDuplicates(value);
  }

  return specs;
}

//
