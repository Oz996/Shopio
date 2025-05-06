"use client";

import styles from "./product-review-form.module.scss";
import { useActionState, useEffect, useRef, useState } from "react";
import { submitReviewAction } from "@/app/actions";
import ProductAddRating from "./product-add-rating";
import { X } from "lucide-react";
import useClickOutside from "@/hooks/use-click-outside";
import { Product } from "@prisma/client";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import SubmitButton from "@/app/(store)/(main)/home/components/submit-button/submit-button";

interface ProductReviewFormProps {
  product: Product;
}

export default function ProductReviewForm({ product }: ProductReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState<{ message: string }[]>([]);

  const [state, formAction, isPending] = useActionState(
    submitReviewAction,
    undefined
  );

  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogContentRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useClickOutside(dialogContentRef, () => closeModal());

  useEffect(() => {
    if (state?.errors) {
      setErrors(state.errors);
    } else if (state?.success) {
      toast.success("Review submitted");
      closeModal();
    }
  }, [state]);

  function closeModal() {
    setRating(0);
    setErrors([]);
    textareaRef.current && (textareaRef.current.value = "");
    dialogRef.current?.close();
  }

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
            <button onClick={closeModal}>
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
                {errors &&
                  errors.map((error, index) => (
                    <span key={index}>{error.message}</span>
                  ))}
              </div>
            </div>

            <div className={styles.form_content}>
              <input type="hidden" name="id" value={product.id} />
              <input type="hidden" name="rating" value={rating} />

              <textarea
                rows={8}
                name="content"
                aria-label="Review content"
                placeholder="Share a comment (optional)"
                defaultValue={state?.data}
                ref={textareaRef}
              />

              <SubmitButton
                isPending={isPending}
                className={styles.submit_button}
              >
                Submit Review
              </SubmitButton>
            </div>
          </form>
        </div>
      </dialog>

      <Toaster position="top-right" />
    </>
  );
}
