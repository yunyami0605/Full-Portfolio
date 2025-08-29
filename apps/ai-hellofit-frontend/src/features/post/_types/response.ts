import { PostItem, PostItemWhenUpdate } from "./data";

// 게시글 목록 조회 api 응답
export type GetPostsResponse = PostItem[];

// 게시글 컨텐츠 조회 api 응답
export type GetPostResponse = PostItem;

// 게시글 수정에 필요한 폼 데이터 조회 api 응답
export type GetPostFormDataResponse = PostItemWhenUpdate;
