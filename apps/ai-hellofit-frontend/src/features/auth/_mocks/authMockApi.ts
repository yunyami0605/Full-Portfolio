import { loginSchema } from "@/features/auth";
import { http, HttpResponse } from "msw";
import { z } from "zod";

const LoginBody = loginSchema;

const SignupBody = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  nickname: z.string().min(1),
});

export const authHandlers = [
  // 로그인 API
  http.post("/auth/login", async ({ request }) => {
    const body = await request.json();

    // body 유효성 검증
    const parse = LoginBody.safeParse(body);

    if (!parse.success) {
      return HttpResponse.json(
        { code: "BAD_REQUEST", message: "이메일 또는 비밀번호가 올바르지 않습니다." },
        { status: 400 },
      );
    }

    const { email, password } = parse.data;

    const dummyUserInfo = {
      email: "test1@test.com",
      password: "test1234",
    };

    // 해당 이메일 유저가 없을 때
    if (email !== dummyUserInfo.email) {
      return HttpResponse.json(
        { code: "UNAUTHORIZED", message: "가입되지 않은 이메일입니다." },
        { status: 401 },
      );
    }

    // 비밀번호가 일치하지 않을때
    if (password !== dummyUserInfo.password) {
      return HttpResponse.json(
        { code: "UNAUTHORIZED", message: "비밀번호가 일치하지 않습니다." },
        { status: 401 },
      );
    }

    // 성공 응답 (JWT 흉내)
    return HttpResponse.json(
      {
        accessToken: "mock-ac-123",
        refreshToken: "mock-rf-456",
      },
      { status: 200 },
    );
  }),

  // 회원가입
  http.post("/auth/signup", async ({ request }) => {
    const body = await request.json().catch(() => ({}));
    const parse = SignupBody.safeParse(body);
    if (!parse.success) {
      return HttpResponse.json(
        {
          code: "BAD_REQUEST",
          message: "회원가입 요청 형식이 올바르지 않습니다.",
          issues: parse.error.issues,
        },
        { status: 400 },
      );
    }

    const { email, nickname } = parse.data;

    // 💡 데모: 특정 이메일 중복 처리
    if (email.endsWith("@taken.com")) {
      return HttpResponse.json(
        { code: "CONFLICT", message: "이미 사용 중인 이메일입니다." },
        { status: 409 },
      );
    }

    return HttpResponse.json(
      {
        id: "u_2",
        email,
        nickname,
        createdAt: new Date().toISOString(),
      },
      { status: 201 },
    );
  }),

  http.post("/auth/refresh", async () => {
    const hasRefreshToken = true;

    if (hasRefreshToken) {
      return HttpResponse.json({ accessToken: "mock-new-at-789" }, { status: 200 });
    } else {
      return HttpResponse.json(
        { code: "UNAUTHORIZED", message: "Refresh token invalid" },
        { status: 401 },
      );
    }
  }),
];
