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
