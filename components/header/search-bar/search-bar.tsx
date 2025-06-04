"use client";

import styles from "./search-bar.module.scss";
import { ChangeEvent, useEffect, useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { searchProducts } from "./client-api";
import { Search } from "lucide-react";
import { usePathname } from "next/navigation";
import SearchList from "./search-list/search-list";

const queryClient = new QueryClient();

export default function SearchBar() {
  const [value, setValue] = useState("");

  const { data: products, isLoading } = useQuery({
    queryKey: ["search", value],
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
    <QueryClientProvider client={queryClient}>
      <div className={styles.input_div}>
        <input
          type="text"
          value={value}
          onChange={handleSearch}
          placeholder="Search for products"
          className={styles.input}
        />
        <Search className={styles.icon_search} size={20} />

        {value && <SearchList products={products} isLoading={isLoading} />}
      </div>
    </QueryClientProvider>
  );
}
