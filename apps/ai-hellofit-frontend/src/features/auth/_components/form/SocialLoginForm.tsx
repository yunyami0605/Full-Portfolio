"use client";

import styles from "./SocialLoginForm.module.scss";
import React from "react";
import KakaoRectButton from "../button/KakaoRectButton";
import { useRouter } from "next/navigation";
import { TextButton } from "@/shared/components";

/**
 *@description 소셜 로그인 버튼들
 */
function SocialLoginForm() {
  const router = useRouter();

  return (
    <section className={styles.wrapper}>
      <KakaoRectButton
        className={styles.kakao}
        onClick={function (): void {
          throw new Error("Function not implemented.");
        }}
      />

      <TextButton
        className={styles.other}
        name={"다른 방법으로 로그인"}
        onClick={() => router.push("/login")}
      />
    </section>
  );
}

export default SocialLoginForm;
