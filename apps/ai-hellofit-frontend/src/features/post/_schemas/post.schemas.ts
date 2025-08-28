/**
 *@description 게시글 스키마 스크립트
 */

import z from "zod";
import { postErrorMessage } from "../_constants/postErrorMessage.constant";

const _baseSchema = z.object({
  title: z
    .string()
    .min(2, postErrorMessage.error.validation.wrongTitle)
    .max(80, postErrorMessage.error.validation.wrongTitle),
  content: z
    .string()
    .min(2, postErrorMessage.error.validation.wrongContent)
    .max(200, postErrorMessage.error.validation.wrongContent),
  images: z.array(z.url("잘못된 url 입니다.")).optional(),
  // images: z
  //   .custom<FileList>()
  //   .refine(
  //     (files) => !files || Array.from(files).every((item) => item.size <= 5 * 1024 * 1024),
  //     "이미지는 5MB 이하만 됩니다.",
  //   )
  //   .optional(),
});

// 게시글 등록 스키마
export const createPostSchema = _baseSchema.pick({ title: true, content: true, images: true });

// 게시글 수정 스키마
export const updatePostSchema = createPostSchema.partial();
