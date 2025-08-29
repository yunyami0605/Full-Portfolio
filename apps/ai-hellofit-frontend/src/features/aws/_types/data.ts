/**
 *@description aws upload field data
 *@param url : 서버 전송용 url (s3 key)
 *@param presignedGetUrl : 화면에 임시적으로 보여질 url
 */
export type AwsS3UploadFieldData = { url: string; presignedGetUrl: string };
