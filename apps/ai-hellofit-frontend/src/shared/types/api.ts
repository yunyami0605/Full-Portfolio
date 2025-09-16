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

type InfiniteData<T> = {
  pages: T[];
  pageParams: any[];
};
