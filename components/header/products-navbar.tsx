"use client";

import { ChevronDown, Headphones, Laptop, Monitor, Tablet } from "lucide-react";
import styles from "./header.module.scss";
import { useState } from "react";
import { productCategories } from "@/lib/constants";
import Link from "next/link";

export default function ProductsNavbar() {
  const [isOpen, setIsOpen] = useState(false);

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

export type Category = (typeof productCategories)[number];

export function categoryIcons(category: Category) {
  const size = 16;
  switch (category.toLowerCase()) {
    case "monitors":
      return <Monitor size={size} />;
    case "headphones":
      return <Headphones size={size} />;
    case "laptops":
      return <Laptop size={size} />;
    case "tablets":
      return <Tablet size={size} />;
    default:
      console.error("Product category does not exist");
  }
}
