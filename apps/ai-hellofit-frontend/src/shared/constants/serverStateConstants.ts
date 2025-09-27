export const serverStateConstants = {
  auth: {
    checkNickname: "auth-check-nickname",
  },
  post: {
    getPosts: "get-posts",
    getPostOne: "get-post-one",
    getPostFormData: "get-post-form-data",
  },
  comment: {
    getComments: "get-comments",
    getRecomments: "get-recomments",
  },
  diet: {
    recommendations: {
      getDietsRecommendations: "get-diets-recommendations",
    },
    logs: {
      getDietsLogs: "get-diets-logs",
    },
  },

  foods: {
    getFoodsSearch: "get-foods-search",
  },
} as const;
