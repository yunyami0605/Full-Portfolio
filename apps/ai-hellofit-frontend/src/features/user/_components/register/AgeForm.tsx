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
 *@description 나이 폼
 */
function AgeForm({ onMove }: Props) {
  return (
    <section className={styles.page_layout}>
      <section className={styles.top_wrapper}>
        <section className={styles.register_info}>
          <Text className={styles.title}>연령대를 선택해주세요.</Text>

          <Text className={styles.description}>{"당신에게 꼭 맞는 루틴을 추천해드릴게요."}</Text>
        </section>

        <LabeledInput id={"age"} placeholder="연령대" label="연령대" />
      </section>

      <ActiveButton name={"다음"} onClick={onMove} activeType="positive" type={"button"} />
    </section>
  );
}

export default AgeForm;
