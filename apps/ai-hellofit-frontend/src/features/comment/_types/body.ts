/**
 *@description 댓글/답글 생성
 */
export type PostCommentBody = {
  content: string;
  parentId?: string | null; // null -> 답글 생성
  targetId?: string | null; // null -> 답글 생성
};

/**
 *@description 댓글 수정
 */
export type PatchCommentsBody = Omit<PostCommentBody, "parentId" | "targetId">;
