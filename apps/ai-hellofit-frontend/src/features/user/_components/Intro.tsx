"use client";

import styles from "./UserInfoForm.module.scss";
import React from "react";
import { Text } from "@my/ui";
import ActiveButton from "@/shared/button/ActiveButton";

interface Props {
  onMove: () => void;
}

/**
 *@description 초기 유저 정보 등록 인트로 화면
 */
function Intro({ onMove }: Props) {
  return (
    <section className={styles.page_layout}>
      <section className={styles.top_wrapper}>
        <section className={styles.register_info}>
          <Text className={styles.title}>헬로핏에 오신 걸 환영합니다!</Text>

          <Text className={styles.description}>
            {
              "건강한 식단과 운동 추천을 위해\n간단한 정보를 먼저 입력해 주세요.\n1분만 투자해주세요!"
            }
          </Text>
        </section>
      </section>

      <ActiveButton name={"시작"} onClick={onMove} activeType="positive" />
    </section>
  );
}

export default Intro;
