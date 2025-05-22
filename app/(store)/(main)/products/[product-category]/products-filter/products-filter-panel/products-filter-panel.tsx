import { SlidersHorizontal, X } from "lucide-react";
import styles from "./products-filter-panel.module.scss";
import dynamic from "next/dynamic";
import { selectStyles } from "@/lib/styles";
import { priceOptions } from "@/lib/constants";
import { Dispatch, SetStateAction } from "react";
import useRoute from "@/hooks/use-route";
import { BrandOptions } from "../../product-queries";
const ReactSelect = dynamic(() => import("react-select"), {
  ssr: false,
  loading: () => <p>SELECT</p>,
});

interface FilterPanelProps {
  specifications: Record<string, any[]>;
  searchParams: Record<string, string>;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  brands: BrandOptions[];
}

export default function FilterPanel({
  specifications,
  searchParams,
  setIsOpen,
  brands,
}: FilterPanelProps) {
  const { url, handleRoute } = useRoute();

  const price = searchParams.price?.split("-");
  const currentPrice = priceOptions?.find((p) => p.from == Number(price?.[0]));

  function handleFilter(filter: string, value: string) {
    if (url?.searchParams.has(filter)) {
      url?.searchParams.delete(filter);
      return handleRoute();
    }

    url?.searchParams.append(filter, value);
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
        <div className={styles.content} key={crypto.randomUUID()}>
          <h3>{title}</h3>
          <ul>
            {specifications[spec].map((s) => (
              <li key={s}>
                <input
                  checked={[searchParams[spec]].includes(s)}
                  type="checkbox"
                  id={s}
                  onChange={() => handleFilter(spec, s)}
                />
                <label htmlFor={s}>{s}</label>
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
        <ReactSelect
          isClearable
          placeholder="Show all"
          value={currentPrice}
          options={priceOptions}
          onChange={(price) => handlePriceChange(price as PriceOption)}
          styles={selectStyles}
        />
      </div>

      <div className={styles.filter_options}>
        <div className={styles.content}>
          <h3>Brands</h3>

          <ul>
            {brands.map((item) => (
              <li key={item.brand}>
                <input
                  checked={searchParams?.brand === item.brand}
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
