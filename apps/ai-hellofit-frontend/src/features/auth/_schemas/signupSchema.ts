import z from "zod";
import { loginSchema } from "./loginSchema";

export const signupSchema = loginSchema.extend({
  email: z.email("유효한 이메일을 입력해주세요."),
  password: z.string().min(8),
});
