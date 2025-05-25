import { SlidersHorizontal, X } from "lucide-react";
import styles from "./products-filter-panel.module.scss";
import { priceOptions } from "@/lib/constants";
import { Dispatch, SetStateAction } from "react";
import { BrandOptions } from "@/lib/types";
import PriceSlider from "./price-slider/price-slider";
import { useSearchParams } from "next/navigation";
import useRoute from "@/hooks/use-route";

interface FilterPanelProps {
  specifications: Record<string, any[]>;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  prices: { from: number; to: number };
  brands: BrandOptions[];
}

export default function FilterPanel({
  specifications,
  setIsOpen,
  prices,
  brands,
}: FilterPanelProps) {
  const { from, to } = prices;

  const searchParams = useSearchParams();

  const { createQueryString, deleteQueryString } = useRoute();

  const price = searchParams.get("price")?.split("-");
  const currentPrice = priceOptions?.find((p) => p.from == Number(price?.[0]));

  function handleFilter(name: string, value: string) {
    const current = searchParams.get(name);

    if (current === value) {
      return deleteQueryString(name);
    }

    createQueryString(name, value);
  }

  function listSpecifications() {
    const sections = [];

    for (const spec in specifications) {
      const title = spec.split("_").join(" ");

      sections.push(
        <div className={styles.content} key={crypto.randomUUID()}>
          <h3>{title}</h3>
          <ul>
            {specifications[spec].map((value) => (
              <li key={value}>
                <input
                  checked={searchParams.get(spec) === value}
                  type="checkbox"
                  id={value}
                  onChange={() => handleFilter(spec, value)}
                />
                <label htmlFor={value}>{value}</label>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    return sections;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <SlidersHorizontal size={18} />
        <h2>Filter</h2>

        {setIsOpen && (
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close filter options"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <div className={styles.content}>
        <h3>Price (€)</h3>
        <PriceSlider prices={prices} />
        {/* <PriceSelect onChange={handlePriceChange} /> */}
      </div>

      <div className={styles.filter_options}>
        <div className={styles.content}>
          <h3>Brands</h3>

          <ul>
            {brands.map((item) => (
              <li key={item.brand}>
                <input
                  checked={searchParams.get("brand") === item.brand}
                  type="checkbox"
                  name={item.brand}
                  id={item.brand}
                  onChange={() => handleFilter("brand", item.brand)}
                />
                <label htmlFor={item.brand}>{item.brand}</label>
              </li>
            ))}
          </ul>
        </div>
        {listSpecifications()}
      </div>
    </div>
  );
}
