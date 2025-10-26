import { describe, it, expect, vi, beforeEach } from "vitest";
import { setCookie, getCookie, deleteCookie } from "../cookie";

describe("cookie util", () => {
  beforeEach(() => {
    // 매 테스트마다 document.cookie 초기화
    Object.defineProperty(document, "cookie", {
      writable: true,
      value: "",
    });
  });

  it("setCookie() - 쿠키 설정 ok", () => {
    setCookie("token", "abc123", 3600);
    expect(document.cookie).toContain("token=abc123");
    expect(document.cookie).toContain("max-age=3600");
    expect(document.cookie).toContain("path=/");
  });

  it("getCookie() - 쿠키 조회 ok", () => {
    document.cookie = "token=encoded%20value; path=/";
    const value = getCookie("token");
    expect(value).toBe("encoded value");
  });

  it("deleteCookie() - 쿠키 삭제 ok", () => {
    document.cookie = "token=abc123; path=/";
    deleteCookie("token");
    expect(document.cookie).toContain("token=");
    expect(document.cookie).toContain("max-age=0");
  });

  it("SSR 환경에서 document가 undefined일 경우 아무 일도 하지 않는다", () => {
    const originalDoc = global.document;
    // @ts-ignore
    delete (global as any).document;

    expect(() => setCookie("test", "value", 1000)).not.toThrow();
    expect(() => getCookie("test")).not.toThrow();
    expect(() => deleteCookie("test")).not.toThrow();

    global.document = originalDoc;
  });

  it("setCookie() - value에 특수문자가 포함될 경우 encodeURIComponent로 인코딩된다", () => {
    setCookie("nickname", "홍 길동", 3600);
    // "홍 길동" -> "%ED%99%8D%20%EA%B8%B8%EB%8F%99"
    expect(document.cookie).toContain("%ED%99%8D%20%EA%B8%B8%EB%8F%99");
  });

  it("setCookie() - production 환경일 때, secure 속성 포함 ok", () => {
    vi.stubEnv("NODE_ENV", "production");

    setCookie("token", "secure123", 3600);
    expect(document.cookie).toContain("secure");

    vi.unstubAllEnvs();
  });

  it("getCookie() - 존재하지 않는 쿠키 이름이면 null 반환 ok", () => {
    document.cookie = "token=abc123; path=/";
    const value = getCookie("noexistent");
    expect(value).toBeNull();
  });
});
