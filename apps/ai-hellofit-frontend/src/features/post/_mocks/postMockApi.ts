import { http, HttpResponse } from "msw";
import { postErrorMessage } from "../_constants/postErrorMessage.constant";
import { CreatePostBody } from "../_types/body";
import { createPostSchema, updatePostSchema } from "../_schemas/post.schemas";
import dayjs from "dayjs";
import {
  mutationSuccessResponse,
  notFoundErrorResponse,
  validationErrorResponse,
} from "@/libs/mock";
import { PostItem } from "../_types/data";
import { GetPostResponse } from "../_types/response";

let postDatas = Array.from({ length: 4 }, (_, i) => ({
  id: String(i + 1),
  title: `test_title${i + 1}`,
  content: `test_content${i + 1}`,
  createdAt: "2025-08-26",
  updatedAt: "2025-08-26",
  likeCount: 12,
  commentCount: 12,
  viewCount: 12,
  images: [],
})) as PostItem[];

/**
 *@description 게시글 mock api
 */
export const postHandlers = [
  // 게시글 목록 조회
  http.get("/posts", () => {
    return HttpResponse.json(postDatas, { status: 200 });
  }),

  // 게시글 하나 조회
  http.get("/posts/:id", ({ params }) => {
    const id = params.id;

    const _post = postDatas.find((item) => item.id === id);

    if (!_post) return notFoundErrorResponse(postErrorMessage.error.notFoundPost);

    return HttpResponse.json(_post, { status: 200 });
  }),

  // 게시글 등록
  http.post("/posts", async ({ request }) => {
    const body = (await request.json()) as CreatePostBody;

    const parsed = createPostSchema.safeParse(body);

    if (!parsed.success) {
      return validationErrorResponse(
        parsed,
        (_key) =>
          postErrorMessage.error.validation[_key === "title" ? "wrongTitle" : "wrongContent"],
      );
    }

    const newPost: GetPostResponse = {
      id: (postDatas.length + 1).toString(),
      title: body.title,
      content: body.content ?? "",
      createdAt: dayjs().toISOString(),
      updatedAt: dayjs().toISOString(),
      likeCount: 12,
      commentCount: 12,
      viewCount: 12,
      images: body.imageKeys,
    };

    postDatas.push(newPost);

    return mutationSuccessResponse(201);
  }),

  // 게시글 수정하기
  http.patch("/posts/:id", async ({ params, request }) => {
    const id = params.id;

    // 1. id 조회 없으면 not found
    const postIndex = postDatas.findIndex((item) => item.id === id);

    if (postIndex === -1) return notFoundErrorResponse(postErrorMessage.error.notFoundPost);

    const body = (await request.json()) as {
      title?: string;
      content?: string;
    };

    // 2. body 유효성 검증
    const parsed = updatePostSchema.safeParse(body);

    if (!parsed.success) {
      return validationErrorResponse(
        parsed,
        (_key) =>
          postErrorMessage.error.validation[_key === "title" ? "wrongTitle" : "wrongContent"],
      );
    }

    // 3. 데이터 수정
    postDatas[postIndex] = {
      ...postDatas[postIndex],
      ...body,
    };

    return mutationSuccessResponse();
  }),

  // 게시글 삭제하기
  http.delete("/posts/:id", ({ params }) => {
    const id = params.id;

    // 1. 데이터 조회 -> 없으면 not found
    const postIndex = postDatas.findIndex((item) => item.id === id);

    if (postIndex === -1) return notFoundErrorResponse(postErrorMessage.error.notFoundPost);

    // 2. 게시글 데이터 제거
    postDatas = postDatas.filter((p) => p.id !== id);

    // 3. 성공 응답
    return mutationSuccessResponse();
  }),
];
