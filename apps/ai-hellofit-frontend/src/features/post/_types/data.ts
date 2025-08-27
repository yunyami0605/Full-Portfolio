/**
 *@description 게시글 아이템
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
