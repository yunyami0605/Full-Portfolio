import type { AgeGroup, GenderType } from "./body";

export type UserProfileDetail = {
  userId: string;
  ageGroup: AgeGroup;
  gender: GenderType;
  height: number;
  weight: number;
  sleepMinutes?: number | null;
  exerciseMinutes?: number | null;
  forbiddenFoods?: string[];
};

export type NicknameDuplicateResponse = {
  isDuplicate: boolean;
};
