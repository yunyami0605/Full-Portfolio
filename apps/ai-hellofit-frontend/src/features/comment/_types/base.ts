import { AuthorProfile } from "@/features/user/_types/base";
import { TimeField } from "@/shared/types/api";

/**
 *@description 댓글 항목
 */
export type CommentItemType = {
  id: string;
  postId: string;
  parentId?: string | null;
  content: string;
  author: AuthorProfile;
  likeCount: number;
  targetNickname?: string | null;
  recommentCount: number;
} & TimeField;

/**
 *@description 선택된 댓글
 */
export type SelectedCommentItemType = {
  type: "comment" | "recomment";
  action: "create" | "update" | "delete";
  id?: string | null; // recomment 생성일 경우 > null
  targetId?: string | null;
  targetNickname?: string | null;
  parentId?: string | null;
};
