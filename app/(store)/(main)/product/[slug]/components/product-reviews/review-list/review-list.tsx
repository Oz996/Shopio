import { Review } from "@prisma/client";
import styles from "./review-list.module.scss";
import ProductRating from "@/components/product-card/product-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { helpfulReviewAction } from "@/app/actions";
import { faThumbsUp as regularThumbsUp } from "@fortawesome/free-regular-svg-icons";
import toast from "react-hot-toast";
import { useOptimistic } from "react";

interface ReviewListProps {
  userEmail: string;
  reviews: Review[];
}

export default function ReviewList({ userEmail, reviews }: ReviewListProps) {
  // updating reviews helpful count optimistically to display change instantly while the action runs in the background
  const [optimisticReviews, setOptimisticReviews] = useOptimistic(
    reviews,
    updateHelpfulReviews
  );

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
  function isHelpful(review: Review) {
    return review.helpful.includes(userEmail);
  }

  async function isHelpfulAction(review: Review) {
    setOptimisticReviews({ reviewId: review.id, userEmail });

    try {
      await helpfulReviewAction(reviews, review.id, userEmail);
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
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
  );
}

function reviewDate(date: Date) {
  return new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
