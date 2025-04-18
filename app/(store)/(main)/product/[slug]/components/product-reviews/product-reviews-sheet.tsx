"use client";

import { Product, Review } from "@prisma/client";
import React, { startTransition, useOptimistic, useRef, useState } from "react";
import styles from "./product-reviews.module.scss";
import { X } from "lucide-react";
import useClickOutside from "@/hooks/use-click-outside";
import ProductRating from "@/components/product-card/product-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp as regularThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { helpfulReviewAction, submitReviewAction } from "@/app/actions";
import toast, { Toaster } from "react-hot-toast";
import ProductAddRating from "./product-add-rating";

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

  // updating reviews helpful count optimistically to display change instantly while the action runs in the background
  const [optimisticReviews, setOptimisticReviews] = useOptimistic(
    reviews,
    updateHelpfulReviews
  );

  const [rating, setRating] = useState(0);

  function updateHelpfulReviews(
    currentReviews: Review[],
    { reviewId, userEmail }: { reviewId: string; userEmail: string }
  ) {
    return currentReviews.map((review) => {
      return review.id === reviewId
        ? {
            ...review,
            helpful: review.helpful.includes(userEmail)
              ? review.helpful.filter((email) => email !== userEmail)
              : [...review.helpful, userEmail],
          }
        : review;
    });
  }

  async function isHelpfulAction(review: Review) {
    startTransition(() => {
      setOptimisticReviews({ reviewId: review.id, userEmail });
    });

    try {
      await helpfulReviewAction(reviews, review.id, userEmail);
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  function isHelpful(review: Review) {
    return review.helpful.includes(userEmail);
  }

  async function reviewAction(formData: FormData) {
    const content = formData.get("content")?.toString() as string;

    try {
      await submitReviewAction(product.id, rating, content, userEmail);
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <>
      <Toaster position="bottom-left" />

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
            {optimisticReviews.map((review) => (
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
                    onClick={() => isHelpfulAction(review)}
                  >
                    <FontAwesomeIcon icon={regularThumbsUp} />
                    <span>{`Helpful (${review.helpful.length})`}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <form className={styles.form} action={reviewAction}>
            <div className={styles.form_content}>
              <span>Submit a review</span>
              <ProductAddRating rating={rating} setRating={setRating} />
            </div>

            <div className={styles.form_content}>
              <textarea name="content" id="content" rows={8} />
              <button className={styles.submit_button}>Submit</button>
            </div>
          </form>
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
