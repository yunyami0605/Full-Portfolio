import { z } from "zod";
import { authConstant } from "../_constants/auth.constant";

/**
 *@description auth 스키마 스크립트
 */

const _baseSchema = z.object({
  email: z.email(authConstant.error.validation.wrongFormatEmail),
  password: z
    .string()
    .min(8, authConstant.error.validation.worngFormatPassword.min)
    .max(20, authConstant.error.validation.worngFormatPassword.max),
  passwordConfirm: z
    .string()
    .min(8, authConstant.error.validation.worngFormatPassword.min)
    .max(20, authConstant.error.validation.worngFormatPassword.max),
  nickname: z
    .string()
    .min(2, authConstant.error.validation.wrongFormatNickname.min)
    .max(12, authConstant.error.validation.wrongFormatNickname.max),
});

// 로그인 스키마
export const loginSchema = _baseSchema.pick({ email: true, password: true });

export type LoginFormSchema = z.infer<typeof loginSchema>;

// 회원가입 스키마
export const signupSchema = _baseSchema
  .pick({
    email: true,
    password: true,
    passwordConfirm: true,
    nickname: true,
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirm) {
      ctx.addIssue({
        code: "custom",
        message: authConstant.error.validation.notMatchPasswordConfirm,
        path: ["passwordConfirm"],
      });
    }
  });

export type SignupFormSchema = z.infer<typeof signupSchema>;
