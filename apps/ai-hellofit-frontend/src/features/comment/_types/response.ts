import type { Cursor } from "@/shared/types/api";
import { CommentItemType } from "./base";

// 댓글 목록 조회 응답
export type GetCommentsResponse = Cursor<CommentItemType[]>;

// 답글 목록 조회 응답
export type GetRecommentsResponse = Cursor<CommentItemType[]>;

// 등록, 수정, 삭제 응답
export type CommentMutationResponse = CommentItemType;
