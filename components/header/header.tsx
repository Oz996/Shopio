import { Search } from "lucide-react";
import styles from "./header.module.scss";
import Link from "next/link";
import ProductsNavbar from "./products-navbar";
import HeaderMobile from "./header-mobile";

export default function Header() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link href="/home">
            <h2>Shopio</h2>
          </Link>
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

          <ProductsNavbar />

          <div className={styles.nav_item}>
            <span className={styles.text}>Sign Up / Login</span>
          </div>
        </nav>
      </header>

      <HeaderMobile />
    </>
  );
}
