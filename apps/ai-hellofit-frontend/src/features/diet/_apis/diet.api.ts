import { apiCall } from "@/libs/apiCall";
import { GetDietsLogsApiResponse, GetDietsRecommendationsResponse } from "../types/response";
import { GetDietsLogsApiQuery, GetDietsRecommendationsQuery } from "../types/query";
import { PostDietsLogsMeBody } from "../types/body";
import { MutationResponse } from "@/shared/types/api";

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

/**
 *@description 유저 자신 식단 로그 생성 API
 */
export const postDietsLogsMeApi = (body: PostDietsLogsMeBody) => {
  return apiCall<MutationResponse>({
    url: "/diets/logs/me",
    method: "POST",
    data: body,
  });
};
