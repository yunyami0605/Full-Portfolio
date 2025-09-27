import { serverStateConstants } from "@/shared/constants/serverStateConstants";
import { useQuery } from "@tanstack/react-query";
import { getDietsLogsApi, getDietsRecommendationsApi } from "../_apis/diet.api";
import { GetDietsLogsApiQuery, GetDietsRecommendationsQuery } from "../types/query";

/**
 *@description 자신 식단 추천 조회 훅
 */
export const useGetDietsRecommendationsApi = (query: GetDietsRecommendationsQuery) => {
  return useQuery({
    queryKey: [serverStateConstants.diet.recommendations, query],
    queryFn: () => getDietsRecommendationsApi(query),
  });
};

/**
 *@description 자신 식단 추천 조회 훅
 */
export const useGetDietsLogsApi = (query: GetDietsLogsApiQuery) => {
  return useQuery({
    queryKey: [serverStateConstants.diet.logs.getDietsLogs, query],
    queryFn: () => getDietsLogsApi(query),
  });
};
