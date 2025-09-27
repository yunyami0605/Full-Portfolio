import { CursorQuery } from "@/shared/types/api";

/**
 *@description 음식 검색 쿼리
 */
export type GetFoodsSearchQuery = CursorQuery & {
  keyword?: string | null;
};
