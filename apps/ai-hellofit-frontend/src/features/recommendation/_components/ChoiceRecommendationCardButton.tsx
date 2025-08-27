"use client";

import styles from "./ChoiceRecommendationCardButton.module.scss";
import React from "react";
import { Button, Center, Column, Text } from "@my/ui";
import { IconButton } from "@/shared/components";

type Props = {
  title: string;
  data: any[];
  isChecked: boolean;
};
/**
 *@description 식단/운동 선택 추천 버튼
 */
function ChoiceRecommendationCardButton({ title, data, isChecked }: Props) {
  return (
    <section className={styles.card_inner_wrapper}>
      <Button className={styles.card_button} onClick={() => {}}>
        <Center className={styles.check_wrapper}>
          <IconButton color={isChecked ? "#0094ff" : "#ccc"} size={16} iconName="CheckCircle" />
        </Center>

        <Column className={styles.data_wrapper}>
          <Text className={styles.title}>{title}</Text>

          <Column className={styles.data}>
            {data.map((item, i) => (
              <Text key={i}>{item} 계란 1개</Text>
            ))}
          </Column>
        </Column>
      </Button>
    </section>
  );
}

export default ChoiceRecommendationCardButton;
