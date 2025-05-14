"use client";

import { priceOptions } from "@/lib/constants";
import styles from "./products-filter.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BrandOptions } from "../product-queries";
import dynamic from "next/dynamic";
import { selectStyles } from "@/lib/styles";
import { SlidersHorizontal } from "lucide-react";
const ReactSelect = dynamic(() => import("react-select"), {
  ssr: false,
  loading: () => <p>SELECT</p>,
});

interface ProductsFilterProps {
  specifications: Record<string, any[]>;
  brands: BrandOptions[];
}

export default function ProductsFilter({
  specifications,
  brands,
}: ProductsFilterProps) {
  const [url, setUrl] = useState<URL>();

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentUrl = new URL(window.location.href);
      setUrl(currentUrl);
    }
  }, []);

  function handleRoute() {
    return router.push(url?.toString() as string, { scroll: false });
  }

  function handleFilter(filter: string, value: string) {
    if (url?.searchParams.has(filter)) {
      url?.searchParams.delete(filter);
      return handleRoute();
    }

    url?.searchParams.append(filter, value.toLowerCase());
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

  function listSpecifications() {
    const sections = [];

    for (const spec in specifications) {
      const title = spec.split("_").join(" ");
      console.log("spec", spec);

      sections.push(
        <>
          <div className={styles.content}>
            <h3>{title}</h3>
            <ul>
              {specifications[spec].map((s) => (
                <li key={s}>
                  <input
                    type="checkbox"
                    name={s}
                    id={s}
                    onChange={() => handleFilter(spec, s)}
                  />
                  <label htmlFor={s}>{s}</label>
                </li>
              ))}
            </ul>
          </div>
        </>
      );
    }

    return sections;
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <SlidersHorizontal size={18} />
        <h2>Filter</h2>
      </div>

      <div className={styles.content}>
        <div>
          <h3>Price (€)</h3>
          <ReactSelect
            isClearable
            placeholder="Show all"
            options={priceOptions}
            onChange={(price) => handlePriceChange(price as PriceOption)}
            styles={selectStyles}
          />
        </div>

        <h3>Brands</h3>

        <ul>
          {brands.map((item) => (
            <li key={item.brand}>
              <input
                type="checkbox"
                name={item.brand}
                id={item.brand}
                onChange={() => handleFilter("brand", item.brand)}
              />
              <label htmlFor={item.brand}>{item.brand}</label>
            </li>
          ))}
        </ul>

        {listSpecifications()}
      </div>
    </div>
  );
}
