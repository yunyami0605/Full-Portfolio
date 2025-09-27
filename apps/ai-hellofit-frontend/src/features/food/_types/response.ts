import { Cursor } from "@/shared/types/api";
import { FoodItem } from "./base";

export type GetFoodsSearchResponse = Cursor<FoodItem[]>;
