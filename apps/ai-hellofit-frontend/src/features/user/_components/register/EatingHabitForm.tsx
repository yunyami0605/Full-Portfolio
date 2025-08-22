"use client";

import styles from "./UserInfoForm.module.scss";
import React from "react";
import { Text } from "@my/ui";
import { ActiveButton } from "@/shared/components";

interface Props {
  onMove: () => void;
}

/**
 *@description 식습관 폼
 *TODO 추가 입력사항 -> 기획 개편으로 추가할 예정
 */
function EatingHabitForm({ onMove }: Props) {
  return (
    <section className={styles.page_layout}>
      <section className={styles.top_wrapper}>
        <section className={styles.register_info}>
          <Text className={styles.title}>식습관은 어떤 편인가요?</Text>

          <Text className={styles.description}>
            {"(기름진 음식 / 채소 위주 / 고기 위주 / 균형있게 중 택 1)"}
          </Text>
        </section>

        <section className={styles.button_select_list}>
          <ActiveButton name={"균형 있게 먹어요!"} type={"button"} />
          <ActiveButton name={"고기 위주로 먹어요."} type={"button"} />
          <ActiveButton name={"채소 위주로 먹어요."} type={"button"} />
          <ActiveButton name={"기름진 음식을 자주 먹어요."} type={"button"} />
          <ActiveButton name={"식사가 불규칙해요."} type={"button"} />
          <ActiveButton name={"탄수화물 위주로 먹어요."} type={"button"} />
        </section>
      </section>

      <section className={styles.bottom_wrapper}>
        <ActiveButton name={"건너뛰기"} onClick={onMove} activeType="skip" type={"button"} />

        <ActiveButton name={"다음"} onClick={onMove} activeType="positive" type={"button"} />
      </section>
    </section>
  );
}

export default EatingHabitForm;
