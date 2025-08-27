/**
 *@description 게시글 목록 항목
 */
export type PostItem = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  likeCount: number;
  commentCount: number;
  viewCount: number;
};
