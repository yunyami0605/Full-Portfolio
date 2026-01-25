"use client";

import React from "react";
import { PageWrapper } from "@/shared/components";
import { useChatSocket } from "@/features/chat/_hooks/useChatSocket";
import { ChatMessage } from "@/features/chat/_types/chat";
import { Text, Button, Input } from "@my/ui";
import styles from "./ChatPage.module.scss";
import { useUiStore } from "@/shared/stores/ui.store";
import { useGetChatHistoryInfiniteApi } from "@/features/chat/_hooks/query";

/**
 * 채팅 페이지
 */
function ChatPage() {
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
  // - 과거 페이지 프리펜드(history 변경)에서는 강제 스크롤하지 않음
  React.useEffect(() => {
    if (!didInitialScrollRef.current) return;
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // 상단 도달 시 과거 페이지 프리펜드
  const onScroll = React.useCallback(async () => {
    const el = listRef.current;
    if (!el || isFetchingNextPage || !hasNextPage) return;
    if (el.scrollTop <= 24) {
      try {
        const prevHeight = el.scrollHeight;
        await fetchNextPage();
        // 스크롤 위치 보정 (기존 위치 유지)
        requestAnimationFrame(() => {
          const newHeight = el.scrollHeight;
          el.scrollTop = newHeight - prevHeight + el.scrollTop;
        });
      } finally {
      }
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const onSend = async () => {
    if (isAwaitingAssistant) return;
    const content = input.trim();
    if (!content) return;
    setInput("");

    try {
      await sendJson({ type: "user_message", content });
    } catch {
      showToast({ message: "메시지 전송에 실패했습니다.", type: "error" });
    }
    // 전송 직후 즉시 하단으로 스크롤
    requestAnimationFrame(() => scrollToBottom());
  };

  const historyMessages = React.useMemo(() => {
    // 서버는 최신순(내림차순)으로 페이지를 내려줌
    // UI는 오래된→최신(오름차순)으로 보여야 하므로:
    // - 페이지 순서를 뒤집고(가장 과거 페이지부터),
    // - 각 페이지의 items를 reverse(오래된→최신)로 변환
    const pages = data?.pages ?? [];
    const orderedPages = [...pages].reverse();
    const flat: ChatMessage[] = [];
    for (const p of orderedPages) {
      const itemsAsc = [...p.items].reverse();
      flat.push(...itemsAsc);
    }
    return flat;
  }, [data?.pages]);

  const allMessages = React.useMemo(() => {
    // history(오래된→최신) + 실시간(도착순)
    // id 기준으로 중복 제거(추천1): 마지막 값을 우선(실시간이 history를 덮어씀)
    const combined = [...historyMessages, ...messages];
    const seen = new Set<string>();
    const outRev: ChatMessage[] = [];
    for (let i = combined.length - 1; i >= 0; i--) {
      const m = combined[i];
      if (seen.has(m.id)) continue;
      seen.add(m.id);
      outRev.push(m);
    }
    return outRev.reverse();
  }, [historyMessages, messages]);

  return (
    <PageWrapper withHeader={false} topPadding={false} className={styles.page}>
      <div className={styles.container}>
        <div className={styles.messages} ref={listRef} onScroll={onScroll}>
          {allMessages.map((m) => (
            <div
              key={m.id}
              className={`${styles.messageRow} ${m.role === "user" ? styles.right : styles.left}`}
            >
              <div
                className={`${styles.bubble} ${m.role === "user" ? styles.user : styles.assistant}`}
              >
                <p className={styles.content}>{m.content}</p>
              </div>
            </div>
          ))}

          <div className={styles.bottomAnchor} ref={bottomRef} />
        </div>

        <div className={styles.inputBar}>
          <Input
            className={styles.input}
            placeholder={
              isAwaitingAssistant
                ? "답변 생성 중입니다. 완료 후 메시지를 보내세요..."
                : "AI에게 식단 및 건강 정보에 대해 물어보세요..."
            }
            value={input}
            onChange={(e) => setInput((e.target as HTMLInputElement).value)}
            onKeyDown={(e) => {
              const ne = e.nativeEvent as unknown as { isComposing?: boolean };
              if (e.key === "Enter" && !ne?.isComposing) {
                onSend();
              }
            }}
          />
          <Button className={styles.sendButton} onClick={onSend} disabled={isAwaitingAssistant}>
            {isAwaitingAssistant ? "답변 생성 중..." : "보내기"}
          </Button>
        </div>
      </div>
    </PageWrapper>
  );
}

export default ChatPage;
