import { Review } from "@prisma/client";
import styles from "./reviews-pagination.module.scss";
import { Dispatch, SetStateAction, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ReviewsPaginationProps {
  reviews: Review[];
  length: number;
  setSortedReviews: Dispatch<SetStateAction<Review[]>>;
}

export default function ReviewsPagination({
  reviews,
  length,
  setSortedReviews,
}: ReviewsPaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const reviewsPerPage = 4;
  const totalPages = Math.round(reviews.length / reviewsPerPage);

  const pages = new Array(totalPages).fill(0);

  function changePage(page: number) {
    setCurrentPage(page + 1);

    let startIndex = page * 4;
    if (page === 0) startIndex = 0;
    setSortedReviews(reviews.slice(startIndex, startIndex + 4));
  }

  function nextPage() {
    const startIndex = currentPage * 4;
    setCurrentPage((curr) => curr + 1);
    setSortedReviews(reviews.slice(startIndex, startIndex + 4));
  }

  function previousPage() {
    const newPage = currentPage - 1;
    const startIndex = (newPage - 1) * 4;
    setCurrentPage(newPage);
    setSortedReviews(reviews.slice(startIndex, startIndex + 4));
  }

  return (
    <div className={styles.pagination}>
      <button
        className={styles.arrow}
        disabled={currentPage === 1}
        onClick={previousPage}
      >
        {<ChevronLeft size={16} />}
      </button>

      {pages.map((_, index) => (
        <button
          className={currentPage === index + 1 ? styles.active : ""}
          key={index}
          onClick={() => changePage(index)}
        >
          {index + 1}
        </button>
      ))}

      <button className={styles.arrow} disabled={length < 4} onClick={nextPage}>
        {<ChevronRight size={16} />}
      </button>
    </div>
  );
}
