import Link from "next/link";
import styles from "./NotFound.module.scss";

/**
 * @description 404 Not Found 페이지 (존재하지 않는 경로 접근 시)
 */
export default function NotFound() {
  return (
    <main className={styles.container}>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>페이지를 찾을 수 없습니다</h1>
      <p className={styles.message}>
        요청하신 주소가 잘못되었거나 페이지가 이동·삭제되었을 수 있습니다.
      </p>
      <Link href="/main" className={styles.link}>
        홈으로 돌아가기
      </Link>
    </main>
  );
}
