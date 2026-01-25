import { serverStateConstants } from "@/shared/constants/serverStateConstants";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getChatHistoryApi } from "../_apis/chat.api";
import type { GetChatHistoryResponse } from "../_types/chat";

/**
 *@description 채팅 내역 조회 훅 (커서 기반 infinite query)
 */
export const useGetChatHistoryInfiniteApi = (size: number = 20) => {
  return useInfiniteQuery({
    queryKey: [serverStateConstants.chat.getChatHistory, size],
    initialPageParam: null as string | null,
    queryFn: async ({ pageParam }) => {
      const res = await getChatHistoryApi({ size, cursorId: pageParam });
      return res.data as GetChatHistoryResponse;
    },
    // nextCursor가 null이면 더 이상 페이지가 없음
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    retry: false,
  });
};

