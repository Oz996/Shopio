"use client";

import styles from "./search-bar.module.scss";
import { ChangeEvent, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchProducts } from "./client-api";
import { Search } from "lucide-react";
import { usePathname } from "next/navigation";
import SearchList from "./search-list/search-list";
import { useDebounce } from "use-debounce";

export default function SearchBar() {
  const [value, setValue] = useState("");
  const [debouncedValue] = useDebounce(value, 300);

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["search", debouncedValue],
    queryFn: () => searchProducts(value),
    enabled: !!value,
  });

  const pathname = usePathname();

  useEffect(() => {
    setValue("");
  }, [pathname]);

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  return (
    <div className={styles.input_div}>
      <input
        type="text"
        value={value}
        onChange={handleSearch}
        placeholder="Search for products"
        className={styles.input}
      />

      <Search className={styles.icon_search} size={20} />

      {value && (
        <SearchList products={products} loading={isLoading} error={error} />
      )}
    </div>
  );
}
