import { Product, Review } from "@prisma/client";
import styles from "./product-reviews.module.scss";
import ProductRating from "@/components/product-card/product-rating";
import prisma from "@/lib/prisma/prisma";
import ProductReviewsSheet from "./product-reviews-sheet";
import { auth } from "@/auth";

interface ProductReviewsProps {
  product: Product;
}

export default async function ProductReviews({ product }: ProductReviewsProps) {
  const reviews = await prisma.review.findMany({
    where: { productId: product.id },
  });
  const session = await auth();

  console.log("revss", reviews);

  return (
    <div className={styles.reviews}>
      <div className={styles.content}>
        <ProductRating rating={product.rating} />
        <ProductReviewsSheet
          product={product}
          reviews={reviews}
          userEmail={session?.user?.email as string}
        />
      </div>
    </div>
  );
}
