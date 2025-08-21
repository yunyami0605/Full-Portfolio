export type AuthTokenResponse = {
  accessToken: string;
};

/**
 *@description login api 응답
 */
export type LoginApiResponse = AuthTokenResponse;

/**
 *@description signup api 응답
 */
export type SignupApiResponse = AuthTokenResponse;
