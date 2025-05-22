import styles from "./page.module.scss";
import HomeCarousel from "./components/carousel/carousel";
import FeaturedProducts from "./components/rows/featured-products";
import { Suspense } from "react";
import RowListSkeleton from "./components/rows/row-list-skeleton";

export default function Home() {
  return (
    <section className={styles.section}>
      <HomeCarousel />

      <Suspense fallback={<RowListSkeleton title="Popular" length={4} />}>
        <FeaturedProducts type="popular" />
      </Suspense>

      <Suspense fallback={<RowListSkeleton title="Featured" length={4} />}>
        <FeaturedProducts type="featured" />
      </Suspense>
    </section>
  );
}
