import { Cursor } from "@/shared/types/api";
import { GetPostsResponse } from "../_types/response";
import { getServiceTokenServerApi } from "@/features/auth/_apis/authServer.api";

export const getPostsServerApi = async (size = 10): Promise<Cursor<GetPostsResponse>> => {
  try {
    const token = await getServiceTokenServerApi();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts?size=10`, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 60 },
    });

    console.log(res);

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`게시글 목록 요청 실패 (${res.status}): ${text}`);
    }

    return res.json();
  } catch (err) {
    throw err;
  }
};
