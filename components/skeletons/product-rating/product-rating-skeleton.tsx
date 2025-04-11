import styles from "./product-rating-skeleton.module.scss";

export default function ProductRatingSkeleton() {
  return (
    <div className={styles.container}>
      <div className={styles.stars} />
      <div className={styles.count} />
    </div>
  );
}
