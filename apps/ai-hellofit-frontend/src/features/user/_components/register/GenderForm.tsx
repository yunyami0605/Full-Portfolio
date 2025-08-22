"use client";

import styles from "./UserInfoForm.module.scss";
import React from "react";
import { Text } from "@my/ui";
import { ToggleSelector } from "@/shared/components/input/ToggleSelector";
import { ActiveButton } from "@/shared/components";
import { GenderType, useUserProfileStore } from "../..";

interface Props {
  onMove: () => void;
}

function GenderForm({ onMove }: Props) {
  const {
    setForm,
    form: { gender },
  } = useUserProfileStore();

  const onSelect = (_gender: GenderType) => {
    setForm({ gender: _gender });
  };

  return (
    <section className={styles.page_layout}>
      <section className={styles.top_wrapper}>
        <section className={styles.register_info}>
          <Text className={styles.title}>성별을 선택해주세요.</Text>

          <Text className={styles.description}>{"추천 식단에 영향을 줄 수 있어요."}</Text>
        </section>

        <ToggleSelector<GenderType>
          firstValue="MALE"
          secondValue="FEMALE"
          firstButtonName="남"
          secondButtonName="여"
          label="성별"
          value={gender}
          setValue={(value) => onSelect(value)}
        />
      </section>

      <ActiveButton
        name={"다음"}
        onClick={onMove}
        activeType={gender ? "positive" : "disabled"}
        type={"button"}
      />
    </section>
  );
}

export default GenderForm;
