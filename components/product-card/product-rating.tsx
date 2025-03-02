"use client";

import styles from "./product-card.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";

interface ProductRatingProps {
  rating: number;
  small?: boolean;
}

export default function ProductRating({ rating, small }: ProductRatingProps) {
  return <div className={styles.rating}>{displayRating(rating, small)}</div>;
}

function displayRating(rating: number, small?: boolean) {
  const size = small ? "xs" : "1x";
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <FontAwesomeIcon key={i} icon={faStar} color="gold" size={size} />
    );
  }

  if (hasHalfStar) {
    stars.push(
      <FontAwesomeIcon key="half" icon={faStarHalf} color="gold" size={size} />
    );
  }

  for (let i = 0; i < 5; i++) {
    stars.push(
      <FontAwesomeIcon
        key={stars.length}
        icon={faStar}
        color="gray"
        size={size}
      />
    );
  }

  return stars;
}
