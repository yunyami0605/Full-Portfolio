"use client";

import clsx from "clsx";
import styles from "./LoginForm.module.scss";
import React from "react";
import { LabeledInput } from "@/shared/input/LabeledInput";
import ActiveButton from "@/shared/button/ActiveButton";
import KakaoRoundedButton from "../button/KakaoRoundedButton";
import AppleRoundedButton from "../button/AppleRoundedButton";
import TextButton from "@/shared/button/TextButton";

/**
 *@description 이메일 로그인 폼
 */
function LoginForm() {
  return (
    <section className={clsx(styles.wrapper)}>
      <div className={styles.input_wrapper}>
        <LabeledInput id={"email"} placeholder="이메일" />
        <LabeledInput id={"password"} placeholder="비밀번호" />
      </div>

      <ActiveButton name={"로그인"} activeType="positive" />

      <div className={styles.social_button_wrapper}>
        <KakaoRoundedButton
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
        />

        <div className={styles.divider}></div>

        <AppleRoundedButton
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>

      <div className={styles.helper_button_wrapper}>
        <TextButton name={"이메일 찾기"} />

        <TextButton name={"비밀번호 찾기"} />
      </div>
    </section>
  );
}

export default LoginForm;
