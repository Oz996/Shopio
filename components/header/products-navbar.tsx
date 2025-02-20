"use client";

import { ChevronDown } from "lucide-react";
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
                {category}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
