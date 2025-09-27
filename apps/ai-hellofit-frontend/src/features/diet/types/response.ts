import { DietLog, DietRecommendation } from "./base";

/**
 *@description 자신 식단 추천 api 응답
 */
export type GetDietsRecommendationsResponse = DietRecommendation[];

/**
 *@description 자신 식단 기록 api 응답
 */
export type GetDietsLogsApiResponse = DietLog[];
