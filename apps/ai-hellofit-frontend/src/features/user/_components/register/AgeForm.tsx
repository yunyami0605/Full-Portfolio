"use client";

import styles from "./UserInfoForm.module.scss";
import React, { useState } from "react";
import { Text } from "@my/ui";
import { ActiveButton } from "@/shared/components";
import { Dropdown, DropdownItem } from "@/shared/components/dropbox/Dropdown";
import { useUserProfileStore } from "../..";
import { AgeGroup } from "../../_types";

interface Props {
  onMove: () => void;
}

/**
 *@description 나이 폼
 */
function AgeForm({ onMove }: Props) {
  const [age, setAge] = useState<DropdownItem<AgeGroup>>();
  const { setForm } = useUserProfileStore();

  const list: { text: string; value: AgeGroup }[] = [
    { text: "10대", value: "AGE_10S" },
    { text: "20대", value: "AGE_20S" },
    { text: "30대", value: "AGE_30S" },
    { text: "40대", value: "AGE_40S" },
    { text: "50대", value: "AGE_50S" },
    { text: "60대", value: "AGE_60S" },
    { text: "70대", value: "AGE_70S" },
    { text: "80대", value: "AGE_80S" },
    { text: "90대", value: "AGE_90S" },
  ];

  const onSelect = (item: DropdownItem<AgeGroup>) => {
    setAge(item);
    setForm({ ageGroup: item.value });
  };

  return (
    <section className={styles.page_layout}>
      <section className={styles.top_wrapper}>
        <section className={styles.register_info}>
          <Text className={styles.title}>연령대를 선택해주세요.</Text>

          <Text className={styles.description}>{"당신에게 꼭 맞는 루틴을 추천해드릴게요."}</Text>
        </section>

        <Dropdown
          id={"age"}
          placeholder="연령대"
          list={list}
          onSelect={onSelect}
          selectedItem={age}
        />
      </section>

      <ActiveButton
        name={"다음"}
        onClick={onMove}
        activeType={age ? "positive" : "disabled"}
        type={"button"}
      />
    </section>
  );
}

export default AgeForm;
