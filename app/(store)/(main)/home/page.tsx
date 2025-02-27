import styles from "./page.module.scss";
import HomeCarousel from "./components/carousel/carousel";
import PopularProducts from "./components/rows/popular-products";
import FeaturedProducts from "./components/rows/featured-products";

export default async function Home() {
  return (
    <section className={styles.section}>
      <HomeCarousel />

      <PopularProducts />
      <FeaturedProducts />
    </section>
  );
}
