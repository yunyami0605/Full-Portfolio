"use client";

import styles from "./UserInfoForm.module.scss";
import React from "react";
import { Text } from "@my/ui";
import { LabeledInput } from "@/shared/components/input/LabeledInput";
import { ActiveButton } from "@/shared/components";

interface Props {
  onMove: () => void;
}

/**
 *@description 운동시간
 */
function ExerciseTimeForm({ onMove }: Props) {
  return (
    <section className={styles.page_layout}>
      <section className={styles.top_wrapper}>
        <section className={styles.register_info}>
          <Text className={styles.title}>하루에 운동 가능한 시간은 얼마나 되나요?</Text>

          <Text className={styles.description}>{"(10분 / 30분 / 1시간 등)"}</Text>
        </section>

        <LabeledInput id={"exercise_time"} placeholder="운동시간 (시간)" label="운동 시간" />
      </section>

      <section className={styles.bottom_wrapper}>
        <ActiveButton name={"건너뛰기"} onClick={onMove} activeType="skip" type={"button"} />

        <ActiveButton name={"다음"} onClick={onMove} activeType="positive" type={"button"} />
      </section>
    </section>
  );
}

export default ExerciseTimeForm;
