import { serverStateConstants } from "@/shared/constants/serverStateConstants";
import { useQuery, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import {
  getDietsLogsApi,
  getDietsRecommendationsApi,
  getDietsMacrosDailyApi,
} from "../_apis/diet.api";
import {
  GetDietsLogsApiQuery,
  GetDietsRecommendationsQuery,
  GetDietsMacrosDailyQuery,
} from "../types/query";
import dayjs from "dayjs";
import React from "react";

/**
 *@description 자신 식단 추천 조회 훅
 */
export const useGetDietsRecommendationsApi = (query: GetDietsRecommendationsQuery) => {
  const qc = useQueryClient();
  // 갱신 시간 기준으로 남은 시간 측정해서 stale로 변경
  const dateKey = query?.date ?? dayjs().format("YYYY-MM-DD");
  const now = dayjs();
  const isToday = dayjs(dateKey).isSame(now, "day");
  const cutoff = dayjs(dateKey).hour(23).minute(0).second(0).millisecond(0);
  const msUntilCutoff = isToday ? Math.max(0, cutoff.diff(now, "millisecond")) : 0;
  const staleTime = isToday ? Math.min(30 * 60 * 1000, msUntilCutoff) : 30 * 60 * 1000;

  React.useEffect(() => {
    if (!isToday || msUntilCutoff <= 0) return;
    const timer = setTimeout(() => {
      qc.invalidateQueries({ queryKey: [serverStateConstants.diet.recommendations, dateKey] });
    }, msUntilCutoff + 50); // 안전 여유
    return () => clearTimeout(timer);
  }, [isToday, msUntilCutoff, qc, dateKey]);

  return useQuery({
    queryKey: [serverStateConstants.diet.recommendations, dateKey],
    queryFn: () => getDietsRecommendationsApi(query),
    staleTime,
    gcTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

/**
 *@description 자신 식단 기록 조회 훅
 */
export const useGetDietsLogsApi = (query: GetDietsLogsApiQuery) => {
  return useQuery({
    queryKey: [serverStateConstants.diet.logs.getDietsLogs, query],
    queryFn: () => getDietsLogsApi(query),
    staleTime: 60 * 1000,
    gcTime: 30 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
};

/**
 *@description 기간 내 일자별 영양소 합계 조회 훅
 */
export const useGetDietsMacrosDailyApi = (query: GetDietsMacrosDailyQuery) => {
  return useQuery({
    queryKey: [serverStateConstants.diet.logs.getDietsMacrosDaily, query],
    queryFn: () => getDietsMacrosDailyApi(query),
    staleTime: 15 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
