"use client";

import { useActionState, useRef, useState } from "react";
import styles from "./product.review.form.module.scss";
import { submitReviewAction } from "@/app/actions";
import ProductAddRating from "./product-add-rating";
import { Loader, X } from "lucide-react";
import useClickOutside from "@/hooks/use-click-outside";
import { Product } from "@prisma/client";
import Image from "next/image";

interface ProductReviewFormProps {
  product: Product;
  userEmail: string;
}

function ProductReviewForm({ product, userEmail }: ProductReviewFormProps) {
  const [rating, setRating] = useState(0);

  const [state, formAction, isPending] = useActionState(
    submitReviewAction,
    undefined
  );

  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogContentRef = useRef<HTMLDivElement>(null);

  useClickOutside(dialogContentRef, () => dialogRef.current?.close());

  console.log(state?.errors);

  return (
    <>
      <button
        onClick={() => dialogRef.current?.showModal()}
        className={styles.dialog_button}
      >
        Submit review
      </button>

      <dialog ref={dialogRef} className={styles.dialog}>
        <div ref={dialogContentRef} className={styles.dialog_content}>
          <div className={styles.header}>
            <h2>Share your experience!</h2>
            <button onClick={() => dialogRef?.current?.close()}>
              <X strokeWidth={1.5} />
            </button>
          </div>

          <div className={styles.review_product}>
            <Image src={product.images[0]} width={100} height={100} alt="" />
            <span>{`${product.brand} ${product.name}`}</span>
          </div>

          <form className={styles.form} action={formAction}>
            <div className={styles.form_content}>
              <div className={styles.form_rating}>
                <ProductAddRating rating={rating} setRating={setRating} />
                {state?.errors &&
                  state.errors.map((error, index) => (
                    <span key={index}>{error.message}</span>
                  ))}
              </div>
            </div>

            <div className={styles.form_content}>
              <input type="hidden" name="id" value={product.id} />
              <input type="hidden" name="rating" value={rating} />
              <input type="hidden" name="userEmail" value={userEmail} />

              <textarea
                rows={8}
                name="content"
                aria-label="Review content"
                placeholder="Share a comment (optional)"
                defaultValue={state?.data}
              />

              <button disabled={isPending} className={styles.submit_button}>
                {isPending ? <Loader /> : "Submit Review"}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}

export default ProductReviewForm;
