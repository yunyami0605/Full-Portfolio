"use client";

import React from "react";
import { useChatSocket } from "@/features/chat/_hooks/useChatSocket";
import { useGetChatHistoryInfiniteApi } from "@/features/chat/_hooks/query";
import { useUiStore } from "@/shared/stores/ui.store";
import type { ChatMessage } from "@/features/chat/_types/chat";
import { buildHistoryMessages, mergeMessages } from "@/features/chat/_utils/messages";

export function useChatPageController() {
  const [input, setInput] = React.useState("");
  const { isAwaitingAssistant, messages, sendJson } = useChatSocket();
  const { showToast } = useUiStore();

  const listRef = React.useRef<HTMLDivElement | null>(null);
  const bottomRef = React.useRef<HTMLDivElement | null>(null);
  const didInitialScrollRef = React.useRef(false);

  const scrollToBottom = React.useCallback((behavior: ScrollBehavior = "smooth") => {
    const el = listRef.current;

    // 1) 메시지 리스트가 스크롤 컨테이너인 경우
    if (el && el.scrollHeight > el.clientHeight) {
      const top = Math.max(0, el.scrollHeight - el.clientHeight);
      el.scrollTo({ top, behavior });
    }

    // 2) 실제 스크롤이 window/body에서 일어나는 경우까지 커버
    bottomRef.current?.scrollIntoView({ behavior, block: "end" });

    // 3) 최후의 보루: bottomRef가 아직 없거나, 스크롤 컨테이너가 특이한 경우
    if (!el && typeof window !== "undefined") {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior });
    }
  }, []);

  const pageSize = 20;
  const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetChatHistoryInfiniteApi(pageSize);

  // 초기 히스토리 로드가 끝나면(0건이어도) 1회 바닥으로 이동
  React.useEffect(() => {
    if (didInitialScrollRef.current) return;
    if (isLoading) return;
    didInitialScrollRef.current = true;
    requestAnimationFrame(() => scrollToBottom("auto"));
  }, [isLoading, scrollToBottom]);

  // (옵션) 기존과 동일하게 403만 토스트 처리
  React.useEffect(() => {
    if (!isError) return;
    const anyErr = error as any;
    if (anyErr?.response?.status === 403) {
      showToast({ message: "잘못된 접근입니다.", type: "error" });
    }
  }, [isError, error, showToast]);

  // 신규 메시지 도착 시(실시간) 스크롤 하단 고정
  React.useEffect(() => {
    if (!didInitialScrollRef.current) return;
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // 상단 도달 시 과거 페이지 프리펜드
  const onScroll: React.UIEventHandler<HTMLDivElement> = React.useCallback(async () => {
    const el = listRef.current;
    if (!el || isFetchingNextPage || !hasNextPage) return;
    if (el.scrollTop <= 24) {
      const prevHeight = el.scrollHeight;
      await fetchNextPage();
      // 스크롤 위치 보정 (기존 위치 유지)
      requestAnimationFrame(() => {
        const newHeight = el.scrollHeight;
        el.scrollTop = newHeight - prevHeight + el.scrollTop;
      });
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const onSend = React.useCallback(async () => {
    if (isAwaitingAssistant) return;
    const content = input.trim();
    if (!content) return;
    setInput("");

    try {
      await sendJson({ type: "user_message", content });
    } catch {
      showToast({ message: "메시지 전송에 실패했습니다.", type: "error" });
    }
    requestAnimationFrame(() => scrollToBottom());
  }, [input, isAwaitingAssistant, scrollToBottom, sendJson, showToast]);

  const historyMessages: ChatMessage[] = React.useMemo(
    () => buildHistoryMessages(data?.pages),
    [data?.pages],
  );

  const allMessages: ChatMessage[] = React.useMemo(
    () => mergeMessages(historyMessages, messages),
    [historyMessages, messages],
  );

  const placeholder = isAwaitingAssistant
    ? "답변 생성 중입니다. 완료 후 메시지를 보내세요..."
    : "AI에게 식단 및 건강 정보에 대해 물어보세요...";

  return {
    input,
    setInput,
    allMessages,
    placeholder,
    isAwaitingAssistant,
    listRef,
    bottomRef,
    onScroll,
    onSend,
  };
}

