import styles from "./page.module.scss";
import HomeCarousel from "./components/carousel/carousel";
import PopularProducts from "./components/rows/popular-products";

export default async function Home() {
  return (
    <section className={styles.section}>
      <HomeCarousel />

      <PopularProducts />
    </section>
  );
}
