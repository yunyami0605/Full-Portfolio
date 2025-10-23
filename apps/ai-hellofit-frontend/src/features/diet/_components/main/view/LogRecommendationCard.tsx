"use client";

import styles from "./LogRecommendationCard.module.scss";
import React, { useState } from "react";
import { Button, Center, Column, Row, Text } from "@my/ui";
import { Card, IconButton, Tab } from "@/shared/components";
import dayjs from "dayjs";
import { useGetDietsLogsApi } from "../../../_hooks/query";
import { useRouter } from "next/navigation";

type Props = { title: string; date: string };

/**
 *@description 기록 정보 카드
 */
function LogRecommendationCard({ title, date }: Props) {
  const router = useRouter();
  const today = dayjs();
  const [tab, setTab] = useState(0); // 0: 아침, 1: 점심, 2 : 저녁

  // 유저 식단 기록 목록 조회 요청
  const { data: dietLogDatas } = useGetDietsLogsApi({
    endDate: today.subtract(-3, "day").format("YYYY-MM-DD"),
    startDate: today.subtract(3, "day").format("YYYY-MM-DD"),
  });

  // 현재 선택된 날짜와 식사시간대에 데이터 filter
  const filteredData = (dietLogDatas?.data ?? []).filter(
    (item) => item.logDate === dayjs(date).format("YYYY-MM-DD"),
  )[tab];

  const onMoveLogRegisterPage = () => {
    router.push(`/diet/log/register?date=${date}&tab=${tab}`);
  };

  return (
    <Card className={styles.card_custom}>
      <Row className={styles.title_wrapper}>
        <Text className={styles.title}>{title}</Text>

        <IconButton iconName="Right" fill={"#333"} size={18} onClick={onMoveLogRegisterPage} />
      </Row>

      <section className={styles.tabs_wrapper}>
        <Tab name={"아침"} isChecked={tab === 0} onClick={() => setTab(0)} />
        <Tab name={"점심"} isChecked={tab === 1} onClick={() => setTab(1)} />
        <Tab name={"저녁"} isChecked={tab === 2} onClick={() => setTab(2)} />
      </section>

      <Column justify="between" className={styles.data_wrapper}>
        {!filteredData?.foods && (
          <Center className={styles.no_log_view}>
            <Text className={styles.no_today_log_text}>오늘 식단을 기록하지 않았어요.</Text>

            <Button onClick={onMoveLogRegisterPage}>
              <Text className={styles.no_today_log_btn}>식단 기록하러 가기</Text>
            </Button>
          </Center>
        )}

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

export default LogRecommendationCard;
