"use client";

import React, { useMemo, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import { ActionSheet, Button, Column, Row, Text } from "@my/ui";
import styles from "./DietLogCalendarPage.module.scss";
import { CalendarCell } from "@/features/diet/_components/log/calendar/CalendarCell";
import { useGetDietsLogsApi } from "@/features/diet/_hooks/query";
import { MealType } from "@/features/diet/types/base";
import { Tab } from "@/shared/components";

export default function DietLogCalendarPage() {
  const router = useRouter();
  // 현재 표시 중인 월 (dayjs 객체로 보관)
  const [month, setMonth] = useState<Dayjs>(() => dayjs());
  // 선택된 날짜 및 시트 오픈 상태
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<MealType>("BREAKFAST");

  // API용 월 범위 (YYYY-MM-DD)
  const monthStart = month.startOf("month").format("YYYY-MM-DD");
  const monthEnd = month.endOf("month").format("YYYY-MM-DD");

  // 월 범위 내 식단 로그 조회
  const { data: logsResp } = useGetDietsLogsApi({ startDate: monthStart, endDate: monthEnd });
  const logs = logsResp?.data ?? [];

  /**
   * 날짜별로 어떤 끼니(BREAKFAST/LUNCH/DINNER)가 기록되어 있는지 집계
   * Map<"YYYY-MM-DD", Set<MealType>>
   */
  const mealsByDate = useMemo(() => {
    const map = new Map<string, Set<MealType>>();
    for (const log of logs) {
      const dateKey = log.logDate;
      const set = map.get(dateKey) ?? new Set<MealType>();
      set.add(log.mealType as MealType);
      map.set(dateKey, set);
    }
    return map;
  }, [logs]);

  /**
   * 6x7(최대 6주) 캘린더 셀 그리드 생성
   * - 이전/다음 달 일부 날짜 포함하여 42칸 채움
   */
  const grid = useMemo(() => {
    const startOfMonth = month.startOf("month");
    const endOfMonth = month.endOf("month");
    const startOffset = startOfMonth.day(); // 0(Sun)~6(Sat)
    const totalDays = endOfMonth.date();

    // Build 6x7 = 42 cells
    const cells: { date: Dayjs; inCurrentMonth: boolean }[] = [];

    // Previous month's tail
    for (let i = startOffset - 1; i >= 0; i--) {
      cells.push({ date: startOfMonth.subtract(i + 1, "day"), inCurrentMonth: false });
    }
    // Current month
    for (let d = 1; d <= totalDays; d++) {
      cells.push({ date: startOfMonth.date(d), inCurrentMonth: true });
    }
    // Next month's head to fill 42
    while (cells.length < 42) {
      const last = cells[cells.length - 1].date;
      cells.push({ date: last.add(1, "day"), inCurrentMonth: false });
    }
    return cells;
  }, [month]);

  // 월 이동
  const goPrev = () => setMonth((m) => m.subtract(1, "month"));
  const goNext = () => setMonth((m) => m.add(1, "month"));

  /**
   * 날짜 선택 → 하단 시트로 선택 날짜의 기록 노출
   */
  const handleSelectDate = (d: Dayjs) => {
    const dateStr = d.format("YYYY-MM-DD");
    setSelectedDate(dateStr);
    setSelectedMeal("BREAKFAST");
    setIsSheetOpen(true);
  };

  // 요일 헤더
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

  // 액션시트 옵션 구성: 선택 날짜의 아침/점심/저녁 기록 요약
  const mealKor: Record<MealType, string> = {
    BREAKFAST: "아침",
    LUNCH: "점심",
    DINNER: "저녁",
  };
  const mealTabIndex: Record<MealType, number> = {
    BREAKFAST: 0,
    LUNCH: 1,
    DINNER: 2,
  };
  const selectedDateLogs = useMemo(() => {
    if (!selectedDate) return [];
    return logs.filter((l) => l.logDate === selectedDate);
  }, [logs, selectedDate]);

  const getMealFoodsSummary = (meal: MealType) => {
    const log = selectedDateLogs.find((l) => l.mealType === meal);
    if (!log) return null;
    const names = (log.foods ?? []).map((f) => f.foodName);
    const summary =
      names.length <= 2
        ? names.join(", ")
        : `${names.slice(0, 2).join(", ")} 외 ${names.length - 2}개`;
    return summary || "항목 없음";
  };

  // 시트 헤더(아침/점심/저녁 탭)
  const sheetHeader = (
    <Row className={styles.sheet_header}>
      <section className={styles.tabs_wrapper}>
        <Tab
          name={"아침"}
          isChecked={selectedMeal === "BREAKFAST"}
          onClick={() => setSelectedMeal("BREAKFAST")}
        />
        <Tab
          name={"점심"}
          isChecked={selectedMeal === "LUNCH"}
          onClick={() => setSelectedMeal("LUNCH")}
        />
        <Tab
          name={"저녁"}
          isChecked={selectedMeal === "DINNER"}
          onClick={() => setSelectedMeal("DINNER")}
        />
      </section>

      <Text>{selectedDate}</Text>
    </Row>
  );

  const selectedMealLog = useMemo(
    () => selectedDateLogs.find((l) => l.mealType === selectedMeal),
    [selectedDateLogs, selectedMeal],
  );
  const selectedTotals = useMemo(() => {
    if (!selectedMealLog) return null;
    return (selectedMealLog.foods ?? []).reduce(
      (acc, f) => {
        acc.calories += f.calories ?? 0;
        acc.carbs += f.carbs ?? 0;
        acc.protein += f.protein ?? 0;
        acc.fat += f.fat ?? 0;
        return acc;
      },
      { calories: 0, carbs: 0, protein: 0, fat: 0 },
    );
  }, [selectedMealLog]);

  return (
    <section className={styles.container}>
      <ActionSheet isOpen={isSheetOpen} header={sheetHeader} onClose={() => setIsSheetOpen(false)}>
        {selectedMealLog ? (
          <Column className={styles.record_list}>
            {(selectedMealLog.foods ?? []).map((f, i) => (
              <Row key={i} className={styles.record_row}>
                <Text>{f.foodName}</Text>

                <Column className={styles.record_meta}>
                  <Text>{f.calories}kcal</Text>

                  <Row className={styles.nutrition_row}>
                    <Text>탄: {f.carbs}g</Text>
                    <Text>단: {f.protein}g</Text>
                    <Text>지: {f.fat}g</Text>
                  </Row>
                </Column>
              </Row>
            ))}

            {selectedTotals && (
              <Row className={styles.totals_row}>
                <Text as="strong">합계</Text>
                <Row className={styles.totals_values}>
                  <Text>{selectedTotals.calories}kcal</Text>
                  <Text>탄: {selectedTotals.carbs}g</Text>
                  <Text>단: {selectedTotals.protein}g</Text>
                  <Text>지: {selectedTotals.fat}g</Text>
                </Row>
              </Row>
            )}
          </Column>
        ) : (
          <Column className={styles.empty_state}>
            <Text>{mealKor[selectedMeal]} 기록이 없습니다.</Text>

            <Button
              onClick={() => {
                if (!selectedDate) return;
                router.push(
                  `/diet/log/register?date=${selectedDate}&tab=${mealTabIndex[selectedMeal]}`,
                );
              }}
            >
              {"기록하러가기 >"}
            </Button>
          </Column>
        )}
      </ActionSheet>
      {/* 헤더: 월 이동 및 현재 월 표시 */}
      <Row justify="between" className={styles.header_row}>
        <Button onClick={goPrev}>이전</Button>
        <Text as="h2" className={styles.month_text}>
          {month.format("YYYY년 MM월")}
        </Text>
        <Button onClick={goNext}>다음</Button>
      </Row>

      {/* 요일 헤더 */}
      <div className={styles.weekdays}>
        {weekdays.map((w) => (
          <Text key={w} className={styles.weekday}>
            {w}
          </Text>
        ))}
      </div>

      {/* 캘린더 그리드 */}
      <div className={styles.grid}>
        {grid.map((cell, idx) => (
          <CalendarCell
            key={cell.date.toString() + idx}
            date={cell.date}
            inCurrentMonth={cell.inCurrentMonth}
            onSelect={handleSelectDate}
            breakfast={mealsByDate.get(cell.date.format("YYYY-MM-DD"))?.has("BREAKFAST")}
            lunch={mealsByDate.get(cell.date.format("YYYY-MM-DD"))?.has("LUNCH")}
            dinner={mealsByDate.get(cell.date.format("YYYY-MM-DD"))?.has("DINNER")}
          />
        ))}
      </div>
    </section>
  );
}
