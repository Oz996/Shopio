import ProductListSkeleton from "@/components/product-list/product-list-skeleton";
import styles from "./row-list.module.scss";

interface RowListSkeletonProps {
  title: string;
  length: number;
}

export default function RowListSkeleton({
  length,
  title,
}: RowListSkeletonProps) {
  return (
    <>
      <h2 className={styles.title}>{`${title} Products`}</h2>
      <ProductListSkeleton length={length} />
    </>
  );
}
