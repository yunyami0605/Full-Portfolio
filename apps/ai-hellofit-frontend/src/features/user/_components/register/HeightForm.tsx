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
 *@description 신장 폼
 */
function HeightForm({ onMove }: Props) {
  return (
    <section className={styles.page_layout}>
      <section className={styles.top_wrapper}>
        <section className={styles.register_info}>
          <Text className={styles.title}>신장을 알려주세요.</Text>

          <Text className={styles.description}>{"단위는 cm로 입력해 주세요."}</Text>
        </section>

        <LabeledInput id={"height"} placeholder="신장 (cm)" label="신장(키)" />
      </section>

      <ActiveButton name={"다음"} onClick={onMove} activeType="positive" type={"button"} />
    </section>
  );
}

export default HeightForm;
