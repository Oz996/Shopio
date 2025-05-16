import styles from "./page.module.scss";
import ProductList from "@/components/product-list/product-list";
import ProductsFilter from "./products-filter/products-filter";
import {
  getSpecs,
  productsBrands,
  productsQuery,
  searchParamsConstructor,
} from "./product-queries";

export default async function Products({
  params,
  searchParams,
}: {
  params: Promise<any>;
  searchParams: Promise<Record<string, string>>;
}) {
  const { ...args } = await searchParams;
  const { "product-category": category } = await params;

  const where = searchParamsConstructor(category, args);

  const results = await productsQuery(where);
  const brandOptions = await productsBrands(category);
  const specifications = await getSpecs(category);

  console.log("specifications", specifications);

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
