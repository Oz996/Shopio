import prisma from "@/lib/prisma/prisma";
import { ProductSlug } from "@/lib/types";
import styles from "./page.module.scss";
import ProductImages from "./components/product-images/product-images";
import ProductDetails from "./components/product-details/product-details";

// fetching all products slugs to make page static instead of dynamic
export async function generateStaticParams() {
  const products: ProductSlug[] = await prisma.product.findMany({
    select: { slug: true },
  });

  return products.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Product({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  const product = await prisma.product.findUnique({
    where: {
      slug,
    },
    include: { reviews: true },
  });

  console.log("productproduct", product);

  return (
    <>
      <section className={styles.section}>
        <ProductImages product={product!} />
        <ProductDetails product={product!} />
      </section>
    </>
  );
}
