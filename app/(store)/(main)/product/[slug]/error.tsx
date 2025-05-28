"use client";

import { useEffect } from "react";
import styles from "./page.module.scss";

export default function error({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className={styles.section}>
      <div className={styles.error}>
        <p>No product found</p>
      </div>
    </section>
  );
}
