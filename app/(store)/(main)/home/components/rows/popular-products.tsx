import ProductList from "@/components/product-list/product-list";
import prisma from "@/lib/prisma";

export default async function PopularProducts() {
  const products = await prisma.product.findMany({
    where: {
      popular: true,
    },
  });

  console.log("prodd", products);

  const style = { fontSize: 20, fontWeight: 400, paddingBlock: "2rem" };

  return (
    <>
      <h2 style={style}>Popular Products</h2>
      <ProductList products={products} />
    </>
  );
}
