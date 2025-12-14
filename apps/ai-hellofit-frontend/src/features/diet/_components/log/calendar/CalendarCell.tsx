"use client";

import React from "react";
import dayjs, { Dayjs } from "dayjs";
import clsx from "clsx";
import { Button, Column, Row, Text } from "@my/ui";
import styles from "./CalendarCell.module.scss";

export type CalendarCellProps = {
  date: Dayjs;
  inCurrentMonth: boolean;
  onSelect: (d: Dayjs) => void;
  breakfast?: boolean;
  lunch?: boolean;
  dinner?: boolean;
};

export function CalendarCell({
  date,
  inCurrentMonth,
  onSelect,
  breakfast,
  lunch,
  dinner,
}: CalendarCellProps) {
  const isToday = date.isSame(dayjs(), "day");
  const isWeekend = [0, 6].includes(date.day());
  return (
    <Button
      className={clsx(
        styles.cell,
        isToday && styles.today,
        !inCurrentMonth && styles.disabled,
        isWeekend && styles.weekend,
      )}
      onClick={() => inCurrentMonth && onSelect(date)}
      aria-label={date.format("YYYY-MM-DD")}
    >
      <Row justify="end" className={styles.cellHeader}>
        <Text
          as="span"
          className={clsx(styles.cellDateBadge, isToday && styles.cellDateBadgeToday)}
        >
          {date.date()}
        </Text>
      </Row>
      <div className={styles.cellBody}>
        <Column className={styles.mealMarks} align="center">
          {breakfast && (
            <Text as="span" className={clsx(styles.mealBadge, styles.badgeBreakfast)}>
              아
            </Text>
          )}
          {lunch && (
            <Text as="span" className={clsx(styles.mealBadge, styles.badgeLunch)}>
              점
            </Text>
          )}
          {dinner && (
            <Text as="span" className={clsx(styles.mealBadge, styles.badgeDinner)}>
              저
            </Text>
          )}
        </Column>
      </div>
    </Button>
  );
}
