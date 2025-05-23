"use client";

import styles from "./products-filter.module.scss";
import { useState } from "react";
import { BrandOptions } from "@/lib/types";
import { SlidersHorizontal } from "lucide-react";
import FilterPanel from "./products-filter-panel/products-filter-panel";

interface ProductsFilterProps {
  specifications: Record<string, any[]>;
  searchParams: Record<string, string>;
  brands: BrandOptions[];
}

export default function ProductsFilter({
  specifications,
  searchParams,
  brands,
}: ProductsFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* desktop */}
      <div className={styles.desktop}>
        <FilterPanel
          specifications={specifications}
          searchParams={searchParams}
          brands={brands}
        />
      </div>

      {/* mobile */}
      <div className={styles.mobile}>
        {isOpen ? (
          <FilterPanel
            specifications={specifications}
            searchParams={searchParams}
            setIsOpen={setIsOpen}
            brands={brands}
          />
        ) : (
          <button
            onClick={() => setIsOpen(true)}
            className={styles.filters_button}
          >
            <SlidersHorizontal size={15} />
            <h2>Filter</h2>
          </button>
        )}
      </div>
    </>
  );
}
