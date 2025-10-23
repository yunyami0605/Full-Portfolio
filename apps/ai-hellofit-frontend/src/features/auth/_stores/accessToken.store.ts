import { create } from "zustand";
import { devtools } from "zustand/middleware";

type InitState = {
  accessToken: string | null;
  userId: string | null;
};

type AccessTokenState = {
  setToken: (payload: string | null) => void;
  reset: () => void;
} & InitState;

const initialState: InitState = {
  accessToken: null,
  userId: null,
};

/** JWT 디코더 */
function decodeJwt(token: string | null) {
  if (!token) return null;
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );
    return JSON.parse(jsonPayload);
  } catch (err) {
    console.error("❌ JWT decode 실패:", err);
    return null;
  }
}

/**
 * @description 유저 AccessToken + ID 관리 전역 store
 */
export const useAccessTokenStore = create<AccessTokenState>()(
  devtools((set) => ({
    ...initialState,

    setToken: (payload) =>
      set(() => {
        const decoded = decodeJwt(payload);
        const id = decoded?.sub || decoded?.id || null; // 토큰 구조에 따라 키 선택
        return {
          accessToken: payload,
          userId: id,
        };
      }),

    reset: () => set(() => ({ ...initialState })),
  })),
);
