import Header from "@/components/header/header";
import styles from "./layout.module.scss";
import { ReactNode } from "react";
import { auth } from "@/auth";

export default async function StoreLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  return (
    <>
      <Header authorized={session} />
      <main className={styles.store_wrapper}>{children}</main>
    </>
  );
}
