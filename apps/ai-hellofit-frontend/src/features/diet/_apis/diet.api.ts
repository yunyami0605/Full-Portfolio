import { apiCall } from "@/libs/apiCall";
import {
  GetDietsLogsApiResponse,
  GetDietsRecommendationsResponse,
  GetDietsMacrosDailyResponse,
} from "../types/response";
import {
  GetDietsLogsApiQuery,
  GetDietsRecommendationsQuery,
  GetDietsMacrosDailyQuery,
} from "../types/query";
import { PostDietsLogsMeBody } from "../types/body";
import { MutationResponse } from "@/shared/types/api";

/**
 *@description 회원가입/프로필 저장 직후 오늘~2일치 추천 생성 트리거
 */
export const postDietsRecommendationsGenerateDailyApi = () => {
  return apiCall<void>({
    url: `/diets/recommendations/generate/daily`,
    method: "POST",
  });
};

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
 *@description 기간 내 일자별 영양소 합계 조회
 */
export const getDietsMacrosDailyApi = (query: GetDietsMacrosDailyQuery) => {
  return apiCall<GetDietsMacrosDailyResponse>({
    url: `/diets/logs/me/macros/daily`,
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
