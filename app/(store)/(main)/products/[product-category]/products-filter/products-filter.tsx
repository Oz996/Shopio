"use client";

import { priceOptions } from "@/lib/constants";
import styles from "./products-filter.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BrandOptions } from "../page";
import dynamic from "next/dynamic";
import { selectStyles } from "@/lib/styles";
import { SlidersHorizontal } from "lucide-react";
const ReactSelect = dynamic(() => import("react-select"), { ssr: false });

interface ProductsFilterProps {
  brands: BrandOptions[];
}

export default function ProductsFilter({ brands }: ProductsFilterProps) {
  const [url, setUrl] = useState<URL>();

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentUrl = new URL(window.location.href);
      console.log("idk", currentUrl);
      setUrl(currentUrl);
    }
  }, []);

  function handleRoute() {
    return router.push(url?.toString() as string, { scroll: false });
  }

  function handleFilter(filter: string) {
    if (url?.searchParams.has("brand")) {
      url?.searchParams.delete("brand");
      return handleRoute();
    }

    url?.searchParams.set("brand", filter.toLowerCase());
    handleRoute();
  }

  type PriceOption = (typeof priceOptions)[number];

  function handlePriceChange(price: PriceOption) {
    if (!price) {
      url?.searchParams.delete("price");
      return handleRoute();
    }

    const { from, to } = price;
    url?.searchParams.set("price", `${from}-${to}`);
    handleRoute();
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <SlidersHorizontal size={18} />
        <h2>Filter</h2>
      </div>

      <div className={styles.content}>
        <h3>Brands</h3>

        <ul>
          {brands.map((item) => (
            <li key={item.brand}>
              <input
                type="checkbox"
                name={item.brand}
                id={item.brand}
                onChange={() => handleFilter(item.brand)}
              />
              <label htmlFor={item.brand}>{item.brand}</label>
            </li>
          ))}
        </ul>

        <div>
          <h3>Price</h3>
          <ReactSelect
            isClearable
            placeholder="Show all"
            options={priceOptions}
            onChange={(price) => handlePriceChange(price as PriceOption)}
            styles={selectStyles}
          />
        </div>
      </div>
    </div>
  );
}
