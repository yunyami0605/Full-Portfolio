import { describe, it, expect, vi, beforeEach } from "vitest";
import MockAdapter from "axios-mock-adapter";

const { setTokenMock } = vi.hoisted(() => {
  return {
    setTokenMock: vi.fn(),
  };
});

vi.mock("@/features/auth/_stores/accessToken.store", () => ({
  useAccessTokenStore: {
    getState: vi.fn(() => ({
      accessToken: "test-token",
      setToken: setTokenMock,
    })),
  },
}));

vi.mock("../cookie", () => ({
  getCookie: vi.fn(() => "fake-xsrf-token"),
}));

import { apiCall } from "../apiCall";

describe("apiCall interceptor", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    // add axios mock adaptor
    mock = new MockAdapter(apiCall, { onNoMatch: "passthrough" });
    vi.clearAllMocks(); // 호출 기록 제거
  });

  it("요청 시 accessToken과 XSRF 쿠키가 헤더에 포함", async () => {
    mock.onGet("/test").reply(200, { success: true });

    const res = await apiCall.get("/test");
    const headers = mock.history.get[0].headers!;

    console.log(res);
    console.log(headers);
    expect(res.data).toEqual({ success: true });
  });
});
