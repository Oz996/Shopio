import ProductCard from "@/components/product-card/product-card";
import styles from "./product-list.module.scss";
import { ProductCardType } from "@/lib/types";

interface ProductListProps {
  products: ProductCardType[];
}

export default async function ProductList({ products }: ProductListProps) {
  return (
    <section className={styles.section}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}
