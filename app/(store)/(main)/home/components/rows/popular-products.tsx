import ProductList from "@/components/product-list/product-list";
import prisma from "@/lib/prisma/prisma";
import styles from "./row-list.module.scss";
import { productCardSelect } from "@/lib/prisma/selects";

export default async function PopularProducts() {
  const products = await prisma.product.findMany({
    where: {
      popular: true,
    },
    select: productCardSelect,
  });

  console.log("prodd", products);

  return (
    <>
      <h2 className={styles.title}>Popular Products</h2>
      <ProductList products={products} />
    </>
  );
}
