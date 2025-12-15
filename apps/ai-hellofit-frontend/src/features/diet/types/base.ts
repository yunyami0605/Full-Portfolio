/**
 *@description 식단 추천 항목
 */
export type DietRecommendation = {
  id: string;
  userId: string;
  mealType: MealType;
  recommendedDate: string;
  source: SourceType;
  foods: RecommdedFoodItem[];
};

/**
 *@description 식단 기록 항목
 */
export type DietLog = {
  id: string;
  userId: string;
  mealType: MealType;
  logDate: string;
  source: SourceType;
  recommendationId: string | null;
  foods: RecommdedFoodItem[];
};

/**
 *@description 식단 유형 (아침, 점심, 저녁)
 */
export type MealType = "BREAKFAST" | "LUNCH" | "DINNER";

/**
 *@description 식단 출처
 */
export type SourceType = "AI" | "USER";

/**
 *@description 추천된 음식 항목
 */
export type RecommdedFoodItem = {
  id: string;
  foodName: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
};
