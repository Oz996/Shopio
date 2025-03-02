"use client";

import { Product, Review } from "@prisma/client";
import React, { useRef } from "react";
import styles from "./product-reviews.module.scss";
import { X } from "lucide-react";
import useClickOutside from "@/hooks/use-click-outside";

interface ProductReviewsProps {
  product: Product;
  reviews: Review[];
}

export default function ProductReviewsSheet({
  product,
  reviews,
}: ProductReviewsProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogContentRef = useRef<HTMLDivElement>(null);

  useClickOutside(dialogContentRef, () => dialogRef?.current?.close());

  return (
    <>
      <button onClick={() => dialogRef?.current?.showModal()}>
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
        </div>
      </dialog>
    </>
  );
}

function reviewCount(reviews: Review[]) {
  if (reviews.length > 0) {
    return `${reviews.length} Reviews`;
  } else {
    return "No reviews";
  }
}
