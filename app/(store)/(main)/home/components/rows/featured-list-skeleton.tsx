import ProductListSkeleton from "@/components/product-list/product-list-skeleton";
import styles from "./featured-list-skeleton.module.scss";
import { FeaturedType } from "@/lib/types";

interface RowListSkeletonProps {
  title: FeaturedType;
  length: number;
}

export default function FeaturedListSkeleton({
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
