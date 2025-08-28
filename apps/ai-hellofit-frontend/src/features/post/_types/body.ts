// 게시글 등록 바디
export type CreatePostBody = {
  title: string;
  content: string;
  images: string[];
};

// 게시글 수정 바디
export type UpdatePostBody = Partial<CreatePostBody>;
