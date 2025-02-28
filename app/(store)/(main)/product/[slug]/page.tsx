import prisma from "@/lib/prisma/prisma";
import { ProductSlug } from "@/lib/types";
import styles from "./page.module.scss";
import Image from "next/image";

// fetching all products slugs to make page static instead of dynamic
export async function generateStaticParams() {
  const products: ProductSlug[] = await prisma.product.findMany({
    select: { slug: true },
  });

  console.log(products.map((product) => product.slug));
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
  });

  console.log("productproduct", product);

  return (
    <section className={styles.section}>
      <div className={styles.images}>
        <div className={styles.display}>
          <Image src={product?.images[0]!} alt="" fill />
        </div>
      </div>
    </section>
  );
}
