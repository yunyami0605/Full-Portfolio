/**
 *@description 자신 식단 추천 api 쿼리 (null 이면, 전체 조회)
 */
export type GetDietsRecommendationsQuery = {
  date: string | null;
};

/**
 *@description 자신 식단 기록 기간별 조회 api 쿼리 (null 이면, 전체 조회)
 */
export type GetDietsLogsApiQuery = {
  startDate: string;
  endDate: string;
};

/**
 *@description 기간 내 일자별 영양소 합계 조회 쿼리
 * - month(YYYY-MM) 가 있으면 우선 사용
 * - 없으면 startDate/endDate(YYYY-MM-DD) 사용
 */
export type GetDietsMacrosDailyQuery = {
  month?: string | null;
  startDate?: string | null;
  endDate?: string | null;
};
