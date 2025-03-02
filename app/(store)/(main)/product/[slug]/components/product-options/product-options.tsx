"use client";

import { Product } from "@prisma/client";
import styles from "./product-option.module.scss";
import { ChangeEvent, useState } from "react";
import { ShoppingBasket } from "lucide-react";

interface ProductOptionsProps {
  product: Product;
}

export default function ProductOptions({ product }: ProductOptionsProps) {
  const [amount, setAmount] = useState(1);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setAmount(Number(e.target.value));
  }

  function incrementAmount() {
    setAmount((prev) => prev + 1);
  }

  function decrementAmount() {
    if (amount > 1) {
      setAmount((prev) => prev - 1);
    }
  }

  return (
    <div className={styles.options}>
      <div className={styles.amount}>
        <button onClick={decrementAmount}>-</button>
        <input type="text" value={amount} onChange={handleChange} />
        <button onClick={incrementAmount}>+</button>
      </div>
      <button className={styles.add_button}>
        Add to Cart <ShoppingBasket size={16} />{" "}
      </button>
    </div>
  );
}
