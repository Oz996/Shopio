import prisma from "@/lib/prisma";
import styles from "./page.module.scss";
import HomeCarousel from "./components/carousel/carousel";

export default async function Home() {
  const prod = await prisma.product.findMany();

  console.log("prodd", prod);
  return (
    <section className={styles.section}>
      <HomeCarousel />
    </section>
  );
}
