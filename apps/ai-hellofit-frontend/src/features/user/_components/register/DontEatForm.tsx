"use client";

import styles from "./UserInfoForm.module.scss";
import React, { useState } from "react";
import { Text } from "@my/ui";
import { LabeledInput } from "@/shared/components/input/LabeledInput";
import { ActiveButton } from "@/shared/components";
import { useUserProfileStore } from "../..";

interface Props {
  onMove: () => void;
}

/**
 *@description 못드시는 음식
 *TODO 공통 검색 입력 폼 추가 => UI 수정할 계획
 */
function DontEatForm({ onMove }: Props) {
  const { setForm } = useUserProfileStore();

  const [dontEat, setDontEat] = useState<string>();
  const onChangeDonEat = (value: string) => {
    setDontEat(value);
  };

  const onSkip = () => {
    setDontEat(undefined);
    onMove();
  };

  const onClickNext = () => {
    if (!dontEat) return;

    // 일단 임시로 콤마로 구분자를 정하고 추후 공통 검색 입력 폼 추가시, 변경
    const tmp = dontEat.split(",");

    setForm({ forbiddenFoods: tmp.map((item) => item.trim()) });

    onMove();
  };

  return (
    <section className={styles.page_layout}>
      <section className={styles.top_wrapper}>
        <section className={styles.register_info}>
          <Text className={styles.title}>혹시 못 드시는 음식이 있다면 알려주세요.</Text>

          <Text className={styles.description}>{"예: 계란, 우유, 해산물 등"}</Text>
        </section>

        <LabeledInput
          id={"eat"}
          placeholder="예: 계란, 우유, 해산물 등"
          label="음식"
          value={dontEat ?? ""}
          onChange={(e) => onChangeDonEat(e.target.value)}
        />
      </section>

      <section className={styles.bottom_wrapper}>
        <ActiveButton name={"건너뛰기"} onClick={onSkip} activeType="skip" type={"button"} />

        <ActiveButton
          name={"다음"}
          onClick={onClickNext}
          activeType={dontEat ? "positive" : "disabled"}
          type={"button"}
        />
      </section>
    </section>
  );
}

export default DontEatForm;
