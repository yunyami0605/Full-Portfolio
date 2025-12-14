/**
 *@description 음식 데이터
 */
export type FoodItem = {
  id: string;
  foodName: string;
  repFoodName: string;
  category: string | null;
  kcal: number | null;
  protein: number | null;
  carbs: number | null;
  fat: number | null;
  dataDate: string;
};
