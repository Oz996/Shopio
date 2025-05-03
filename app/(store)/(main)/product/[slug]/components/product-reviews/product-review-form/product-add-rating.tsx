"use client";

import styles from "./product-review-form-dialog.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Dispatch, SetStateAction } from "react";

interface ProductAddRatingProps {
  rating: number;
  setRating: Dispatch<SetStateAction<number>>;
}

export default function ProductAddRating({
  rating,
  setRating,
}: ProductAddRatingProps) {
  const stars = new Array(5).fill(0);

  return (
    <div className={styles.rating}>
      {stars.map((_, index) => (
        <button
          key={index}
          type="button"
          className={styles.rating_star}
          onClick={() => setRating(index + 1)}
        >
          <FontAwesomeIcon
            icon={faStar}
            size="xl"
            color={rating < index + 1 ? "gray" : "orange"}
          />
        </button>
      ))}
    </div>
  );
}
