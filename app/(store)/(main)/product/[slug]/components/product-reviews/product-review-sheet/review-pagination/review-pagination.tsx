import { Review } from "@prisma/client";
import styles from "./review-pagination.module.scss";
import { Dispatch, SetStateAction } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ReviewPaginationProps {
  reviews: Review[];
  length: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setSlicedReviews: Dispatch<SetStateAction<Review[]>>;
}

export default function ReviewPagination({
  length,
  reviews,
  currentPage,
  setCurrentPage,
  setSlicedReviews,
}: ReviewPaginationProps) {
  const reviewsPerPage = 6;
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  console.log("total", totalPages);

  const pages = new Array(totalPages).fill(0);

  function changePage(page: number) {
    setCurrentPage(page + 1);

    let startIndex = page * reviewsPerPage;
    if (page === 0) startIndex = 0;
    setSlicedReviews(reviews.slice(startIndex, startIndex + reviewsPerPage));
  }

  function nextPage() {
    const startIndex = currentPage * reviewsPerPage;
    setCurrentPage((curr) => curr + 1);
    setSlicedReviews(reviews.slice(startIndex, startIndex + reviewsPerPage));
  }

  function previousPage() {
    const newPage = currentPage - 1;
    const startIndex = (newPage - 1) * reviewsPerPage;
    setCurrentPage(newPage);
    setSlicedReviews(reviews.slice(startIndex, startIndex + reviewsPerPage));
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
