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
  imageKeys: z
    .array(
      z.object({
        objectKey: z.string("잘못된 저장 형식입니다."),
        presignedUrl: z.url("잘못된 미리보기 URL 형식입니다."),
      }),
    )
    .optional(),
});

// 게시글 등록 스키마
export const createPostSchema = _baseSchema.pick({ title: true, content: true, imageKeys: true });

// 게시글 수정 스키마
export const updatePostSchema = createPostSchema.partial();
