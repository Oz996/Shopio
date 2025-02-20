import prisma from "@/lib/prisma";
import styles from "./page.module.scss";

export default async function Home() {
  const prod = await prisma.product.findMany();
  console.log("prodd", prod);
  return (
    <section className={styles.section}>
      <div></div>
    </section>
  );
}
