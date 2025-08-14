"use client";

import styles from "./RecordCard.module.scss";
import React, { useState } from "react";
import { Column, Row, Text } from "@my/ui";
import { Card, Tab } from "@/shared/components";

type Props = {};
/**
 *@description @TODO 기획 바뀌면 RecommendationInfoCard 와 합치기
 */
function RecordCard() {
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
    <section className={styles.card_wrapper}>
      <Row className={styles.card_date}>
        <Text>25년 7월 19일 (토)</Text>
      </Row>

      <Card className={styles.card_custom}>
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
    </section>
  );
}

export default RecordCard;
