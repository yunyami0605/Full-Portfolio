export type AgeGroup =
  | "AGE_10S"
  | "AGE_20S"
  | "AGE_30S"
  | "AGE_40S"
  | "AGE_50S"
  | "AGE_60S"
  | "AGE_70S"
  | "AGE_80S"
  | "AGE_90S";

export type GenderType = "MALE" | "FEMALE";

export type PostUserProfileBody = {
  ageGroup: AgeGroup;
  gender: GenderType;
  height: number;
  weight: number;
  sleepMinutes?: number;
  exerciseMinutes?: number;
  forbiddenFoods?: string[];
};
