import { Review } from "@prisma/client";
import styles from "./review-sort.module.scss";
import { Dispatch, SetStateAction } from "react";
import { ProductSortType } from "../product-review-sheet";

interface ReviewSortProps {
  currentSort: ProductSortType;
  sortReviews: (sort: ProductSortType) => void;
}

export default function ReviewSort({
  currentSort,
  sortReviews,
}: ReviewSortProps) {
  const sortOptions: ProductSortType[] = ["latest", "high", "low"];

  return (
    <div className={styles.sort}>
      <select
        name="sort"
        value={currentSort}
        aria-label="sort reviews"
        onChange={(e) => sortReviews(e.target.value as ProductSortType)}
      >
        {sortOptions.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}
