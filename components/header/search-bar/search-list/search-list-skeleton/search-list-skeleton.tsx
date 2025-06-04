import styles from "./search-list-skeleton.module.scss";

export default function SearchListSkeleton() {
  return (
    <>
      {Array(4)
        .fill(0)
        .map((_, i) => (
          <div className={styles.wrapper} key={i}>
            <div className={styles.image} />
            <div className={styles.content}>
              <div />
              <div />
            </div>
          </div>
        ))}
    </>
  );
}
