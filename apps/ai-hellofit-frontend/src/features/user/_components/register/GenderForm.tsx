"use client";

import styles from "./UserInfoForm.module.scss";
import React from "react";
import { Text } from "@my/ui";
import { ToggleSelector } from "@/shared/components/input/ToggleSelector";
import { ActiveButton } from "@/shared/components";

interface Props {
  onMove: () => void;
}

function GenderForm({ onMove }: Props) {
  return (
    <section className={styles.page_layout}>
      <section className={styles.top_wrapper}>
        <section className={styles.register_info}>
          <Text className={styles.title}>성별을 선택해주세요.</Text>

          <Text className={styles.description}>{"추천 식단에 영향을 줄 수 있어요."}</Text>
        </section>

        <ToggleSelector
          firstButtonName="남"
          secondButtonName="여"
          label="성별"
          isFirst={false}
          setFirst={function (isFirst: boolean): void {
            throw new Error("Function not implemented.");
          }}
        />
      </section>

      <ActiveButton name={"다음"} onClick={onMove} activeType="positive" type={"button"} />
    </section>
  );
}

export default GenderForm;
