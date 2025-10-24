import { SocialType } from "./base";

/**
 *@description login api 바디
 */
export type LoginApiBody = {
  email: string;
  password: string;
};

/**
 *@description signup api body
 */
export type SignupApiBody = {
  email: string;
  password: string;
  nickname: string;
  isPrivacyAgree: boolean;
};

/**
 *@description social login api body
 */
export type SocialLoginBody = {
  code: string;
  provider: SocialType;
};

/**
 *@description social signup api body
 */
export type SocialSignupBody = {
  email: string;
  nickname: string;
  isPrivacyAgree: boolean;
  socialId: string;
  provider: SocialType;
};
