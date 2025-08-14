"use client";

import styles from "./MainPage.module.scss";
import React from "react";
import RecommendationInfoCard from "@/features/recommendation/_components/RecommendationInfoCard";
import { FaRegBell } from "react-icons/fa";
import { Header, IconButton } from "@/shared/components";

function MainPage() {
  return (
    <section className={styles.page_layout}>
      <Header left={"헬로핏"} right={<IconButton icon={FaRegBell} />} />

      <section className={styles.inner_wrapper}>
        <RecommendationInfoCard title="오늘의 추천 식단 변경하기" />

        <div className={styles.ads_wrapper}>광고</div>

        <RecommendationInfoCard title="오늘의 추천 운동 변경하기" />
      </section>
    </section>
  );
}

export default MainPage;
