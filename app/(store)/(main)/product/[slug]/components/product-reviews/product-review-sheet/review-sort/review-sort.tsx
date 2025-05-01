import { Review } from "@prisma/client";
import styles from "./review-sort.module.scss";
import { Dispatch, SetStateAction } from "react";

interface ReviewSortProps {
  reviews: Review[];
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setSlicedReviews: Dispatch<SetStateAction<Review[]>>;
  setSortedReviews: Dispatch<SetStateAction<Review[]>>;
}

export default function ReviewSort({
  reviews,
  setSortedReviews,
  setSlicedReviews,
  setCurrentPage,
}: ReviewSortProps) {
  type ProductSortType = "latest" | "high" | "low";
  const sortOptions: ProductSortType[] = ["latest", "high", "low"];

  function sortReviews(sort: ProductSortType) {
    let sortedList: Review[];

    switch (sort) {
      case "latest":
        sortedList = reviews.toSorted(
          (a, b) => Number(b.createdAt) - Number(a.createdAt)
        );
        break;

      case "high":
        sortedList = reviews.toSorted((a, b) => b.rating - a.rating);
        break;

      case "low":
        sortedList = reviews.toSorted((a, b) => a.rating - b.rating);
        break;
    }

    setSortedReviews(sortedList);
    setSlicedReviews(sortedList.slice(0, 5));
    setCurrentPage(1);
  }

  return (
    <div className={styles.sort}>
      <select
        name="sort"
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
