import styles from "./page.module.scss";
import ProductList from "@/components/product-list/product-list";
import prisma from "@/lib/prisma/prisma";
import ProductsFilter from "./products-filter/products-filter";
import { ProductCardType } from "@/lib/types";
import { productCardSelect } from "@/lib/prisma/selects";

export default async function Products({
  params,
  searchParams,
}: {
  params: Promise<any>;
  searchParams: Promise<any>;
}) {
  const { brand, price } = await searchParams;
  const { "product-category": category } = await params;

  const where: QueryType = {
    category,
    price: { gt: 0, lt: 100_000_000_000 },
  };

  if (brand) {
    where.brand = brand;
  }

  if (price) {
    const prices = price?.split("-");
    const priceFrom = Number(prices?.[0]);
    const priceTo = Number(prices?.[1]);

    console.log("priss", price);

    where.price.gt = priceFrom;
    where.price.lt = priceTo;
  }

  const results: ProductCardType[] = await prisma.product.findMany({
    where,
    select: productCardSelect,
  });

  const brandOptions: BrandOptions[] = await prisma.product.findMany({
    where: { category },
    distinct: ["brand"],
    select: { brand: true },
  });

  console.log("brandOptions", brandOptions);

  return (
    <section className={styles.section}>
      <ProductsFilter brands={brandOptions} />
      <ProductList products={results} />
    </section>
  );
}

interface QueryType {
  category: string;
  brand?: string;
  price: { gt: number; lt: number };
}

export interface BrandOptions {
  brand: string;
}
