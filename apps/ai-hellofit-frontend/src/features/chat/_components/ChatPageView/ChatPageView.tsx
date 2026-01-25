"use client";

import React from "react";
import { PageWrapper } from "@/shared/components";
import { Button, Input } from "@my/ui";
import styles from "./ChatPageView.module.scss";
import type { ChatMessage } from "@/features/chat/_types/chat";

type Props = {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  allMessages: ChatMessage[];
  placeholder: string;
  isAwaitingAssistant: boolean;
  listRef: React.RefObject<HTMLDivElement | null>;
  bottomRef: React.RefObject<HTMLDivElement | null>;
  onScroll: React.UIEventHandler<HTMLDivElement>;
  onSend: () => Promise<void>;
};

export default function ChatPageView({
  input,
  setInput,
  allMessages,
  placeholder,
  isAwaitingAssistant,
  listRef,
  bottomRef,
  onScroll,
  onSend,
}: Props) {
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
            placeholder={placeholder}
            value={input}
            onChange={(e) => setInput((e.target as HTMLInputElement).value)}
            onKeyDown={(e) => {
              const ne = e.nativeEvent as unknown as { isComposing?: boolean };
              if (e.key === "Enter" && !ne?.isComposing) {
                void onSend();
              }
            }}
          />
          <Button className={styles.sendButton} onClick={() => void onSend()} disabled={isAwaitingAssistant}>
            {isAwaitingAssistant ? "답변 생성 중..." : "보내기"}
          </Button>
        </div>
      </div>
    </PageWrapper>
  );
}

