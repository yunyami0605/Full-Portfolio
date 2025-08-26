export type AuthTokenResponse = {
  access: string;
};

/**
 *@description login api 응답
 */
export type LoginApiResponse = AuthTokenResponse;

/**
 *@description signup api 응답
 */
export type SignupApiResponse = AuthTokenResponse;

/**
 *@description rt 재발급 api 응답
 */
export type PostRefresshTokenApiApiResponse = AuthTokenResponse;

/**
 *@description nickname duplicate api 응답
 */
export type DuplicateNicknameApiResponse = {
  isDuplicate: boolean;
};
