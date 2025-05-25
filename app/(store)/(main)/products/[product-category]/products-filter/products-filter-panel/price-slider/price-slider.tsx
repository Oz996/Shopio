import { useEffect, useState } from "react";
import styles from "./price-slider.module.scss";
import * as Slider from "@radix-ui/react-slider";
import useRoute from "@/hooks/use-route";
import { RotateCcw } from "lucide-react";

interface PriceSliderProps {
  prices: { from: number; to: number };
}

export default function PriceSlider({ prices }: PriceSliderProps) {
  const [priceState, setPriceState] = useState({
    from: prices.from,
    to: prices.to,
    selected: false,
  });

  const { from, to } = priceState;
  const { createQueryString, deleteQueryString } = useRoute();

  useEffect(() => {
    if (!priceState.selected) {
      setPriceState({
        from: prices.from,
        to: prices.to,
        selected: false,
      });
    }
  }, [prices]);

  function handleChange(values: number[]) {
    const from = values[0];
    const to = values[1];

    setPriceState({ from, to, selected: true });
  }

  function handleCommit(values: number[]) {
    const from = values[0];
    const to = values[1];

    createQueryString("price", `${from}-${to}`);
    setPriceState((prev) => ({ ...prev, selected: true }));
  }

  function initialPrice() {
    setPriceState({
      from: prices.from,
      to: prices.to,
      selected: false,
    });
    deleteQueryString("price");
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3>Price (€)</h3>

        {priceState.selected && (
          <button
            aria-label="Reset price filter"
            title="Reset price filter"
            onClick={initialPrice}
          >
            <RotateCcw size={19} />
          </button>
        )}
      </div>

      <div className={styles.inputs}>
        <input
          type="number"
          name="from"
          value={from}
          aria-label="Price from input"
        />
        <span>-</span>
        <input type="number" name="to" value={to} aria-label="Price to input" />
      </div>

      <Slider.Root
        min={0}
        max={3000}
        step={10}
        value={[from, to]}
        className={styles.root}
        minStepsBetweenThumbs={10}
        onValueChange={handleChange}
        onValueCommit={handleCommit}
      >
        <Slider.Track className={styles.track}>
          <Slider.Range className={styles.range} />
        </Slider.Track>
        <Slider.Thumb className={styles.thumb} aria-label="Set price from" />
        <Slider.Thumb className={styles.thumb} aria-label="Set price to" />
      </Slider.Root>
    </div>
  );
}
