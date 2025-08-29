/**
 *@description aws s3 presigned api response
 */
export type PostAWsS3PresignedResponse = {
  presignedPatchUrl: string; // 허용된 patch url
  savedFileUrl: string; // 실제 db에 저장할 url
  presignedGetUrl: string; // 임시 접근 url
};
