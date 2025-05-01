import { Review } from "@prisma/client";
import styles from "./review-list.module.scss";
import ProductRating from "@/components/product-card/product-rating";

interface ReviewListProps {
  reviews: Review[];
}

export default function ReviewList({ reviews }: ReviewListProps) {
  return (
    <>
      {reviews.map((review) => (
        <div key={review.id} className={styles.review_content}>
          <span className={styles.name}>{review.name}</span>
          <ProductRating rating={review.rating} small />
          <p>{review.content}</p>

          <div className={styles.details}>
            <span>{reviewDate(review.createdAt)}</span>
            <span>Unverified purchase</span>
          </div>
        </div>
      ))}
    </>
  );
}

function reviewDate(date: Date) {
  return new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
