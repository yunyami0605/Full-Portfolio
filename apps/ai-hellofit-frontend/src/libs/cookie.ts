/**
 *@description 쿠키 관리 util 스크립트
 */

import { authConstant } from "@/features/auth/_constants/auth.constant";

const isProd = process.env.NODE_ENV === "production";

/**
 *@description 쿠키 설정
 */
function setCookie(name: string, value: string, maxAgeSec: number) {
  // 서버 사이드 랜더링 타입에러 체크
  if (typeof document === "undefined") return;

  const attrs = [`path=/`, `max-age=${maxAgeSec}`, `samesite=lax`, isProd ? `secure` : ``].filter(
    (item) => item.length > 0,
  );

  document.cookie = `${name}=${encodeURIComponent(value)}; ${attrs.join("; ")}`;
}

/**
 *@description 쿠키 삭제
 */
function deleteCookie(name: string) {
  if (typeof document === "undefined") return;

  document.cookie = `${name}=; path=/; max-age=0; samesite=lax`;
}

/**
 *@description 쿠키 값 조회
 */
function getCookie(name: string) {
  if (typeof document === "undefined") return;

  const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : null;
}

// 공개 API
export const authTokenACookies = {
  setTokens(accessToken: string, refreshToken: string) {
    setCookie(authConstant.cookie.accessToken, accessToken, 60 * 60); // 1h
    setCookie(authConstant.cookie.refreshToken, refreshToken, 60 * 60 * 24 * 14); // 14d
  },

  clearTokens() {
    deleteCookie(authConstant.cookie.accessToken);
    deleteCookie(authConstant.cookie.refreshToken);
  },

  getAccessToken() {
    return getCookie(authConstant.cookie.accessToken);
  },

  getRefreshToken() {
    return getCookie(authConstant.cookie.refreshToken);
  },
};
