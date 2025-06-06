import styles from "./page.module.scss";
import ProductList from "@/components/product-list/product-list";
import ProductsFilter from "./products-filter/products-filter";
import {
  getSpecs,
  productsBrands,
  productsQuery,
  searchParamsConstructor,
  sortResults,
} from "./product-queries";
import { ProductCategory, SortValue } from "@/lib/types";

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
  const orderBy = sortResults(args.sort as SortValue);

  const productsData = productsQuery(where, orderBy);
  const brandData = productsBrands(category);
  const specificationsData = getSpecs(category);

  const [products, brands, specifications] = await Promise.all([
    productsData,
    brandData,
    specificationsData,
  ]);

  const sort = products.toSorted((a, b) => a.price - b.price);
  const prices = {
    from: sort[0]?.price,
    to: sort[sort.length - 1]?.price,
  };

  return (
    <section className={styles.section}>
      <ProductsFilter
        specifications={specifications}
        prices={prices}
        brands={brands}
      />
      <ProductList products={products} />
    </section>
  );
}
