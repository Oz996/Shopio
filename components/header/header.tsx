"use client";

import styles from "./header.module.scss";
import Link from "next/link";
import ProductsNavbar from "./products-navbar";
import HeaderMobile from "./header-mobile";
import SignOutButton from "./sign-out-button";
import { Session } from "next-auth";
import SearchBar from "./search-bar/search-bar";
import Cart from "./cart/cart";
import { useRef } from "react";
import useFocusElement from "@/hooks/use-focus-element";

interface HeaderProps {
  authorized: Session | null;
}

export default function Header({ authorized }: HeaderProps) {
  const headerRef = useRef<HTMLDivElement>(null);

  useFocusElement(headerRef);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header_wrapper} tabIndex={-1} ref={headerRef}>
          <div className={styles.logo}>
            <Link href="/home">
              <h2>Shopio</h2>
            </Link>
          </div>

          <nav className={styles.nav}>
            <SearchBar />
            <ProductsNavbar />

            <div className={styles.nav_item}>
              {authorized ? (
                <SignOutButton />
              ) : (
                <Link href="/sign-in">Sign Up / Login</Link>
              )}
            </div>

            <div className={styles.nav_item}>
              <Cart />
            </div>
          </nav>
        </div>
      </header>

      <HeaderMobile authorized={authorized} />
    </>
  );
}
