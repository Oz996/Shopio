"use client";

import { Product, Review } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import styles from "./product-reviews-sheet.module.scss";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import useClickOutside from "@/hooks/use-click-outside";
import ReviewList from "../review-list/review-list";

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
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 4;
  const totalPages = Math.round(reviews.length / reviewsPerPage);

  const pages = new Array(totalPages).fill(0);

  console.log(sortedReviews);

  function changePage(page: number) {
    setCurrentPage(page + 1);

    let startIndex = page * 4;
    if (page === 0) startIndex = 0;
    console.log("startIndex", startIndex);
    setSortedReviews(reviews.slice(startIndex, startIndex + 4));
  }

  function nextPage() {
    const startIndex = currentPage * 4;
    console.log("startIndex", startIndex);
    setCurrentPage((curr) => curr + 1);
    setSortedReviews(reviews.slice(startIndex, startIndex + 4));
  }

  function previousPage() {
    const newPage = currentPage - 1;
    const startIndex = (newPage - 1) * 4;
    setCurrentPage(newPage);
    setSortedReviews(reviews.slice(startIndex, startIndex + 4));
  }

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
          <div className={styles.header}>
            <h1>{`${product.brand} ${product.name}`}</h1>
            <button onClick={() => dialogRef?.current?.close()}>
              <X strokeWidth={1.5} />
            </button>
          </div>

          <ReviewList reviews={sortedReviews} userEmail={userEmail} />
          <div className={styles.pagination}>
            <button
              className={styles.arrow}
              disabled={currentPage === 1}
              onClick={previousPage}
            >
              {<ChevronLeft size={16} />}
            </button>

            {pages.map((_, index) => (
              <button key={index} onClick={() => changePage(index)}>
                {index + 1}
              </button>
            ))}

            <button
              className={styles.arrow}
              disabled={sortedReviews.length < 4}
              onClick={nextPage}
            >
              {<ChevronRight size={16} />}
            </button>
          </div>
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
