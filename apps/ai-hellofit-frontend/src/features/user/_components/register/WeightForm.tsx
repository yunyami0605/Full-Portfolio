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
 *@description 체중 폼
 */
function WeightForm({ onMove }: Props) {
  return (
    <section className={styles.page_layout}>
      <section className={styles.top_wrapper}>
        <section className={styles.register_info}>
          <Text className={styles.title}>현재 체중은 몇 kg인가요?</Text>

          <Text className={styles.description}>
            {"솔직하게 적어주셔야 맞춤 추천이 가능해요 :)"}
          </Text>
        </section>

        <LabeledInput id={"kg"} placeholder="몸무게 (kg)" label="몸무게" />
      </section>

      <ActiveButton name={"다음"} onClick={onMove} activeType="positive" type={"button"} />
    </section>
  );
}

export default WeightForm;
