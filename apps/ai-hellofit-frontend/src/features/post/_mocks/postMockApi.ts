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

// 게시글 더미 데이터
let postDatas = [
  { id: "1", title: "t_title1", content: "t_content1", createdAt: "2025-08-25" },
  { id: "2", title: "t_title2", content: "t_content2", createdAt: "2025-08-25" },
  { id: "3", title: "t_title3", content: "t_content3", createdAt: "2025-08-25" },
  { id: "4", title: "t_title4", content: "t_content4", createdAt: "2025-08-25" },
];

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

    const newPost = {
      id: (postDatas.length + 1).toString(),
      title: body.title,
      content: body.content ?? "",
      createdAt: dayjs().toISOString(),
    };

    postDatas.push(newPost);

    return mutationSuccessResponse(201);
  }),

  // 게시글 수정하기
  http.put("/posts/:id", async ({ params, request }) => {
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
