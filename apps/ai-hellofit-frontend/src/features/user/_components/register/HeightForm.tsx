"use client";

import styles from "./UserInfoForm.module.scss";
import React from "react";
import { Text } from "@my/ui";
import { LabeledInput } from "@/shared/components/input/LabeledInput";
import { ActiveButton } from "@/shared/components";
import { useUserProfileStore } from "../..";

interface Props {
  onMove: () => void;
}

/**
 *@description 신장 폼
 */
function HeightForm({ onMove }: Props) {
  const {
    setForm,
    form: { height },
  } = useUserProfileStore();

  const onChangeHeight = (_height: string) => {
    if (_height.trim() === "") {
      setForm({ height: undefined });
      return;
    }

    let numHeight = Number(_height);
    if (numHeight <= 0) numHeight = 1;
    else if (numHeight > 300) numHeight = 300;

    numHeight = Math.round(numHeight);

    setForm({ height: numHeight });
  };

  return (
    <section className={styles.page_layout}>
      <section className={styles.top_wrapper}>
        <section className={styles.register_info}>
          <Text className={styles.title}>신장을 알려주세요.</Text>

          <Text className={styles.description}>{"단위는 cm로 입력해 주세요."}</Text>
        </section>

        <LabeledInput
          type="number"
          id={"height"}
          placeholder="신장 (키, cm)"
          label="신장 (키, cm, 소수점은 자동으로 올림됩니다.)"
          value={height ?? ""}
          onChange={(e) => onChangeHeight(e.target.value)}
        />
      </section>

      <ActiveButton
        name={"다음"}
        onClick={onMove}
        activeType={height ? "positive" : "disabled"}
        type={"button"}
      />
    </section>
  );
}

export default HeightForm;
