"use client";

import { Product, Review } from "@prisma/client";
import React, { useRef } from "react";
import styles from "./product-reviews.module.scss";
import { X } from "lucide-react";
import useClickOutside from "@/hooks/use-click-outside";
import ProductRating from "@/components/product-card/product-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp as regularThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { helpfulReviewAction } from "@/app/actions";

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

  function isHelpful(review: Review) {
    return review.helpful.includes(userEmail);
  }

  return (
    <>
      <button
        onClick={() => dialogRef?.current?.showModal()}
        className={styles.dailog_button}
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

          <div>
            {reviews.map((review) => (
              <div key={review.id} className={styles.review_content}>
                <span className={styles.name}>{review.name}</span>
                <ProductRating rating={review.rating} small />
                <p>{review.content}</p>

                <div className={styles.details}>
                  <span>{reviewDate(review.createdAt)}</span>
                  <span>Unverified purchase</span>
                </div>

                <div
                  className={`${styles.details} ${
                    isHelpful(review) ? styles.helpful : ""
                  }`}
                >
                  <button
                    aria-label="Review was helpful"
                    onClick={() =>
                      helpfulReviewAction(reviews, review.id, userEmail)
                    }
                  >
                    <FontAwesomeIcon icon={regularThumbsUp} />
                    <span>{`Helpful (${review.helpful.length})`}</span>
                  </button>
                </div>
              </div>
            ))}
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

function reviewDate(date: Date) {
  return new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
