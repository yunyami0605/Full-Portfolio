import { DietLog, DietRecommendation } from "./base";

/**
 *@description 자신 식단 추천 api 응답
 */
export type GetDietsRecommendationsResponse = DietRecommendation[];

/**
 *@description 자신 식단 기록 api 응답
 */
export type GetDietsLogsApiResponse = DietLog[];

/**
 *@description 기간 내 일자별 영양소 합계 아이템
 */
export type DietMacrosDaily = {
  date: string; // YYYY-MM-DD
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
};

/**
 *@description 기간 내 일자별 영양소 합계 응답
 */
export type GetDietsMacrosDailyResponse = DietMacrosDaily[];
