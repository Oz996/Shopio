import styles from "./page.module.scss";
import ProductList from "@/components/product-list/product-list";
import ProductsFilter from "./products-filter/products-filter";
import {
  getSpecs,
  productsBrands,
  productsQuery,
  searchParamsConstructor,
} from "./product-queries";
import { ProductCategory } from "@/lib/types";

export default async function Products({
  params,
  searchParams,
}: {
  params: Promise<Record<string, ProductCategory>>;
  searchParams: Promise<Record<string, string>>;
}) {
  const { ...args } = await searchParams;
  const { "product-category": category } = await params;

  const where = searchParamsConstructor(category, args);
  const productsData = productsQuery(where);

  const brandData = productsBrands(category);
  const specificationsData = getSpecs(category);

  const [products, brands, specifications] = await Promise.all([
    productsData,
    brandData,
    specificationsData,
  ]);

  return (
    <section className={styles.section}>
      <ProductsFilter
        specifications={specifications}
        searchParams={await searchParams}
        brands={brands}
      />
      <ProductList products={products} />
    </section>
  );
}
