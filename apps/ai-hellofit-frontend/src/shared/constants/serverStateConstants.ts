export const serverStateConstants = {
  auth: {
    checkNickname: "auth-check-nickname",
    getInfo: "get-auth-info",
  },
  post: {
    getPosts: "get-posts",
    getPostOne: "get-post-one",
    getPostFormData: "get-post-form-data",
    getPostsMe: "get-posts-me",
  },
  comment: {
    getComments: "get-comments",
    getRecomments: "get-recomments",
    getCommentsMe: "get-comments-me",
  },
  diet: {
    recommendations: {
      getDietsRecommendations: "get-diets-recommendations",
    },
    logs: {
      getDietsLogs: "get-diets-logs",
      getDietsMacrosDaily: "get-diets-macros-daily",
    },
  },

  foods: {
    getFoodsSearch: "get-foods-search",
  },
} as const;
