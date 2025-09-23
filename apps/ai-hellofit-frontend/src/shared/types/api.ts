import { AxiosError } from "axios";

export type MutationResponse = {
  success: boolean;
};

export type ErrorResponse = {
  code: string;
  message: string;
  field?: string;
};

export type AxiosErrorResponse = AxiosError<ErrorResponse>;

/**
 *@description 커서 방식 응답
 */
export type Cursor<T> = {
  hasNext: boolean;
  items: T;
  nextCursor: string;
};

export type CursorQuery = { cursorId: string | null; size: number };

/**
 *@description 생성, 업데이트, 삭제 날짜 공통 타입
 */
export type TimeField = {
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
};
