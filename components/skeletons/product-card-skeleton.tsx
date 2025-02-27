import styles from "./product-card-skeleton.module.scss";

export default function ProductCardSkeleton() {
  return (
    <div className={styles.card}>
      <div className={styles.image} />
      <div className={styles.title} />
      <div className={styles.description} />
      <div className={styles.title} />
    </div>
  );
}
