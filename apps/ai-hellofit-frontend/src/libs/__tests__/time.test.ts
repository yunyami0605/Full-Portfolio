import { describe, it, expect, vi, beforeAll, afterAll } from "vitest";
import dayjs from "dayjs";
import { getRelativeTime } from "../time";

describe("getRelativeTime", () => {
  beforeAll(() => {
    // 현재 시간 고정
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-10-24T12:00:00"));
  });

  afterAll(() => {
    vi.useRealTimers(); // 테스트 후 실제 시간 복원
  });

  it("유효하지 않은 날짜를 입력하면 빈 문자열을 반환", () => {
    expect(getRelativeTime("invalid-date")).toBe("");
  });

  it("1분 미만이면 '방금 전'을 반환", () => {
    const date = dayjs().subtract(30, "second").toISOString();
    expect(getRelativeTime(date)).toBe("방금 전");
  });

  it("1분 이상 1시간 미만이면 분 단위로 반환", () => {
    const date = dayjs().subtract(10, "minute").toISOString();
    expect(getRelativeTime(date)).toBe("10분 전");
  });

  it("1시간 이상 24시간 미만이면 시간 단위로 반환", () => {
    const date = dayjs().subtract(3, "hour").toISOString();
    expect(getRelativeTime(date)).toBe("3시간 전");
  });

  it("1일 이상 7일 미만이면 일 단위로 반환", () => {
    const date = dayjs().subtract(5, "day").toISOString();
    expect(getRelativeTime(date)).toBe("5일 전");
  });

  it("7일 이상 차이나면 YYYY.MM.DD 형식으로 반환", () => {
    const date = dayjs().subtract(10, "day").toISOString();
    expect(getRelativeTime(date)).toBe(dayjs(date).format("YYYY.MM.DD"));
  });
});
