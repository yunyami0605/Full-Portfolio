import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "../form/LoginForm";
import { authTokenACookies } from "@/libs/cookie";

// 개별 테스트에서 필요한 모듈만 추가 mock
vi.mock("../../_hooks/useLoginAPi", () => ({
  default: () => ({
    mutateAsync: vi.fn().mockResolvedValue({
      accessToken: "a",
      refreshToken: "r",
    }),
    isPending: false,
  }),
}));

vi.mock("@/libs/cookie", () => ({
  authTokenACookies: { setTokens: vi.fn() },
}));

describe("LoginForm", () => {
  it("이메일/비번 입력 후 로그인 버튼 → 토큰 저장 & /main 이동", async () => {
    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText("이메일"), {
      target: { value: "test@test.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("비밀번호"), {
      target: { value: "passwd123" },
    });
    fireEvent.click(screen.getByRole("button", { name: "로그인" }));

    await waitFor(() => {
      expect(authTokenACookies.setTokens).toHaveBeenCalledWith("a", "r");
    });
  });
});
