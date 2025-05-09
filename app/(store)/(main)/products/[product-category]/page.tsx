import styles from "./page.module.scss";
import ProductList from "@/components/product-list/product-list";
import prisma from "@/lib/prisma/prisma";
import ProductsFilter from "./products-filter/products-filter";

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

  const results = await prisma.product.findMany({ where });

  return (
    <section className={styles.section}>
      <ProductsFilter />
      <ProductList products={results} />
    </section>
  );
}

interface QueryType {
  category: string;
  brand?: string;
  price: { gt: number; lt: number };
}
