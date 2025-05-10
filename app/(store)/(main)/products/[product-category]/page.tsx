import styles from "./page.module.scss";
import ProductList from "@/components/product-list/product-list";
import ProductsFilter from "./products-filter/products-filter";
import { productsBrands, productsQuery } from "./product-queries";

export default async function Products({
  params,
  searchParams,
}: {
  params: Promise<any>;
  searchParams: Promise<any>;
}) {
  const { brand, price, refresh } = await searchParams;
  const { "product-category": category } = await params;

  const where: QueryType = {
    category,
    price: { gt: 0, lt: 100_000_000_000 },
    description: {
      contains: "",
    },
  };

  if (brand) {
    where.brand = brand;
  }

  if (refresh) {
    const ref = refresh.split("_").join(" ");
    where.description.contains = ref;
  }

  if (price) {
    const prices = price?.split("-");
    const priceFrom = Number(prices?.[0]);
    const priceTo = Number(prices?.[1]);

    where.price.gt = priceFrom;
    where.price.lt = priceTo;
  }

  const results = await productsQuery(where);
  const brandOptions = await productsBrands(category);

  console.log("brandOptions", brandOptions);

  return (
    <section className={styles.section}>
      <ProductsFilter category={category} brands={brandOptions} />
      <ProductList products={results} />
    </section>
  );
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
