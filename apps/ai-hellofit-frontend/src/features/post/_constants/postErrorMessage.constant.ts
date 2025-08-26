export const postErrorMessage = {
  error: {
    validation: {
      wrongTitle: "제목은 2글자 이상, 80글자 이하여야합니다.",
      wrongContent: "내용은 2글자 이상, 200글자 이하여야합니다.",
    },
    notFoundPost: "해당 게시글을 찾을 수 없습니다.",
  },
} as const;
