import styles from "./page.module.scss";
import HomeCarousel from "./components/carousel/carousel";
import FeaturedProducts from "./components/rows/featured-products";
import { Suspense } from "react";
import FeaturedListSkeleton from "./components/rows/featured-list-skeleton";

export default function Home() {
  return (
    <section className={styles.section}>
      <HomeCarousel />

      <Suspense fallback={<FeaturedListSkeleton title="popular" length={4} />}>
        <FeaturedProducts type="popular" />
      </Suspense>

      <Suspense fallback={<FeaturedListSkeleton title="featured" length={4} />}>
        <FeaturedProducts type="featured" />
      </Suspense>
    </section>
  );
}
