import { Dispatch, SetStateAction, useActionState } from "react";
import styles from "./product.review.form.module.scss";
import { submitReviewAction } from "@/app/actions";
import ProductAddRating from "./product-add-rating";

interface ProductReviewFormProps {
  rating: number;
  setRating: Dispatch<SetStateAction<number>>;
  id: string;
  userEmail: string;
}

function ProductReviewForm({
  rating,
  setRating,
  id,
  userEmail,
}: ProductReviewFormProps) {
  const [state, formAction, isPending] = useActionState(
    submitReviewAction,
    undefined
  );

  return (
    <form className={styles.form} action={formAction}>
      <div className={styles.form_content}>
        <span>Submit a review</span>

        <div className={styles.form_rating}>
          <ProductAddRating rating={rating} setRating={setRating} />
          {state?.errors &&
            state.errors.map((error, index) => (
              <span key={index}>{error.message}</span>
            ))}
        </div>
      </div>

      <div className={styles.form_content}>
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="rating" value={rating} />
        <input type="hidden" name="userEmail" value={userEmail} />

        <textarea
          name="content"
          id="content"
          rows={8}
          defaultValue={state?.data}
        />
        <button disabled={isPending} className={styles.submit_button}>
          Submit
        </button>
      </div>
    </form>
  );
}

export default ProductReviewForm;
