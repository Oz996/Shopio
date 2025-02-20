import { Search } from "lucide-react";
import styles from "./header.module.scss";
import Link from "next/link";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/home" className={styles.logo}>
        <h2>Shopio</h2>
      </Link>
      <nav className={styles.nav}>
        <div className={styles.input_div}>
          <input
            type="text"
            placeholder="Search for products"
            className={styles.input}
          />
          <Search className={styles.icon_search} size={20} />
        </div>

        <div>
          <span className={styles.text}>Products</span>
        </div>

        <div>
          <span className={styles.text}>Sign Up / Login</span>
        </div>
      </nav>
    </header>
  );
}
