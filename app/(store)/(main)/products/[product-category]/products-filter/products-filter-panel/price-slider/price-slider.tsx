import { useEffect, useState } from "react";
import styles from "./price-slider.module.scss";
import * as Slider from "@radix-ui/react-slider";
import useRoute from "@/hooks/use-route";

interface PriceSliderProps {
  prices: { from: number; to: number };
}

export default function PriceSlider({ prices }: PriceSliderProps) {
  const [priceState, setPriceState] = useState({
    from: prices.from,
    to: prices.to,
  });

  const { from, to } = priceState;
  const { createQueryString, deleteQueryString } = useRoute();

  useEffect(() => {
    setPriceState({
      from: prices.from,
      to: prices.to,
    });
  }, [prices]);

  function handlePriceChange(values: number[]) {
    const from = values[0];
    const to = values[1];
  }

  return (
    <div className={styles.wrapper}>
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
        className={styles.root}
        value={[from, to]}
        min={0}
        max={3000}
        step={1}
        minStepsBetweenThumbs={1}
        onValueChange={([newFrom, newTo]) =>
          setPriceState({ from: newFrom, to: newTo })
        }
        onValueCommit={handlePriceChange}
      >
        <Slider.Track className={styles.track}>
          <Slider.Range className={styles.range} />
        </Slider.Track>
        <Slider.Thumb className={styles.thumb} aria-label="Price from" />
        <Slider.Thumb className={styles.thumb} aria-label="Price to" />
      </Slider.Root>
    </div>
  );
}
