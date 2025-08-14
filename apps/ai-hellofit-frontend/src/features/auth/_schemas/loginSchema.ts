import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("유효한 이메일을 입력해주세요."),
  password: z
    .string()
    .min(8, "비밀번호는 최소 8자 이상입니다.")
    .max(20, "비밀번호는 최대 20자 이하입니다."),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
