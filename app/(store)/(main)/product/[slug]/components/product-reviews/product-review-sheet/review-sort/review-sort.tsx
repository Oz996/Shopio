"use client";

import dynamic from "next/dynamic";
import { ProductSortType } from "../product-review-sheet";
import styles from "./review-sort.module.scss";
const ReactSelect = dynamic(() => import("react-select"), { ssr: false });

interface ReviewSortProps {
  currentSort: ProductSortType;
  sortReviews: (sort: ProductSortType) => void;
}

type SortName = "Latest" | `${Capitalize<ProductSortType>} rating`;

interface SortOptions {
  value: ProductSortType;
  label: SortName;
}

const options: SortOptions[] = [
  { value: "latest", label: "Latest" },
  { value: "high", label: "High rating" },
  { value: "low", label: "Low rating" },
];

export default function ReviewSort({
  currentSort,
  sortReviews,
}: ReviewSortProps) {
  const selectedSort = options.find((option) => option.value === currentSort);

  return (
    <div className={styles.sort}>
      <ReactSelect
        value={selectedSort}
        styles={customStyles}
        options={options}
        onChange={(selected) => sortReviews((selected as any).value)}
        aria-label="Sort reviews"
        isSearchable={false}
      />
    </div>
  );
}

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    fontSize: "14px",
    cursor: "pointer",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    fontSize: "14px",
    backgroundColor: state.isFocused ? "#e4e9f4" : "white",
    cursor: "pointer",
    color: "black",
  }),
  singleValue: (provided: any) => ({
    ...provided,
    fontSize: "14px",
  }),
};
