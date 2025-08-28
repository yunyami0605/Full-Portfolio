import { http, HttpResponse } from "msw";
import { PostAWsS3PresignedBody } from "@/features/aws/_types/body";
import { v4 as uuid } from "uuid";

/**
 *@description aws mock api
 */
export const awsHandlers = [
  // aws 이미지 presigned url 요청
  http.post("/aws/s3/presigned", async ({ request }) => {
    const body = (await request.json()) as PostAWsS3PresignedBody;
    const fileId = uuid();
    const fileExt = body.fileName.split(".").pop();

    return HttpResponse.json(
      {
        presignedUrl: `http://test-s3.com/upload/${fileId}.${fileExt}`,
      },
      { status: 200 },
    );
  }),

  // Presigned URL 로 s3에 업로드
  http.put("http://test-s3.com/upload/:fileId", async ({ params }) => {
    console.log("Mock S3 upload:", params.fileId);
    return HttpResponse.json({ url: `http://test-s3.com/files/${params.fileId}` }, { status: 200 });
  }),
];
