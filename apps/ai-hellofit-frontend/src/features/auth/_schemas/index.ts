import { z } from "zod";
import { authConstant } from "../_constants";

/**
 *@description auth 스키마 스크립트
 */

const _baseSchema = z.object({
  email: z.email(authConstant.error.validation.wrongFormatEmail),
  password: z
    .string()
    .min(8, authConstant.error.validation.worngFormatPassword.min)
    .max(20, authConstant.error.validation.worngFormatPassword.max),
  nickname: z
    .string()
    .min(2, authConstant.error.validation.wrongFormatNickname.min)
    .max(12, authConstant.error.validation.wrongFormatNickname.max).trim,
  isPrivacyAgree: z.boolean(),
});

// 로그인 스키마
export const loginSchema = _baseSchema.pick({ email: true, password: true });

export type LoginFormSchema = z.infer<typeof loginSchema>;

// 회원가입 스키마
export const signupSchema = _baseSchema.pick({
  email: true,
  password: true,
  nickname: true,
  isPrivacyAgree: true,
});

export type SignupFormSchema = z.infer<typeof signupSchema>;
