import prisma from "@/lib/prisma/prisma";
import { productCardSelect } from "@/lib/prisma/selects";
import { ProductCardType, ProductCategory } from "@/lib/types";

const select = {
  ...productCardSelect,
};

// interface ProductQueryType extends ProductCardType {
//   monitor?: {
//     id: string;
//     resolution: string;
//     refresh_rate: string;
//     panel_type: string;
//     productId: string;
//   } | null;
//   headphone?: {
//     id?: string;
//     connection?: string;
//     battery_life?: string;
//     noise_cancelling?: string;
//     productId?: string;
//   } | null;
// }

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

export async function getMonitorSpecs() {
  const monitors = await prisma.product.findMany({
    where: { category: "monitors" },
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

export async function getHeadphoneSpecs() {
  const headphones = await prisma.product.findMany({
    where: { category: "headphones" },
    select: {
      headphone: true,
    },
  });

  const specs = {
    connection: new Set(),
    noise_cancelling: new Set(),
    battery_life: new Set(),
  };

  headphones.map((object) => {
    const headphone = object.headphone;
    if (headphone?.connection) specs.connection.add(headphone.connection);
    if (headphone?.noise_cancelling)
      specs.noise_cancelling.add(headphone.noise_cancelling);
    if (headphone?.battery_life) specs.battery_life.add(headphone.battery_life);
  });

  return {
    connection: [...specs.connection],
    noise_cancelling: [...specs.noise_cancelling],
    battery_life: [...specs.battery_life],
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
