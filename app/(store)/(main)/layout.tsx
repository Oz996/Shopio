import Header from "@/components/header/header";
import styles from "./layout.module.scss";
import { ReactNode } from "react";

export default function StoreLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className={styles.store_wrapper}>{children}</main>
    </>
  );
}
