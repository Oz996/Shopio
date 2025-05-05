import Header from "@/components/header/header";
import styles from "./layout.module.scss";
import { ReactNode } from "react";
import { auth } from "@/auth";

export default async function StoreLayout({
  children,
}: {
  children: ReactNode;
}) {
  const authorized = await auth();

  return (
    <>
      <Header authorized={authorized} />
      <main className={styles.store_wrapper}>{children}</main>
    </>
  );
}
