import { apiCall } from "@/libs/apiCall";
import { useAccessTokenStore } from "../_stores/accessToken.store";
import { server } from "@/mocks/server";
import { http, HttpResponse } from "msw";

const url = "http://localhost:8084/api";

describe("refresh token api", () => {
  beforeEach(() => {
    useAccessTokenStore.getState().setToken("expired-token");
  });

  it("401 -> refresh 호출 -> 새로운 AT로 재요청", async () => {
    // given
    server.use(
      // 1. 첫 요청 → 401 Unauthorized
      http.get(`${url}/posts`, () =>
        HttpResponse.json({ message: "Unauthorized" }, { status: 401 }),
      ),
      // 2. refresh 요청 → 새 AT 발급
      http.post(`${url}/auth/refresh`, () =>
        HttpResponse.json({ access: "mock-new-at-789" }, { status: 200 }),
      ),
      // 3. 두 번째 posts 요청 → 정상 응답
      http.get(`${url}/posts`, () =>
        HttpResponse.json([{ id: 1, title: "hello" }], { status: 200 }),
      ),
    );

    // when
    const res = await apiCall.get("/posts", { baseURL: url });

    // then
    expect(res.data[0].title).toBe("hello");
    expect(useAccessTokenStore.getState().accessToken).toBe("mock-new-at-789");
  });
});
