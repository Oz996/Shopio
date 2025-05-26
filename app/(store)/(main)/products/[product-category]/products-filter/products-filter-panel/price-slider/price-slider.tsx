import styles from "./price-slider.module.scss";
import * as Slider from "@radix-ui/react-slider";
import { RotateCcw } from "lucide-react";
import usePriceFilter from "./hooks/use-price-filter";

interface PriceSliderProps {
  prices: { from: number; to: number };
}

export default function PriceSlider({ prices }: PriceSliderProps) {
  const {
    priceState,
    initialPrice,
    handleToChange,
    handleFromChange,
    handleSliderCommit,
    handleSliderChange,
  } = usePriceFilter(prices);

  const { from, to } = priceState;

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
          onChange={handleFromChange}
        />

        <span>-</span>

        <input
          type="number"
          name="to"
          value={to}
          aria-label="Price to input"
          onChange={handleToChange}
        />
      </div>

      <Slider.Root
        min={0}
        max={3000}
        step={10}
        value={[from, to]}
        className={styles.root}
        minStepsBetweenThumbs={10}
        onValueChange={handleSliderChange}
        onValueCommit={handleSliderCommit}
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
