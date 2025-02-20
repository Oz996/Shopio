"use client";

import {
  ChevronDown,
  Headset,
  Laptop,
  Monitor,
  ShoppingBasket,
  Tablet,
} from "lucide-react";
import styles from "./header.module.scss";
import { useState } from "react";
import { productCategories } from "@/lib/constants";
import Link from "next/link";

export default function ProductsNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  type Category = (typeof productCategories)[number];

  function categoryIcons(category: Category) {
    switch (category.toLowerCase()) {
      case "monitors":
        return <Monitor size={16} />;
      case "headsets":
        return <Headset size={16} />;
      case "laptops":
        return <Laptop size={16} />;
      case "tablets":
        return <Tablet size={16} />;
      default:
        console.error("Product category does not exist");
    }
  }

  return (
    <div
      className={styles.nav_item}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <span>Products</span>
      <ChevronDown size={17} />

      {isOpen && (
        <ul>
          <li>
            <Link href="/products">
              <ShoppingBasket size={16} />
              <span>Browse all</span>
            </Link>
          </li>
          {productCategories.map((category) => (
            <li key={category}>
              <Link href={`/products/${category.toLowerCase()}`}>
                {categoryIcons(category)}
                <span>{category}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
