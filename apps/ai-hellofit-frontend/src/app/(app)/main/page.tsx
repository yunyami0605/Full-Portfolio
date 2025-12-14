"use client";

import styles from "./MainPage.module.scss";
import React, { useEffect, useState } from "react";
import RecommendationInfoCard from "@/features/diet/_components/RecommendationInfoCard";
import { Header, IconButton } from "@/shared/components";
import MainTopView from "@/features/diet/_components/main/view/MainTopView";
import { Column } from "@my/ui";
import WeeklyCalendar from "@/features/diet/_components/main/calendar/WeeklyCalendar";
import dayjs from "dayjs";
import LogRecommendationCard from "@/features/diet/_components/main/view/LogRecommendationCard";
import MonthlyMacrosChart from "@/features/diet/_components/main/view/MonthlyMacrosChart";

function MainPage() {
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));
  const monthStr = dayjs(selectedDate).format("YYYY-MM");

  return (
    <section className={styles.page_layout}>
      <Header
        left={"헬로핏"}
        // right={<IconButton iconName="Alarm" />}
      />

      <MainTopView />

      <Column as="section" className={styles.inner_wrapper}>
        <WeeklyCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

        <LogRecommendationCard title="오늘 기록한 식단" date={selectedDate} />

        <RecommendationInfoCard title="오늘 추천 식단" date={selectedDate} />

        <MonthlyMacrosChart title="월간 섭취 추이" month={monthStr} />

        {/* <Recently7DietView title="최근 일주일 동안 식단" /> */}
      </Column>
    </section>
  );
}

export default MainPage;
