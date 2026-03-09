"use client";

import styles from "./DietLogRegisterPage.module.scss";
import React, { useCallback, useEffect, useRef, useState, useDeferredValue } from "react";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { PageWrapper } from "@/shared/components/layout/PageWrapper";
import { Button, Center, Column, Input, Row, Text } from "@my/ui";
import { IconButton } from "@/shared/components";
import { useGetFoodsSearch } from "@/features/food/_hooks/query";
import { usePostDietsLogsMe } from "@/features/diet/_hooks/mutation";
import { useGetDietsRecommendationsApi } from "@/features/diet/_hooks/query";
import dayjs from "dayjs";
import { useRouter, useSearchParams } from "next/navigation";
import { MealType, SourceType } from "@/features/diet/types/base";
import { useUiStore } from "@/shared/stores/ui.store";

const FOOD_ITEM_HEIGHT = 88;
const LIST_HEIGHT_OFFSET = 320;

/**
 *@description 식단 등록 페이지
 */
function DietLogRegisterPage() {
  // 선택된 음식들 state
  const [selectedLog, setSelectedLog] = useState<
    {
      foodName: string;
      id: string;
    }[]
  >([]);
  const listRef = useRef<FixedSizeList>(null);
  const router = useRouter();
  const { showToast } = useUiStore();

  const mealKorByType: Record<MealType, string> = {
    BREAKFAST: "아침",
    LUNCH: "점심",
    DINNER: "저녁",
  };
  const mealIndexByType: Record<MealType, number> = {
    BREAKFAST: 0,
    LUNCH: 1,
    DINNER: 2,
  };
  const typeByTabIndex: MealType[] = ["BREAKFAST", "LUNCH", "DINNER"];

  const searchParams = useSearchParams();

  const date = searchParams.get("date");
  const tab = searchParams.get("tab"); // 0: 아침, 1: 점심, 2 : 저녁
  const currentDay = dayjs(date ?? dayjs().format("YYYY-MM-DD"));
  const initialMealType = typeByTabIndex[Number(tab ?? 0)] ?? "BREAKFAST";
  const [mealType, setMealType] = useState<MealType>(initialMealType);

  // URL 탭과 로컬 mealType 동기화 (뒤로가기 등)
  useEffect(() => {
    const tabMealType = typeByTabIndex[Number(tab ?? 0)];
    if (tabMealType) setMealType(tabMealType);
  }, [tab]);

  useEffect(() => {
    if (tab === null) {
      if (window.history.length > 1) {
        router.back();
      } else {
        router.push("/");
      }
    }
  }, [tab, router]);

  // 날짜 이동
  const navigateToDate = (nextDateStr: string) => {
    const nextTab = tab ?? "0";
    router.replace(`/diet/log/register?date=${nextDateStr}&tab=${nextTab}`);
  };
  const movePrevDay = () => navigateToDate(currentDay.subtract(1, "day").format("YYYY-MM-DD"));
  const moveNextDay = () => navigateToDate(currentDay.add(1, "day").format("YYYY-MM-DD"));

  // 검색어
  const [keyword, setKeyword] = useState<string>("");

  const deferredKeyword = useDeferredValue(keyword);

  // 음식 목록 조회 api 호출 (지연된 검색어 기준)
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetFoodsSearch(
    10,
    deferredKeyword,
  );

  const fetchNextPageRef = useRef(fetchNextPage);
  const hasNextPageRef = useRef(hasNextPage);
  const isFetchingNextPageRef = useRef(isFetchingNextPage);
  fetchNextPageRef.current = fetchNextPage;
  hasNextPageRef.current = hasNextPage;
  isFetchingNextPageRef.current = isFetchingNextPage;

  // 식단 기록 등록 api 호출
  const { mutateAsync: mutateCreateDietsLogs, isPending: isCreatingLog } = usePostDietsLogsMe();

  const foodsData = data?.pages.flatMap((page) => page.data.items) ?? [];
  const foodsRef = useRef(foodsData);
  foodsRef.current = foodsData;

  // 식단 추천 목록 조회 호출
  const { data: recommendationDatas } = useGetDietsRecommendationsApi({
    date,
  });

  // 해당 날짜, 식사 유형에 맞는 추천 식단 (날짜 없으면 오늘 기준)
  const dateStr = date ? currentDay.format("YYYY-MM-DD") : dayjs().format("YYYY-MM-DD");
  const filteredData = (recommendationDatas?.data ?? []).find(
    (item) => item.recommendedDate === dateStr && item.mealType === mealType,
  );

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
    if (selectedLog.length === 0) {
      showToast({ message: "음식을 한 가지 이상 선택해 주세요.", type: "error" });
      return;
    }

    const body = {
      mealType,
      logDate: date,
      source: "USER" as SourceType,
      items: selectedLog,
    };
    mutateCreateDietsLogs(body)
      .then((response) => {
        if (response.status === 201) {
          showToast({
            message: "정상적으로 식단 등록되었습니다.",
            type: "success",
          });
          router.back();
        }
      })
      .catch(() => {
        showToast({ message: "식단 등록에 실패했습니다. 다시 시도해 주세요.", type: "error" });
      });
  };

  const onItemsRendered = useCallback(
    ({ visibleStopIndex }: { visibleStopIndex: number }) => {
      const threshold = Math.max(0, foodsData.length - 3);
      if (
        visibleStopIndex >= threshold &&
        hasNextPageRef.current &&
        !isFetchingNextPageRef.current
      ) {
        fetchNextPageRef.current();
      }
    },
    [foodsData.length],
  );

  const itemData = { foodsData, selectedLog };

  const FoodRow = useCallback(
    ({
      index,
      style,
      data,
    }: ListChildComponentProps<{
      foodsData: typeof foodsData;
      selectedLog: typeof selectedLog;
    }>) => {
      const rowStyle = style as React.CSSProperties;
      const foods = data?.foodsData ?? [];
      const selected = data?.selectedLog ?? [];

      // 마지막 항목 로딩
      if (index >= foods.length) {
        if (!hasNextPageRef.current) return null;
        return (
          <div
            style={{
              ...rowStyle,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isFetchingNextPageRef.current ? "로딩 중..." : null}
          </div>
        );
      }

      const item = foods[index];
      const isSelected = !!selected.find((log) => log.id === item.id);

      return (
        <div style={rowStyle}>
          <Row className={styles.food_item}>
            <Row justify="between" className={styles.food_item_wrapper}>
              <Row className={styles.food_info_wrapper}>
                <Text className={styles.index}>{index + 1}</Text>

                <Column className={styles.food_data}>
                  <Text className={styles.food_name}>{item.foodName}</Text>

                  <Row className={styles.infos}>
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
                onClick={() => onFoodAction(item.id, item.foodName, !isSelected)}
              >
                <Center className={styles.add_button_wrapper}>
                  <IconButton iconName={isSelected ? "Close" : "AddOutline"} />
                </Center>
              </Button>
            </Row>
          </Row>
        </div>
      );
    },
    [onFoodAction],
  );

  const listHeight =
    typeof window !== "undefined" ? Math.max(200, window.innerHeight - LIST_HEIGHT_OFFSET) : 400;

  return (
    <PageWrapper>
      {/* 검색바 */}
      <Column as="section" className={styles.page_inner_wrapper}>
        {/* 날짜 네비게이터 */}
        <Row justify="between" align="center" className={styles.date_nav}>
          <Button className={`${styles.nav_btn} ${styles.prev}`} onClick={movePrevDay}>
            <Text>이전</Text>
          </Button>
          <Text className={styles.date_label_chip}>{currentDay.format("YYYY년 M월 D일")}</Text>
          <Button className={`${styles.nav_btn} ${styles.next}`} onClick={moveNextDay}>
            <Text>다음</Text>
          </Button>
        </Row>

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
          <FixedSizeList
            ref={listRef}
            height={listHeight}
            itemCount={foodsData.length + (hasNextPage ? 1 : 0)}
            itemSize={FOOD_ITEM_HEIGHT}
            width="100%"
            itemData={itemData}
            onItemsRendered={onItemsRendered}
            overscanCount={2}
          >
            {FoodRow}
          </FixedSizeList>
        </Column>

        <Column className={styles.bottom_action_sheet}>
          <Column className={styles.recommend_view}>
            <Row justify="between" align="center">
              <Row className={styles.meal_selector}>
                <Button
                  className={`${styles.meal_chip} ${
                    mealType === "BREAKFAST" ? styles.meal_chip_active : ""
                  }`}
                  onClick={() => setMealType("BREAKFAST")}
                >
                  <Text>아침</Text>
                </Button>
                <Button
                  className={`${styles.meal_chip} ${
                    mealType === "LUNCH" ? styles.meal_chip_active : ""
                  }`}
                  onClick={() => setMealType("LUNCH")}
                >
                  <Text>점심</Text>
                </Button>
                <Button
                  className={`${styles.meal_chip} ${
                    mealType === "DINNER" ? styles.meal_chip_active : ""
                  }`}
                  onClick={() => setMealType("DINNER")}
                >
                  <Text>저녁</Text>
                </Button>
              </Row>
            </Row>

            <Row justify="between" align="center">
              <Text className={styles.recommend_title}>금일 추천 식단</Text>
            </Row>

            <Row className={styles.recommend_inner_wrapper}>
              {(filteredData?.foods ?? []).map((item, i) => (
                <Center key={item.id}>
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
            <Button
              onClick={onCreateDietsLogs}
              className={styles.ok_button}
              disabled={selectedLog.length === 0 || isCreatingLog}
            >
              {isCreatingLog ? "등록 중..." : `${mealKorByType[mealType]} 식단 기록`}
            </Button>
          </Column>
        </Column>
      </Column>
    </PageWrapper>
  );
}

export default DietLogRegisterPage;
