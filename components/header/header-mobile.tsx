"use client";

import Link from "next/link";
import styles from "./header.module.scss";
import { ChevronRight, Menu, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { productCategories } from "@/lib/constants";

export default function HeaderMobile() {
  const [isOpen, setIsOpen] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      navRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className={`${styles.header} ${styles.header_mobile}`}>
      <div className={styles.logo}>
        <Link href="/home">
          <h2>Shopio</h2>
        </Link>

        {isOpen ? (
          <button onClick={() => setIsOpen(false)}>
            <X />
          </button>
        ) : (
          <button onClick={() => setIsOpen(true)}>
            <Menu />
          </button>
        )}
      </div>

      <nav className={styles.nav}>
        <div className={styles.input_div}>
          <input
            type="text"
            placeholder="Search for products"
            className={styles.input}
          />
          <Search className={styles.icon_search} size={20} />
        </div>
        {isOpen && (
          <div className={styles.nav_mobile} ref={navRef}>
            {productCategories.map((category) => (
              <div className={styles.nav_item_mobile} key={category}>
                <div
                  style={{
                    backgroundImage: `url("/banner-${category
                      .toLowerCase()
                      .slice(0, -1)}.webp")`,
                  }}
                ></div>
                <Link href={`/products/${category.toLowerCase()}`}>
                  <span>{`Browse ${category}`}</span>
                  <ChevronRight size={20} />
                </Link>
              </div>
            ))}
            <div className={styles.nav_item}>
              <span className={styles.text}>Sign Up / Login</span>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
