import { z } from "zod";

/**
 *@description user 스키마 스크립트
 */

const _baseSchema = z.object({
  ageGroup: z.enum([
    "AGE_10S",
    "AGE_20S",
    "AGE_30S",
    "AGE_40S",
    "AGE_50S",
    "AGE_60S",
    "AGE_70S",
    "AGE_80S",
    "AGE_90S",
  ]),
  gender: z.enum(["MALE", "FEMALE"]),
  height: z.number().min(1, "키는 1cm 이상이여야합니다.").max(300, "키는 300cm 이하 여야합니다."),
  weight: z
    .number()
    .min(1, "몸무게는 1cm 이상이여합니다.")
    .max(1000, "몸무게는 1000kg 이하여야합니다."),
  sleepMinutes: z
    .number()
    .min(1)
    .max(24 * 60)
    .optional(),
  exerciseMinutes: z
    .number()
    .min(1)
    .max(24 * 60)
    .optional(),
  forbiddenFoods: z.array(z.string()).optional(),
});

// 유저 프로필 스키마
export const userProfileSchema = _baseSchema.pick({
  ageGroup: true,
  gender: true,
  height: true,
  weight: true,
  sleepMinutes: true,
  exerciseMinutes: true,
  forbiddenFoods: true,
});

export type UserProfileSchema = z.infer<typeof userProfileSchema>;
