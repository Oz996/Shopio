import styles from "./auth.module.scss";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <main className={styles.auth_wrapper}>{children}</main>;
}
