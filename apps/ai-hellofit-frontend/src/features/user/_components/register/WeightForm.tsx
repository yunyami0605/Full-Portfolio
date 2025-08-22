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
 *@description 체중 폼
 */
function WeightForm({ onMove }: Props) {
  const {
    setForm,
    form: { weight },
  } = useUserProfileStore();

  const onChangeWeight = (_weight: string) => {
    if (_weight.trim() === "") {
      setForm({ weight: undefined });
      return;
    }

    let numWeight = Number(_weight);
    if (numWeight <= 0) numWeight = 1;
    else if (numWeight > 1000) numWeight = 1000;

    numWeight = Math.round(numWeight);

    setForm({ weight: Number(numWeight) });
  };

  return (
    <section className={styles.page_layout}>
      <section className={styles.top_wrapper}>
        <section className={styles.register_info}>
          <Text className={styles.title}>현재 체중은 몇 kg인가요?</Text>

          <Text className={styles.description}>
            {"솔직하게 적어주셔야 맞춤 추천이 가능해요 :)"}
          </Text>
        </section>

        <LabeledInput
          type={"number"}
          id={"kg"}
          placeholder="몸무게 (kg)"
          label="몸무게 (kg)"
          onChange={(e) => onChangeWeight(e.target.value)}
          value={weight ?? ""}
        />
      </section>

      <ActiveButton
        name={"다음"}
        onClick={onMove}
        activeType={weight ? "positive" : "disabled"}
        type={"button"}
      />
    </section>
  );
}

export default WeightForm;
