import { Product } from "@prisma/client";
import styles from "./product-reviews.module.scss";
import ProductRating from "@/components/product-card/product-rating";
import prisma from "@/lib/prisma/prisma";
import ProductReviewForm from "./product-review-form/product-review-form";
import ProductReviewSheet from "./product-review-sheet/product-review-sheet";

interface ProductReviewsProps {
  product: Product;
}

export default async function ProductReviews({ product }: ProductReviewsProps) {
  const reviews = await prisma.review.findMany({
    where: { productId: product.id },
  });

  return (
    <div className={styles.reviews}>
      <div className={styles.content}>
        <ProductRating rating={product.rating} />
        <ProductReviewSheet product={product} reviews={reviews} />
        <ProductReviewForm product={product} />
      </div>
    </div>
  );
}
