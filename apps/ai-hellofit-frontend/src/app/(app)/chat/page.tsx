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
  const { isConnected, messages, sendJson } = useChatSocket();
  const { showToast } = useUiStore();
  const listRef = React.useRef<HTMLDivElement | null>(null);

  const scrollToBottom = React.useCallback(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, []);

  // 초기 채팅 내역 불러오기 (백엔드 준비 이전까지 실패해도 무시)
  React.useEffect(() => {
    getChatHistoryApi({ size: 20, cursorId: null })
      .then((res) => setHistory(res.data.items))
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

  const onSend = async () => {
    const content = input.trim();
    if (!content) return;
    setInput("");

    // WebSocket 전송 (실시간)
    sendJson({ type: "user_message", content });
    // 전송 직후 즉시 하단으로 스크롤
    requestAnimationFrame(scrollToBottom);

    // REST 백업 전송 (백엔드 준비 전까지 실패 무시)
    try {
      await postChatMessageApi({ content });
    } catch {
      // ignore
    }
  };

  const allMessages = React.useMemo(() => {
    return [...history, ...messages];
  }, [history, messages]);

  return (
    <PageWrapper>
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <Text className={styles.status}>{isConnected ? "실시간 연결됨" : "연결 대기중"}</Text>
        </div>

        <div className={styles.messages} ref={listRef}>
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
        </div>

        <div className={styles.inputBar}>
          <Input
            className={styles.input}
            placeholder="AI에게 식단 및 건강 정보에 대해 물어보세요..."
            value={input}
            onChange={(e) => setInput((e.target as HTMLInputElement).value)}
            onKeyDown={(e) => e.key === "Enter" && onSend()}
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
