"use client";

import { monitorBrands, priceOptions } from "@/lib/constants";
import styles from "./products-filter.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
const ReactSelect = dynamic(() => import("react-select"), { ssr: false });

export default function ProductsFilter() {
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
      <h2>Filters</h2>

      <div>
        <h3>Brands</h3>
        {monitorBrands.map((brand) => (
          <div key={brand}>
            <input
              type="checkbox"
              name={brand}
              onChange={() => handleFilter(brand)}
            />
            <span>{brand}</span>
          </div>
        ))}

        <div>
          <h3>Price</h3>
          <ReactSelect
            options={priceOptions}
            onChange={(price) => handlePriceChange(price as PriceOption)}
            isClearable
            placeholder="Show all"
          />
        </div>
      </div>
    </div>
  );
}
