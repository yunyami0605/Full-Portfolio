"use client";

import styles from "./DietLogReigsterPage.module.scss";
import React, { useEffect, useRef, useState } from "react";
import { PageWrapper } from "@/shared/components/layout/PageWrapper";
import { Button, Center, Column, Input, Row, Text } from "@my/ui";
import { IconButton } from "@/shared/components";
import { useGetFoodsSearch } from "@/features/food/_hooks/query";
import { usePostDietsLogsMe } from "@/features/diet/_hooks/mutation";
import { useGetDietsRecommendationsApi } from "@/features/diet/_hooks/query";
import dayjs from "dayjs";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { MealType, SourceType } from "@/features/diet/types/base";
import { useUiStore } from "@/shared/stores/ui.store";

/**
 *@description 식단 등록 페이지
 */
function DietLogReigsterPage() {
  // 선택된 음식들 state
  const [selectedLog, setSelectedLog] = useState<
    {
      foodName: string;
      id: string;
    }[]
  >([]);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const { showToast } = useUiStore();

  const timeKorText = ["아침", "점심", "저녁"];
  const timeEngText = ["BREAKFAST", "LUNCH", "DINNER"];

  const searchParams = useSearchParams();

  const date = searchParams.get("date");
  const tab = searchParams.get("tab"); // 0: 아침, 1: 점심, 2 : 저녁

  useEffect(() => {
    if (tab === null) {
      if (window.history.length > 1) {
        router.back();
      } else {
        router.push("/");
      }
    }
  }, [tab, router]);

  // 검색어
  const [keyword, setKeyword] = useState<string>();

  // 음식 목록 조회 api 호출
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetFoodsSearch(10, keyword);

  // 식단 기록 등록 api 호출
  const { mutateAsync: mutateCreateDietsLogs } = usePostDietsLogsMe();

  const foodsData = data?.pages.flatMap((page) => page.data.items) ?? [];

  // 식단 추천 목록 조회 호출
  const { data: recommendationDatas } = useGetDietsRecommendationsApi({
    date,
  });

  // 날짜, 시간대 필터한 데이터
  const filteredData = (recommendationDatas?.data ?? []).filter(
    (item) => item.recommendedDate === dayjs(date).format("YYYY-MM-DD"),
  )[tab as any];

  // 기록 추가/삭제
  const onFoodAction = (id: string, name: string, isAdd: boolean) => {
    if (isAdd) {
      onAddLog(id, name);
    } else {
      onDeleteLog(id);
    }
  };

  // 기록 추가
  const onAddLog = (id: string, name: string) => {
    setSelectedLog((prev) => [
      ...prev,
      {
        foodName: name,
        id,
      },
    ]);
  };

  // 기록 제거
  const onDeleteLog = (id: string) => {
    setSelectedLog((prev) => prev.filter((item) => item.id !== id));
  };

  /**
   * 식단 기록 등록 이벤트
   */
  const onCreateDietsLogs = () => {
    if (date === null) return;

    const body = {
      mealType: timeEngText[tab as any] as MealType,
      logDate: date,
      source: "USER" as SourceType,
      items: selectedLog,
    };
    mutateCreateDietsLogs(body).then((response) => {
      if (response.status === 201) {
        showToast({
          message: "정상적으로 식단 등록되었습니다.",
          type: "success",
        });
        router.back();
      }
    });
  };

  // 무한스크롤링 하단 체크
  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }, // 100% 보일 때 실행
    );

    observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <PageWrapper>
      {/* 검색바 */}
      <Column as="section" className={styles.page_inner_wrapper}>
        <Row as="section" className={styles.search_top_view}>
          <Row className={styles.search_wrapper}>
            <IconButton iconName={"SearchOutline"} />

            <Input
              className={styles.search}
              onChange={(e) => setKeyword(e.target.value)}
              value={keyword}
            />
          </Row>
        </Row>

        <Column className={styles.foods_list}>
          {/* 음식 목록 */}
          {foodsData.map((item, i) => {
            const isSelected = !!selectedLog.find((log) => log.id === item.id);
            return (
              <Row className={styles.food_item} key={item.id}>
                <Row justify="between" className={styles.food_item_wrapper}>
                  <Row className={styles.food_info_wrapper}>
                    <Text className={styles.index}>{i + 1}</Text>

                    <Column className={styles.food_data}>
                      <Text className={styles.food_name}>{item.repFoodName}</Text>

                      <Row className={styles.infos}>
                        {/* <Text>1공기 (210g)</Text> */}
                        <Text>{item.kcal}kcal</Text>
                        <Row justify="between" className={styles.nutrition_wrapper}>
                          <Text>
                            <span className={styles.nutrition_name}>탄</span>
                            {item.carbs}g
                          </Text>

                          <Text>
                            <span className={styles.nutrition_name}>단</span>
                            {item.protein}g
                          </Text>

                          <Text>
                            <span className={styles.nutrition_name}>지</span>
                            {item.fat}g
                          </Text>
                        </Row>
                      </Row>
                    </Column>
                  </Row>

                  <Button
                    className={styles.add_button}
                    onClick={() => onFoodAction(item.id, item.repFoodName, !isSelected)}
                  >
                    <Center className={styles.add_button_wrapper}>
                      <IconButton iconName={isSelected ? "Close" : "AddOutline"} />
                    </Center>
                  </Button>
                </Row>
              </Row>
            );
          })}

          <div ref={loaderRef} style={{ height: 20 }} />
        </Column>

        <Column className={styles.bottom_action_sheet}>
          <Column className={styles.recommend_view}>
            <Text className={styles.recommend_title}>금일 추천 식단</Text>

            <Row className={styles.recommend_inner_wrapper}>
              {(filteredData?.foods ?? []).map((item, i) => (
                <Center>
                  <Text>
                    {i + 1}. {item.foodName}
                  </Text>
                </Center>
              ))}
            </Row>
          </Column>

          <Column className={styles.recommend_view}>
            <Text className={styles.recommend_title}>기록한 식단</Text>

            <Row className={styles.selected_foods_wrapper}>
              {selectedLog.map((log) => (
                <Row key={log.id}>
                  <button className={styles.selected_food} onClick={() => onDeleteLog(log.id)}>
                    <Text>{log.foodName}</Text>

                    <IconButton iconName={"Close"} size={20} />
                  </button>
                </Row>
              ))}
            </Row>
          </Column>

          <Column className={styles.bottom_view}>
            <Button onClick={onCreateDietsLogs} className={styles.ok_button}>
              {timeKorText[tab as any]} 식단 기록
            </Button>
          </Column>
        </Column>
      </Column>
    </PageWrapper>
  );
}

export default DietLogReigsterPage;
