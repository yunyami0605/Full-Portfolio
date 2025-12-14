"use client";

import React, { useMemo, useState } from "react";
import dayjs from "dayjs";
import { Card } from "@/shared/components";
import { Column, Row, Text } from "@my/ui";
import { useGetDietsMacrosDailyApi } from "@/features/diet/_hooks/query";
import { Tab } from "@/shared/components";
import styles from "./MonthlyMacrosChart.module.scss";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type Props = {
  month?: string; // YYYY-MM, default: current month
  title?: string;
};

export default function MonthlyMacrosChart({ month, title = "이번 달 섭취 추이" }: Props) {
  const monthStr = month ?? dayjs().format("YYYY-MM");
  const { data: resp } = useGetDietsMacrosDailyApi({ month: monthStr });
  const items = resp?.data ?? [];
  const [metric, setMetric] = useState<"calories" | "carbs" | "protein" | "fat">("calories");

  const chartData = useMemo(
    () =>
      items.map((it) => ({
        day: dayjs(it.date).format("D"),
        calories: it.calories,
        carbs: Number(it.carbs?.toFixed?.(1) ?? it.carbs),
        protein: Number(it.protein?.toFixed?.(1) ?? it.protein),
        fat: Number(it.fat?.toFixed?.(1) ?? it.fat),
      })),
    [items],
  );

  const metricConfig: Record<
    "calories" | "carbs" | "protein" | "fat",
    { label: string; color: string; unit: string }
  > = {
    calories: { label: "칼로리", color: "#ef4444", unit: "kcal" },
    carbs: { label: "탄", color: "#f59e0b", unit: "g" },
    protein: { label: "단", color: "#10b981", unit: "g" },
    fat: { label: "지", color: "#3b82f6", unit: "g" },
  };

  return (
    <Card>
      <Column className={styles.chart_container}>
        <Row justify="between" align="center" className={styles.chart_header}>
          <Text as="h3">{title}</Text>
          <Text>{monthStr}</Text>
        </Row>

        <Row className={styles.tabs_wrapper}>
          <Tab
            name={"칼로리"}
            isChecked={metric === "calories"}
            onClick={() => setMetric("calories")}
          />
          <Tab name={"탄"} isChecked={metric === "carbs"} onClick={() => setMetric("carbs")} />
          <Tab name={"단"} isChecked={metric === "protein"} onClick={() => setMetric("protein")} />
          <Tab name={"지"} isChecked={metric === "fat"} onClick={() => setMetric("fat")} />
        </Row>

        <div className={styles.chart_box}>
          <ResponsiveContainer>
            <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey={metric}
                name={`${metricConfig[metric].label}(${metricConfig[metric].unit})`}
                stroke={metricConfig[metric].color}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Column>
    </Card>
  );
}
