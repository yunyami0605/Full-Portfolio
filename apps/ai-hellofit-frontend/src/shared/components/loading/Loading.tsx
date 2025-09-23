import styles from "./Loading.module.scss";

/**
 *@description app loading
 */
export function Loading() {
  return (
    <div className={styles.overlay}>
      <div className={styles.spinner}></div>
      <p className={styles.text}>로딩중...</p>
    </div>
  );
}
