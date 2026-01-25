"use client";

import React from "react";
import { useChatPageController } from "@/features/chat/_hooks/useChatPageController";
import { ChatPageView } from "@/features/chat/_components";

/**
 * 채팅 페이지
 */
function ChatPage() {
  const controller = useChatPageController();

  return <ChatPageView {...controller} />;
}

export default ChatPage;
