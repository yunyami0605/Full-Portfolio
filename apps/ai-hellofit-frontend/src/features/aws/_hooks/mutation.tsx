import { useMutation } from "@tanstack/react-query";
import { postAwsS3PresignedApi } from "../_apis/awsApi";
import { PostAWsS3PresignedBody } from "../_types/body";

/**
 *@description aws s3 presigned hook
 */
export const usePostAwsS3PresignedApi = () => {
  return useMutation({
    mutationFn: (file: PostAWsS3PresignedBody) => postAwsS3PresignedApi(file),
  });
};
