import { AwsS3UploadFieldData } from "@/features/aws/_types/data";
import { CreatePostBody } from "./body";

/**
 *@description 게시글 목록 항목
 */
export type PostItem = {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
  likeCount: number;
  commentCount: number;
  viewCount: number;
  images: string[];
  author?: {
    id: string;
    nickname: string;
  };
};

/**
 *@description 게시글 수정 시 조회 데이터
 */
export type PostItemWhenUpdate = Omit<
  PostItem,
  "images" | "likeCount" | "commentCount" | "viewCount"
> & {
  images: AwsS3UploadFieldData[];
};

/**
 *@description 등록 게시글 폼 타입
 */
export type CreatePostForm = Omit<CreatePostBody, "imageKeys"> & {
  imageKeys: AwsS3UploadFieldData[];
};

/**
 *@description 수정 게시글 폼 타입
 */
export type UpdatePostForm = Partial<CreatePostForm>;
