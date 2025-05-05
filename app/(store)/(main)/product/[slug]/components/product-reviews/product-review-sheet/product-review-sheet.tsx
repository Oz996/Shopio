"use client";

import { Product, Review } from "@prisma/client";
import { useRef, useState } from "react";
import styles from "./product-review-sheet.module.scss";
import { X } from "lucide-react";
import useClickOutside from "@/hooks/use-click-outside";
import ReviewList from "./review-list/review-list";
import ReviewSort from "./review-sort/review-sort";
import ReviewPagination from "./review-pagination/review-pagination";

interface ProductReviewProps {
  product: Product;
  reviews: Review[];
}

export type ProductSortType = "latest" | "high" | "low";

export default function ProductReviewSheet({
  product,
  reviews,
}: ProductReviewProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogContentRef = useRef<HTMLDivElement>(null);

  useClickOutside(dialogContentRef, () => dialogRef?.current?.close());

  const [currentPage, setCurrentPage] = useState(1);
  const [currentSort, setCurrentSort] = useState<ProductSortType>("latest");

  const [sortedReviews, setSortedReviews] = useState<Review[]>([]);
  const [slicedReviews, setSlicedReviews] = useState<Review[]>([]);

  function openModal() {
    dialogRef?.current?.showModal();
    setCurrentPage(1);
    setCurrentSort("latest");
    setSortedReviews(reviews);

    // sorting to display latest reviews by default
    sortReviews("latest");
  }

  function sortReviews(sort: ProductSortType) {
    let sortedList: Review[];

    switch (sort) {
      case "latest":
        sortedList = reviews.toSorted(
          (a, b) => Number(b.createdAt) - Number(a.createdAt)
        );
        break;

      case "high":
        sortedList = reviews.toSorted((a, b) => b.rating - a.rating);
        break;

      case "low":
        sortedList = reviews.toSorted((a, b) => a.rating - b.rating);
        break;
    }

    setCurrentPage(1);
    setCurrentSort(sort);
    setSortedReviews(sortedList);
    setSlicedReviews(sortedList.slice(0, 6));
  }

  if (reviews.length === 0)
    return <span className={styles.no_reviews}>No reviews</span>;

  return (
    <>
      <button onClick={openModal} className={styles.dialog_button}>
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

            <ReviewSort currentSort={currentSort} sortReviews={sortReviews} />

            <ReviewList reviews={slicedReviews} />
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
  } else {
    return `${reviews.length} Reviews`;
  }
}
