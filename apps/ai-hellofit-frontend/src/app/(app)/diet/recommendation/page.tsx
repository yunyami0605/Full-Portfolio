"use client";

import styles from "./Recommendation.module.scss";
import React, { useState } from "react";
import { ActiveButton, Card, IconButton, PageWrapper, Tab } from "@/shared/components";
import { useGetDietsRecommendationsApi } from "@/features/diet/_hooks/query";
import { Button, Center, Column, Row, Text } from "@my/ui";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import clsx from "clsx";

/**
 *@description 추천 식단 페이지
 */
function RecommendationPage() {
  const router = useRouter();
  const [tab, setTab] = useState(0); // 0: 아침, 1: 점심, 2 : 저녁
  const [recommendClicked, setRecommendClicked] = useState(false);

  const date = dayjs();
  // 식단 추천 목록 조회 호출
  const { data: recommendationDatas } = useGetDietsRecommendationsApi({
    date: null,
  });

  // 날짜, 시간대 필터한 데이터
  const filteredData = (recommendationDatas?.data ?? []).filter(
    (item) => item.recommendedDate === dayjs(date).format("YYYY-MM-DD"),
  )[tab];

  const onMoveLogRegisterPage = () => {
    router.push("/diet/log/register");
  };

  return (
    <PageWrapper>
      <div className={styles.page_padding}>
        <Card className={styles.card_wrapper}>
          <Row as="section" className={styles.tabs_wrapper}>
            <Tab name={"아침"} isChecked={tab === 0} onClick={() => setTab(0)} />
            <Tab name={"점심"} isChecked={tab === 1} onClick={() => setTab(1)} />
            <Tab name={"저녁"} isChecked={tab === 2} onClick={() => setTab(2)} />
          </Row>

          <Row className={styles.recommend_wrapper}>
            <Button className={styles.manual_input_button} onClick={onMoveLogRegisterPage}>
              <Text>직접 입력하기</Text>

              <IconButton iconName={"Right"} />
            </Button>
          </Row>

          <Row className={styles.recommend_wrapper}>
            <Button
              className={clsx(styles.recommend_button, styles[recommendClicked ? "on" : "off"])}
              onClick={() => setRecommendClicked((prev) => !prev)}
            >
              <IconButton iconName={"CheckCircle"} />
            </Button>

            <Column justify="between" className={styles.recommend_inner_wrapper}>
              {(filteredData?.foods ?? []).map((item, i) => (
                <Column className={styles.data} key={i} justify="between">
                  <Row className={styles.data_left_view}>
                    <Text>{i + 1}.</Text>
                    <Text>{item.foodName}</Text>

                    <Text>{item.calories}kcal</Text>
                  </Row>

                  <Row justify="between" className={styles.nutrition_wrapper}>
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
                </Column>
              ))}
            </Column>
          </Row>

          <ActiveButton name={"다음"} type={"button"} activeType="positive" />
        </Card>
      </div>
    </PageWrapper>
  );
}

export default RecommendationPage;
