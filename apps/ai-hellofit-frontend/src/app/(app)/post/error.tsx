"use client";

import React from "react";
import styles from "./Error.module.scss";

/**
 * @description 게시글 목록 페이지 에러 화면
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error("🚨 [Posts Error Boundary]", error);

  return (
    <main className={styles.error_container}>
      <h1 className={styles.title}>게시글을 불러오는 중 오류가 발생했습니다</h1>
      <p className={styles.message}>{error.message || "알 수 없는 오류가 발생했습니다."}</p>

      <button className={styles.retry_btn} onClick={() => reset()}>
        다시 시도하기
      </button>
    </main>
  );
}
