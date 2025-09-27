import { useState } from "react";
import clsx from "clsx";
import styles from "./WeeklyCalendar.module.scss";
import { Card } from "@/shared/components";
import { Column, Row } from "@my/ui";
import { SetState } from "@/shared/types/base";
import dayjs from "dayjs";

type Props = {
  selectedDate: string;
  setSelectedDate: SetState<string>;
};

/**
 *@description 메인 페이지 > 일주일 날짜 달력 컴포넌트
 */
export default function WeeklyCalendar({ setSelectedDate, selectedDate }: Props) {
  // 오늘 날짜 기준 -3일 ~ +3일
  const today = dayjs();
  const dates = Array.from({ length: 7 }, (_, i) => today.add(i - 3, "day"));

  return (
    <Card>
      <Column className={styles.calendar}>
        {/* 요일 */}
        <Row className={styles.days}>
          {dates.map((date) => (
            <div
              key={date.format("YYYY-MM-DD")}
              className={clsx(styles.day, {
                [styles.today]: date.isSame(today, "day"),
              })}
            >
              {date.isSame(today, "day") ? "오늘" : date.format("dd")}
            </div>
          ))}
        </Row>

        {/* 날짜 */}
        <Row className={styles.dates}>
          {dates.map((date) => (
            <div
              key={date.format("YYYY-MM-DD")}
              className={clsx(styles.date, {
                [styles.active]: selectedDate === date.format("YYYY-MM-DD"),
              })}
              onClick={() => {
                const selectedDay = date.format("YYYY-MM-DD");
                setSelectedDate(selectedDay);
              }}
            >
              {date.date()}
            </div>
          ))}
        </Row>
      </Column>
    </Card>
  );
}
