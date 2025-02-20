import Header from "@/components/header/header";
import styles from "./home/page.module.scss";
import { ReactNode } from "react";

export default function StoreLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className={styles.layout}>{children}</main>
    </>
  );
}
