import styles from "./page.module.scss";
import ProductList from "@/components/product-list/product-list";
import ProductsFilter from "./products-filter/products-filter";
import {
  getHeadphoneSpecs,
  getMonitorSpecs,
  productsBrands,
  productsQuery,
} from "./product-queries";
import { ProductCategory } from "@/lib/types";

export default async function Products({
  params,
  searchParams,
}: {
  params: Promise<any>;
  searchParams: Promise<Record<string, string>>;
}) {
  const {
    brand,
    price,
    refresh_rate,
    resolution,
    panel_type,
    connection,
    battery_life,
    noise_cancelling,
  } = await searchParams;
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

  if (category === "headphones") {
    where.headphone = {};
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

  if (connection) {
    where.headphone = {
      ...where.headphone,
      connection,
    };
  }

  if (battery_life) {
    where.headphone = {
      ...where.headphone,
      battery_life,
    };
  }

  if (noise_cancelling) {
    where.headphone = {
      ...where.headphone,
      noise_cancelling,
    };
  }

  if (price) {
    const prices = price?.split("-");
    const priceFrom = Number(prices[0]);
    const priceTo = Number(prices[1]);

    where.price.gt = priceFrom;
    where.price.lt = priceTo;
  }

  const results = await productsQuery(where);
  const brandOptions = await productsBrands(category);
  const specifications = await getSpecs(category);

  async function getSpecs(category: ProductCategory) {
    if (category === "monitors") return await getMonitorSpecs();
    if (category === "headphones") return await getHeadphoneSpecs();
  }

  console.log("pess", results);
  console.log("objj", specifications);
  console.log("brandOptions", brandOptions);

  return (
    <section className={styles.section}>
      <ProductsFilter
        specifications={specifications}
        searchParams={await searchParams}
        brands={brandOptions}
      />
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
  headphone?: {
    id?: string;
    connection?: string;
    battery_life?: string;
    noise_cancelling?: string;
    productId?: string;
  } | null;
}
