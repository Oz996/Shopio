import styles from "./page.module.scss";
import ProductCard from "@/components/product-card/product-card";
import ProductList from "@/components/product-list/product-list";
import prisma from "@/lib/prisma/prisma";

export default async function Products({
  params,
  searchParams,
}: {
  params: Promise<any>;
  searchParams: Promise<any>;
}) {
  console.log("paraam", await params);
  console.log("seaarc", await searchParams);

  const { name } = await searchParams;

  const results = await prisma.product.findMany({
    where: {
      name: {
        contains: name,
        mode: "insensitive",
      },
    },
  });

  console.log("ress", results);

  return (
    <section className={styles.section}>
      <ProductList products={results} />

      {/* <div className={styles.product_list}>
        {results.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div> */}
    </section>
  );
}
