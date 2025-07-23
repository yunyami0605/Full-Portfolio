"use client";

import styles from "./RecommendationInfoCard.module.scss";
import React, { useState } from "react";
import Card from "@/shared/layout/Card";
import { Column, Row, Text } from "@my/ui";
import { FaAngleRight } from "react-icons/fa";
import Tab from "@/shared/tab/Tab";

type Props = { title: string };

/**
 *@description 추천 정보 카드
 */
function RecommendationInfoCard({ title }: Props) {
  const [tab, setTab] = useState<"아침" | "점심" | "저녁">("아침");

  const list = [
    {
      id: 1,
      food: "계란",
      count: 2,
    },

    {
      id: 2,
      food: "사과",
      count: 3,
    },

    {
      id: 3,
      food: "배추",
      count: 1,
    },
  ];
  return (
    <Card className={styles.card_custom}>
      <Row className={styles.title_wrapper}>
        <Text className={styles.title}>{title}</Text>

        <FaAngleRight fill={"#333"} size={18} />
      </Row>

      <section className={styles.tabs_wrapper}>
        <Tab name={"아침"} isChecked={tab === "아침"} onClick={() => setTab("아침")} />
        <Tab name={"점심"} isChecked={tab === "점심"} onClick={() => setTab("점심")} />
        <Tab name={"저녁"} isChecked={tab === "저녁"} onClick={() => setTab("저녁")} />
      </section>

      <Column justify="between" className={styles.data_wrapper}>
        {list.map((item, i) => (
          <Row className={styles.data} key={item.id}>
            <Text>{i + 1}.</Text>
            <Text>{item.food}</Text>
            <Text>{item.count}개</Text>
          </Row>
        ))}
      </Column>
    </Card>
  );
}

export default RecommendationInfoCard;
