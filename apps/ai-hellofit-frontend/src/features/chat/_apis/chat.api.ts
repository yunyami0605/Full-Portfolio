import { apiCall } from "@/libs/apiCall";
import {
  GetChatHistoryQuery,
  GetChatHistoryResponse,
  PostChatMessageBody,
  PostChatMessageResponse,
} from "../_types/chat";

/**
 *@description [API] 채팅 내역 조회 (커서 기반)
 */
export const getChatHistoryApi = (query: GetChatHistoryQuery) => {
  return apiCall<GetChatHistoryResponse>({
    url: "/chat/history",
    method: "GET",
    params: query,
  });
};

/**
 *@description [API] 채팅 메시지 전송
 */
export const postChatMessageApi = (body: PostChatMessageBody) => {
  return apiCall<PostChatMessageResponse>({
    url: "/chat/message",
    method: "POST",
    data: body,
  });
};

/**
 *@description [API] 채팅 세션 시작(선택)
 */
export const postChatSessionStartApi = () => {
  return apiCall<{ sessionId: string }>({
    url: "/chat/session",
    method: "POST",
  });
};
