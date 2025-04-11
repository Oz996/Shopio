import ProductCardSkeleton from "../skeletons/product-card/product-card-skeleton";
import styles from "./product-list.module.scss";

interface ProductCardSkeletonProps {
  length: number;
}

export default function ProductListSkeleton({
  length,
}: ProductCardSkeletonProps) {
  return (
    <section className={styles.section}>
      {new Array(length).fill(0).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </section>
  );
}
