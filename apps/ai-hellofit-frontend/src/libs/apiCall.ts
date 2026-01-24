import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { getCookie } from "./cookie";

const isMockApi = false;
export const apiCall = axios.create({
  baseURL: isMockApi ? "" : process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

apiCall.interceptors.request.use(
  (config) => {
    const xsrf = getCookie("xsrftk");
    if (xsrf) {
      config.headers["X-XSRF-TOKEN"] = xsrf;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

let isRefreshing = false;

// 재발급 동안, 이후 요청 대기 큐 (토큰 전달 불필요)
type PendingRequest = {
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
  request: AxiosRequestConfig & { _retry?: boolean };
};
let pendingRequests: PendingRequest[] = [];

apiCall.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    const data = error.response?.data as { message?: string; code?: string } | undefined;
    const message = data?.message;
    const code = data?.code;

    // 401 처리 및 재발급
    if (error.response?.status === 401 && !originalRequest._retry) {
      const isExpired = message === "토큰이 만료되었습니다." || code === "TOKEN_EXPIRED";
      const isUnauthorizedBootstrap = code === "UNAUTHORIZED" || !message;

      // 1. 재요청 설정
      originalRequest._retry = true;

      // 2. 재발급 요청 동안, 들어오는 다른 요청 담기
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingRequests.push({ resolve, reject, request: originalRequest });
        }) as any;
      }

      // 3. 요청
      isRefreshing = true;
      try {
        // 부팅 시 XSRF가 없을 수 있으므로 초기화
        if (isUnauthorizedBootstrap) {
          await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/xc`,
            {},
            { withCredentials: true },
          );
        }
        const xsrf = getCookie("xsrftk");
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`,
          {},
          {
            withCredentials: true,
            headers: xsrf ? { "X-XSRF-TOKEN": xsrf } : undefined,
          },
        );

        // 쿠키 기반: 서버가  쿠키로 갱신. 응답 바디 토큰은 사용하지 않음.
        // 3-1. 대기 중이던 요청들 실행
        const queued = pendingRequests;
        pendingRequests = [];
        queued.forEach(({ resolve, request }) => resolve(apiCall(request)));

        // 3-2. 기존 실패 요청 재시도 (Authorization 없이)
        return apiCall(originalRequest);
      } catch (refreshError) {
        // refresh 실패 시, 대기 중이던 요청들이 영원히 pending 상태가 되지 않도록 모두 reject
        const queued = pendingRequests;
        pendingRequests = [];
        queued.forEach(({ reject }) => reject(refreshError));
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // 그 외 에러 응답
    return Promise.reject(error);
  },
);
