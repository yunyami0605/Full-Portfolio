"use client";

import styles from "./UserInfoForm.module.scss";
import React from "react";
import { Text } from "@my/ui";
import ActiveButton from "@/shared/button/ActiveButton";
import { LabeledInput } from "@/shared/input/LabeledInput";

interface Props {
  onMove: () => void;
}

/**
 *@description 수면시간 폼
 */
function SleepTimeForm({ onMove }: Props) {
  return (
    <section className={styles.page_layout}>
      <section className={styles.top_wrapper}>
        <section className={styles.register_info}>
          <Text className={styles.title}>평소 하루 평균 몇 시간 주무시나요?</Text>

          <Text className={styles.description}>{"회복도 루틴에 중요한 요소예요!"}</Text>
        </section>

        <LabeledInput id={"time"} placeholder="수면시간 (시간)" label="수면시간" />
      </section>

      <section className={styles.bottom_wrapper}>
        <ActiveButton name={"건너뛰기"} onClick={onMove} activeType="skip" />

        <ActiveButton name={"다음"} onClick={onMove} activeType="positive" />
      </section>
    </section>
  );
}

export default SleepTimeForm;
