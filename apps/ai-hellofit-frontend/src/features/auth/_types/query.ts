/**
 *@description 소셜 로그인 api 요청 쿼리
 */
export type SocialLoginQuery = {
  code: string;
  provider: "KAKAO";
};
