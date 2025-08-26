/**
 *@description 게시글 스키마 스크립트
 */

import z from "zod";
import { postErrorMessage } from "../_constants/postErrorMessage.constant";

const _baseSchema = z.object({
  title: z
    .string()
    .min(2, postErrorMessage.error.validation.wrongTitle)
    .max(2, postErrorMessage.error.validation.wrongTitle),
  content: z
    .string()
    .min(2, postErrorMessage.error.validation.wrongContent)
    .max(2, postErrorMessage.error.validation.wrongContent),
});

// 게시글 등록 스키마
export const createPostSchema = _baseSchema.pick({ title: true, content: true });

// 게시글 수정 스키마
export const updatePostSchema = createPostSchema.partial();
