// LoginForm.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "../form/LoginForm";
import { authTokenACookies } from "@/libs/cookie";

const { mutateAsyncMock, isPendingBox, setTokensMock, pushMock } = vi.hoisted(() => {
  return {
    mutateAsyncMock: vi.fn(),
    isPendingBox: { value: false },
    setTokensMock: vi.fn(),
    pushMock: vi.fn(),
  };
});

// 모듈 목킹들 (임포트 전에 평가됨)
vi.mock("../../_hooks/useLoginAPi", () => ({
  default: () => ({
    mutateAsync: mutateAsyncMock,
    isPending: isPendingBox.value,
  }),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
    replace: vi.fn(),
    refresh: vi.fn(),
  }),
}));

vi.mock("@/libs/cookie", () => ({
  authTokenACookies: { setTokens: setTokensMock },
}));

beforeEach(() => {
  vi.clearAllMocks();
  isPendingBox.value = false;
});

describe("LoginForm", () => {
  it("성공: 토큰 저장 + /main 이동", async () => {
    mutateAsyncMock.mockResolvedValue({ accessToken: "a", refreshToken: "r" });

    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText("이메일"), { target: { value: "test@test.com" } });
    fireEvent.change(screen.getByPlaceholderText("비밀번호"), { target: { value: "passwd123" } });
    fireEvent.click(screen.getByRole("button", { name: "로그인" }));

    await waitFor(() => {
      expect(mutateAsyncMock).toHaveBeenCalledWith({
        email: "test@test.com",
        password: "passwd123",
      });
      expect(setTokensMock).toHaveBeenCalledWith("a", "r");
      expect(pushMock).toHaveBeenCalledWith("/main");
    });
  });

  it("실패: 비밀번호 8자 미만시 에러 문구", async () => {
    render(<LoginForm />);
    fireEvent.change(screen.getByPlaceholderText("이메일"), { target: { value: "test@test.com" } });
    fireEvent.change(screen.getByPlaceholderText("비밀번호"), { target: { value: "wrong" } });
    fireEvent.click(screen.getByRole("button", { name: "로그인" }));

    expect(await screen.findByText("비밀번호는 최소 8자 이상입니다.")).toBeInTheDocument();
    expect(setTokensMock).not.toHaveBeenCalled();
    expect(pushMock).not.toHaveBeenCalled();
  });

  it("실패: 이메일 유효한 형식 미충족 에러 문구", async () => {
    render(<LoginForm />);
    fireEvent.change(screen.getByPlaceholderText("이메일"), { target: { value: "test@" } });
    fireEvent.change(screen.getByPlaceholderText("비밀번호"), { target: { value: "wrong1234" } });
    fireEvent.click(screen.getByRole("button", { name: "로그인" }));

    expect(await screen.findByText("유효한 이메일을 입력해주세요.")).toBeInTheDocument();
    expect(setTokensMock).not.toHaveBeenCalled();
    expect(pushMock).not.toHaveBeenCalled();
  });

  it("실패: 폼 서버 에러 문구", async () => {
    mutateAsyncMock.mockRejectedValue({ response: { data: { message: "로그인 실패" } } });

    render(<LoginForm />);
    fireEvent.change(screen.getByPlaceholderText("이메일"), { target: { value: "test@test.com" } });
    fireEvent.change(screen.getByPlaceholderText("비밀번호"), { target: { value: "test1234" } });
    fireEvent.click(screen.getByRole("button", { name: "로그인" }));

    const els = await screen.findAllByText("로그인 실패");
    expect(els).toHaveLength(2);
    expect(setTokensMock).not.toHaveBeenCalled();
    expect(pushMock).not.toHaveBeenCalled();
  });

  it("로딩 중이면 제출 무시", async () => {
    isPendingBox.value = true;

    render(<LoginForm />);
    fireEvent.change(screen.getByPlaceholderText("이메일"), { target: { value: "test@test.com" } });
    fireEvent.change(screen.getByPlaceholderText("비밀번호"), { target: { value: "passwd123" } });
    fireEvent.click(screen.getByRole("button", { name: "로그인" }));

    await waitFor(() => {
      expect(mutateAsyncMock).not.toHaveBeenCalled();
      expect(setTokensMock).not.toHaveBeenCalled();
      expect(pushMock).not.toHaveBeenCalled();
    });
  });

  it('보조 액션: "회원가입" 클릭 시 /signup 이동', () => {
    render(<LoginForm />);
    fireEvent.click(screen.getByText("회원가입"));
    expect(pushMock).toHaveBeenCalledWith("/signup");
  });
});
