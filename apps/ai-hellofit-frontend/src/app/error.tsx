"use client";

import React from "react";
import styles from "./GlobalError.module.scss";

/**
 * @description 글로벌 에러 바운더리 (앱 전역에서 발생한 에러 처리)
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>오류가 발생했습니다</h1>
      <p className={styles.message}>
        {error.message || "일시적인 오류가 발생했습니다. 다시 시도해 주세요."}
      </p>
      <button type="button" className={styles.retry_btn} onClick={() => reset()}>
        다시 시도하기
      </button>
    </main>
  );
}
