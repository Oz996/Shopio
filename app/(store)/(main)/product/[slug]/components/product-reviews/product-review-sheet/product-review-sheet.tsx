"use client";

import { Product, Review } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import styles from "./product-review-sheet.module.scss";
import { X } from "lucide-react";
import useClickOutside from "@/hooks/use-click-outside";
import ReviewList from "./review-list/review-list";
import ReviewSort from "./review-sort/review-sort";
import ReviewPagination from "./review-pagination/review-pagination";

interface ProductReviewProps {
  product: Product;
  reviews: Review[];
  userEmail: string;
}

export default function ProductReviewSheet({
  product,
  reviews,
  userEmail,
}: ProductReviewProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogContentRef = useRef<HTMLDivElement>(null);

  useClickOutside(dialogContentRef, () => dialogRef?.current?.close());

  const [currentPage, setCurrentPage] = useState(1);

  const [sortedReviews, setSortedReviews] = useState<Review[]>([]);
  const [slicedReviews, setSlicedReviews] = useState<Review[]>([]);

  useEffect(() => {
    setCurrentPage(1);
    setSortedReviews(reviews);

    // sorting to display latest reviews by default
    setSlicedReviews(
      reviews
        .sort((a, b) => Number(b.createdAt) - Number(a.createdAt))
        .slice(0, 5)
    );
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

            <ReviewSort
              reviews={sortedReviews}
              setCurrentPage={setCurrentPage}
              setSlicedReviews={setSlicedReviews}
              setSortedReviews={setSortedReviews}
            />

            <ReviewList reviews={slicedReviews} userEmail={userEmail} />
          </div>

          <ReviewPagination
            length={slicedReviews.length}
            reviews={sortedReviews}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setSlicedReviews={setSlicedReviews}
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
