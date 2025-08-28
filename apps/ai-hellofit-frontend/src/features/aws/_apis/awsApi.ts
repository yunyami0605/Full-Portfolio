import { apiCall } from "@/libs/apiCall";
import { PostAWsS3PresignedResponse } from "../_types/response";
import { PostAWsS3PresignedBody } from "../_types/body";

/**
 *@description aws s3 presigned url 요청
 */
export const postAwsS3PresignedApi = (file: PostAWsS3PresignedBody) => {
  return apiCall<PostAWsS3PresignedResponse>({
    url: "/aws/s3/presigned",
    method: "POST",
    data: file,
  });
};
