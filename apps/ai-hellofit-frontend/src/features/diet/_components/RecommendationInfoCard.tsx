"use client";

import styles from "./RecommendationInfoCard.module.scss";
import React, { useState } from "react";
import { Column, Row, Text } from "@my/ui";
import { Card, IconButton, Tab } from "@/shared/components";
import { useGetDietsRecommendationsApi } from "../_hooks/query";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

type Props = { title: string; date: string };

/**
 *@description 추천 정보 카드
 */
function RecommendationInfoCard({ title, date }: Props) {
  const router = useRouter();

  const [tab, setTab] = useState(0); // 0: 아침, 1: 점심, 2 : 저녁

  // 식단 추천 목록 조회 호출
  const { data: recommendationDatas } = useGetDietsRecommendationsApi({
    date: null,
  });

  // 날짜, 시간대 필터한 데이터
  const filteredData = (recommendationDatas?.data ?? []).filter(
    (item) => item.recommendedDate === dayjs(date).format("YYYY-MM-DD"),
  )[tab];

  // 추천 식단 페이지 이동
  const onMoveDietRecommendationPage = () => {
    router.push("/diet/recommendation");
  };
  return (
    <Card className={styles.card_custom}>
      <Row className={styles.title_wrapper}>
        <Text className={styles.title}>{title}</Text>

        <IconButton
          iconName="Right"
          fill={"#333"}
          size={18}
          onClick={onMoveDietRecommendationPage}
        />
      </Row>

      <section className={styles.tabs_wrapper}>
        <Tab name={"아침"} isChecked={tab === 0} onClick={() => setTab(0)} />
        <Tab name={"점심"} isChecked={tab === 1} onClick={() => setTab(1)} />
        <Tab name={"저녁"} isChecked={tab === 2} onClick={() => setTab(2)} />
      </section>

      <Column justify="between" className={styles.data_wrapper}>
        {(filteredData?.foods ?? []).map((item, i) => (
          <Row className={styles.data} key={i} justify="between">
            <Row className={styles.data_left_view}>
              <Text>{i + 1}.</Text>
              <Text>{item.foodName}</Text>
            </Row>

            <Row justify="between" className={styles.nutrition_wrapper}>
              <Text>{item.calories}kcal</Text>

              <Text>
                <span className={styles.nutrition_name}>탄</span>
                {item.protein}g
              </Text>

              <Text>
                <span className={styles.nutrition_name}>단</span>
                {item.fat}g
              </Text>

              <Text>
                <span className={styles.nutrition_name}>지</span>
                {item.carbs}g
              </Text>
            </Row>
          </Row>
        ))}
      </Column>
    </Card>
  );
}

export default RecommendationInfoCard;
