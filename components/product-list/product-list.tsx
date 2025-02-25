import ProductCard from "@/components/product-card/product-card";
import { Product } from "@prisma/client";
import styles from "./product-list.module.scss";

interface ProductListProps {
  products: Product[];
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
