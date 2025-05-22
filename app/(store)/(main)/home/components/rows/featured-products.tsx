import ProductList from "@/components/product-list/product-list";
import prisma from "@/lib/prisma/prisma";
import styles from "./row-list.module.scss";
import { productCardSelect } from "@/lib/prisma/selects";

interface FeaturedProductsProps {
  type: "popular" | "featured";
}

export default async function FeaturedProducts({
  type,
}: FeaturedProductsProps) {
  const products = await prisma.product.findMany({
    where: {
      [type]: true,
    },
    select: productCardSelect,
  });

  return (
    <>
      <h2 className={styles.title}>{`${type} Products`}</h2>
      <ProductList products={products} centered />
    </>
  );
}
