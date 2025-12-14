import { MealType, SourceType } from "./base";

/**
 *@description 유저 자신 식단 로그 생성 body
 */
export type PostDietsLogsMeBody = {
  mealType: MealType;
  logDate: string;
  source: SourceType;
  items?: { id: string; foodName?: string }[];
  recommendationId?: string;
};
