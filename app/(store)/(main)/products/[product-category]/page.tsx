import styles from "./page.module.scss";
import ProductList from "@/components/product-list/product-list";
import ProductsFilter from "./products-filter/products-filter";
import {
  getMonitorSpecs,
  productsBrands,
  productsQuery,
} from "./product-queries";

export default async function Products({
  params,
  searchParams,
}: {
  params: Promise<any>;
  searchParams: Promise<Record<string, string>>;
}) {
  const { brand, price, refresh_rate, resolution, panel_type } =
    await searchParams;
  const { "product-category": category } = await params;

  const where: QueryType = {
    category,
    price: { gt: 0, lt: 100_000_000_000 },
    description: {
      contains: "",
    },
  };

  if (category === "monitors") {
    where.monitor = {};
  }

  if (brand) {
    where.brand = brand;
  }

  if (refresh_rate) {
    where.monitor = {
      ...where.monitor,
      refresh_rate,
    };
  }

  if (resolution) {
    where.monitor = {
      ...where.monitor,
      resolution,
    };
  }

  if (panel_type) {
    where.monitor = {
      ...where.monitor,
      panel_type: panel_type.toUpperCase(),
    };
  }

  console.log("refreshs", refresh_rate);

  if (price) {
    const prices = price?.split("-");
    const priceFrom = Number(prices?.[0]);
    const priceTo = Number(prices?.[1]);

    where.price.gt = priceFrom;
    where.price.lt = priceTo;
  }

  const results = await productsQuery(where);
  const brandOptions = await productsBrands(category);
  const specifications = await getMonitorSpecs(category);

  console.log("pess", results);
  console.log("objj", specifications);
  console.log("brandOptions", brandOptions);

  return (
    <section className={styles.section}>
      <ProductsFilter specifications={specifications} brands={brandOptions} />
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
  monitor?: {
    id: string;
    resolution: string;
    refresh_rate: string;
    panel_type: string;
    productId: string;
  } | null;
}
