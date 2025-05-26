import useRoute from "@/hooks/use-route";
import { useEffect, useState, ChangeEvent } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function usePriceFilter(prices: { from: number; to: number }) {
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

  const debouncedCommit = useDebouncedCallback((values: number[]) => {
    const from = values[0];
    const to = values[1];

    createQueryString("price", `${from}-${to}`);
  }, 300);

  const debouncedFrom = useDebouncedCallback((value: number) => {
    const from = value;
    createQueryString("price", `${from}-${to}`);
  }, 300);

  const debouncedTo = useDebouncedCallback((value: number) => {
    const to = value;
    createQueryString("price", `${from}-${to}`);
  }, 300);

  function handleSliderChange(values: number[]) {
    const from = values[0];
    const to = values[1];

    setPriceState({ from, to, selected: true });
  }

  function handleSliderCommit(values: number[]) {
    setPriceState((prev) => ({ ...prev, selected: true }));
    debouncedCommit(values);
  }

  function handleFromChange(e: ChangeEvent<HTMLInputElement>) {
    const from = Number(e.target.value);

    setPriceState((prev) => ({ ...prev, from, selected: true }));
    debouncedFrom(from);
  }

  function handleToChange(e: ChangeEvent<HTMLInputElement>) {
    const to = Number(e.target.value);

    setPriceState((prev) => ({ ...prev, to, selected: true }));
    debouncedTo(to);
  }

  function initialPrice() {
    setPriceState({
      from: prices.from,
      to: prices.to,
      selected: false,
    });
    deleteQueryString("price");
  }

  return {
    priceState,
    initialPrice,
    handleToChange,
    handleFromChange,
    handleSliderCommit,
    handleSliderChange,
  };
}
