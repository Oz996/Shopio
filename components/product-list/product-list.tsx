import ProductCard from "@/components/product-card/product-card";
import styles from "./product-list.module.scss";
import { ProductCardType } from "@/lib/types";

interface ProductListProps {
  products: ProductCardType[];
  centered?: boolean;
}

export default async function ProductList({
  products,
  centered,
}: ProductListProps) {
  return (
    <section className={`${styles.section} ${centered ? styles.centered : ""}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}
