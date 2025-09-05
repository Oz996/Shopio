import Link from "next/link";
import styles from "./header.module.scss";
import { ChevronRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { productCategories } from "@/lib/constants";
import { Session } from "next-auth";
import SignOutButton from "./sign-out-button";
import SearchBar from "./search-bar/search-bar";
import Cart from "./cart/cart";

interface HeaderMobileProps {
  authorized: Session | null;
}

export default function HeaderMobile({ authorized }: HeaderMobileProps) {
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
        <SearchBar />

        <div className={styles.nav_item}>
          <Cart />
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
              {authorized ? (
                <SignOutButton />
              ) : (
                <Link href="/sign-in">Sign Up / Login</Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
