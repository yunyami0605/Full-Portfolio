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
 *@description 못드시는 음식
 */
function DontEatForm({ onMove }: Props) {
  return (
    <section className={styles.page_layout}>
      <section className={styles.top_wrapper}>
        <section className={styles.register_info}>
          <Text className={styles.title}>혹시 못 드시는 음식이 있다면 알려주세요.</Text>

          <Text className={styles.description}>{"예: 계란, 우유, 해산물 등"}</Text>
        </section>

        <LabeledInput id={"eat"} placeholder="예: 계란, 우유, 해산물 등" label="음식" />
      </section>

      <section className={styles.bottom_wrapper}>
        <ActiveButton name={"건너뛰기"} onClick={onMove} activeType="skip" type={"button"} />

        <ActiveButton name={"다음"} onClick={onMove} activeType="positive" type={"button"} />
      </section>
    </section>
  );
}

export default DontEatForm;
