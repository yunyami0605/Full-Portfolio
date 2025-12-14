"use client";

import React from "react";
import { PageWrapper } from "@/shared/components";
import { useChatSocket } from "@/features/chat/_hooks/useChatSocket";
import { getChatHistoryApi, postChatMessageApi } from "@/features/chat/_apis/chat.api";
import { ChatMessage } from "@/features/chat/_types/chat";
import { Text, Button, Input } from "@my/ui";
import styles from "./ChatPage.module.scss";
import { useUiStore } from "@/shared/stores/ui.store";

/**
 * 채팅 페이지
 */
function ChatPage() {
  const [input, setInput] = React.useState("");
  const [history, setHistory] = React.useState<ChatMessage[]>([]);
  const [nextCursor, setNextCursor] = React.useState<string | null>(null);
  const [loadingOlder, setLoadingOlder] = React.useState(false);
  const { isConnected, messages, sendJson } = useChatSocket();
  const { showToast } = useUiStore();
  const listRef = React.useRef<HTMLDivElement | null>(null);
  const bottomRef = React.useRef<HTMLDivElement | null>(null);

  const scrollToBottom = React.useCallback(() => {
    // 가장 하단 앵커로 스크롤(렌더 타이밍에 강건)
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, []);

  // 초기 채팅 내역 불러오기 (백엔드 준비 이전까지 실패해도 무시)
  React.useEffect(() => {
    getChatHistoryApi({ size: 20, cursorId: null })
      .then((res) => {
        // 서버는 최신순(내림차순) → 화면용으로 오래된→최신(오름차순) 정규화
        setHistory([...res.data.items].reverse());
        setNextCursor(res.data.nextCursor);
      })
      .catch((error) => {
        if (error.response?.status === 403) {
          showToast({ message: "잘못된 접근입니다.", type: "error" });
        }
      });
  }, []);

  // 신규 메시지 도착 시 스크롤 하단 고정
  React.useEffect(() => {
    scrollToBottom();
  }, [history, messages]);

  // 상단 도달 시 과거 페이지 프리펜드
  const onScroll = React.useCallback(async () => {
    const el = listRef.current;
    if (!el || loadingOlder) return;
    if (el.scrollTop <= 24 && nextCursor) {
      try {
        setLoadingOlder(true);
        const prevHeight = el.scrollHeight;
        const res = await getChatHistoryApi({ size: 20, cursorId: nextCursor });
        const olderAsc = [...res.data.items].reverse();
        setHistory((prev) => [...olderAsc, ...prev]);
        setNextCursor(res.data.nextCursor);
        // 스크롤 위치 보정 (기존 위치 유지)
        requestAnimationFrame(() => {
          const newHeight = el.scrollHeight;
          el.scrollTop = newHeight - prevHeight + el.scrollTop;
        });
      } finally {
        setLoadingOlder(false);
      }
    }
  }, [nextCursor, loadingOlder]);

  const onSend = async () => {
    const content = input.trim();
    if (!content) return;
    setInput("");

    sendJson({ type: "user_message", content });
    // 전송 직후 즉시 하단으로 스크롤
    requestAnimationFrame(scrollToBottom);
  };

  const allMessages = React.useMemo(() => {
    // history(오래된→최신) 뒤에 실시간 메시지(도착순)를 이어 붙임
    return [...history, ...messages];
  }, [history, messages]);

  return (
    <PageWrapper>
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <Text className={styles.status}>{isConnected ? "실시간 연결됨" : "연결 대기중"}</Text>
          <div ref={bottomRef} />
        </div>

        <div className={styles.messages} ref={listRef} onScroll={onScroll}>
          {allMessages.map((m) => (
            <div
              key={m.id}
              className={`${styles.messageRow} ${m.role === "user" ? styles.right : styles.left}`}
            >
              <div
                className={`${styles.bubble} ${m.role === "user" ? styles.user : styles.assistant}`}
              >
                <span className={styles.role}>[{m.role}]</span>
                <p className={styles.content}>{m.content}</p>
              </div>
            </div>
          ))}

          <div className={styles.bottomAnchor} ref={bottomRef} />
        </div>

        <div className={styles.inputBar}>
          <Input
            className={styles.input}
            placeholder="AI에게 식단 및 건강 정보에 대해 물어보세요..."
            value={input}
            onChange={(e) => setInput((e.target as HTMLInputElement).value)}
            onKeyDown={(e) => {
              const ne = e.nativeEvent as unknown as { isComposing?: boolean };
              if (e.key === "Enter" && !ne?.isComposing) {
                onSend();
              }
            }}
          />
          <Button className={styles.sendButton} onClick={onSend}>
            보내기
          </Button>
        </div>
      </div>
    </PageWrapper>
  );
}

export default ChatPage;
