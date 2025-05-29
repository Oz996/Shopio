import { sortOptions } from "@/lib/constants";
import prisma from "@/lib/prisma/prisma";
import { productCardSelect } from "@/lib/prisma/selects";
import { BrandOptions, ProductCardType, ProductCategory } from "@/lib/types";
import { removeDuplicates } from "@/lib/utils";

const select = {
  ...productCardSelect,
};

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
    const priceFrom = Number(prices[0]) - 1;
    const priceTo = Number(prices[1]) + 1;

    where.price.gte = priceFrom;
    where.price.lte = priceTo;
  }

  // sorting logic

  let orderBy: Record<string, OrderByOptions | {}> = { createdAt: "asc" };

  if (sort) {
    let type = sort;
    let order = "";

    if (sort.includes("name")) type = "brand";
    if (sort.includes("price")) type = "price";

    if (sort.endsWith("asc")) order = "asc";
    if (sort.endsWith("desc")) order = "desc";

    if (sort === "popularity") {
      orderBy = { reviews: { _count: "desc" } };
    } else if (sort === "recommended") {
      orderBy = { createdAt: "asc" };
    } else {
      orderBy = { [type]: order };
    }
  }

  return { where, orderBy };
}

export async function productsQuery(
  query: QueryType,
  orderBy?: any
): Promise<ProductCardType[]> {
  return await prisma.product.findMany({
    where: query,
    select,
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

type Specification = "monitor" | "headphone";

type OrderByOptions = (typeof sortOptions)[number]["value"];

interface QueryType {
  category: string;
  brand?: string;
  price: { gte: number; lte: number };
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
