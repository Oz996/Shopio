import prisma from "@/lib/prisma/prisma";
import { productCardSelect } from "@/lib/prisma/selects";
import { ProductCardType, ProductCategory } from "@/lib/types";

const select = {
  ...productCardSelect,
  monitor: true,
};

interface ProductQueryType extends ProductCardType {
  monitor: {
    id: string;
    resolution: string;
    refresh_rate: string;
    panel_type: string;
    productId: string;
  } | null;
}

export async function productsQuery(
  query: QueryType
): Promise<ProductQueryType[]> {
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

export async function getMonitorSpecs(category: string) {
  const monitors = await prisma.product.findMany({
    where: { category },
    select: {
      monitor: true,
    },
  });

  const specs = {
    refresh_rate: new Set(),
    resolution: new Set(),
    panel_type: new Set(),
  };

  monitors.map((object) => {
    const monitor = object.monitor;
    if (monitor?.refresh_rate) specs.refresh_rate.add(monitor?.refresh_rate);
    if (monitor?.resolution) specs.resolution.add(monitor?.resolution);
    if (monitor?.panel_type) specs.panel_type.add(monitor?.panel_type);
  });

  return {
    refresh_rate: [...specs.refresh_rate],
    resolution: [...specs.resolution],
    panel_type: [...specs.panel_type],
  };
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
