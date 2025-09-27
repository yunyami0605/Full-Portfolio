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
