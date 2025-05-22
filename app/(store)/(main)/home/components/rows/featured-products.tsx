import ProductList from "@/components/product-list/product-list";
import prisma from "@/lib/prisma/prisma";
import styles from "./featured-list-skeleton.module.scss";
import { productCardSelect } from "@/lib/prisma/selects";
import { FeaturedType } from "@/lib/types";

interface FeaturedProductsProps {
  type: FeaturedType;
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
