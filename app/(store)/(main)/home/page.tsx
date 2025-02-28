import styles from "./page.module.scss";
import HomeCarousel from "./components/carousel/carousel";
import PopularProducts from "./components/rows/popular-products";
import FeaturedProducts from "./components/rows/featured-products";
import { Suspense } from "react";
import RowListSkeleton from "./components/rows/row-list-skeleton";
export default async function Home() {
  return (
    <section className={styles.section}>
      <HomeCarousel />

      <Suspense fallback={<RowListSkeleton title="Popular" length={4} />}>
        <PopularProducts />
      </Suspense>

      <Suspense fallback={<RowListSkeleton title="Featured" length={4} />}>
        <FeaturedProducts />
      </Suspense>
    </section>
  );
}
