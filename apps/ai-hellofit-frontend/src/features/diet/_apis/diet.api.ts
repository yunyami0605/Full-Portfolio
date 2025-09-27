import { apiCall } from "@/libs/apiCall";
import { GetDietsLogsApiResponse, GetDietsRecommendationsResponse } from "../types/response";
import { GetDietsLogsApiQuery, GetDietsRecommendationsQuery } from "../types/query";

/**
 *@description 자신 식단 추천 조회
 */
export const getDietsRecommendationsApi = (query: GetDietsRecommendationsQuery) => {
  return apiCall<GetDietsRecommendationsResponse>({
    url: `/diets/recommendations`,
    method: "GET",
    params: query,
  });
};

/**
 *@description 자신 식단 기간별 기록 조회
 */
export const getDietsLogsApi = (query: GetDietsLogsApiQuery) => {
  return apiCall<GetDietsLogsApiResponse>({
    url: `/diets/logs/me/range`,
    method: "GET",
    params: query,
  });
};
