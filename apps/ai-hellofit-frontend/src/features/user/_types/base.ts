import { ImageUrl } from "@/shared/types/base";

/**
 *@description 작성자 프로필 타입
 */
export type AuthorProfile = {
  id: string;
  nickname: string;
  imageUrl: ImageUrl;
};
