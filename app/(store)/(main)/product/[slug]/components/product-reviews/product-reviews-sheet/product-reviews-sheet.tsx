"use client";

import { Product, Review } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import styles from "./product-reviews-sheet.module.scss";
import { X } from "lucide-react";
import useClickOutside from "@/hooks/use-click-outside";
import ReviewList from "./review-list/review-list";
import ReviewsPagination from "./reviews-pagination/reviews-pagination";

interface ProductReviewsProps {
  product: Product;
  reviews: Review[];
  userEmail: string;
}

export default function ProductReviewsSheet({
  product,
  reviews,
  userEmail,
}: ProductReviewsProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogContentRef = useRef<HTMLDivElement>(null);

  useClickOutside(dialogContentRef, () => dialogRef?.current?.close());

  const [sortedReviews, setSortedReviews] = useState<Review[]>(
    reviews.slice(0, 4)
  );

  console.log(sortedReviews);

  useEffect(() => {
    setSortedReviews(reviews.slice(0, 4));
  }, [reviews]);

  return (
    <>
      <button
        onClick={() => dialogRef?.current?.showModal()}
        className={styles.dialog_button}
      >
        {reviewCount(reviews)}
      </button>

      <dialog ref={dialogRef} className={styles.dialog}>
        <div ref={dialogContentRef} className={styles.dialog_content}>
          <div className={styles.reviews_scrollable}>
            <div className={styles.header}>
              <h1>{`${product.brand} ${product.name}`}</h1>
              <button onClick={() => dialogRef?.current?.close()}>
                <X strokeWidth={1.5} />
              </button>
            </div>

            <ReviewList reviews={sortedReviews} userEmail={userEmail} />
          </div>

          <ReviewsPagination
            length={sortedReviews.length}
            reviews={reviews}
            setSortedReviews={setSortedReviews}
          />
        </div>
      </dialog>
    </>
  );
}

function reviewCount(reviews: Review[]) {
  if (reviews.length === 1) {
    return `${reviews.length} Review`;
  } else if (reviews.length > 1) {
    return `${reviews.length} Reviews`;
  } else {
    return "No reviews";
  }
}
