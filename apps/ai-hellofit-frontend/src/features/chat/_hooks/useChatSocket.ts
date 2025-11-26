import { useAccessTokenStore } from "@/features/auth/_stores/accessToken.store";
import React from "react";
import { ChatMessage } from "../_types/chat";

type UseChatSocketOptions = {
  roomId?: string;
};

/**
 *@description [Hook] 채팅 소켓 연결
 * @param options - 채팅 소켓 옵션
 * @returns {boolean} isConnected - 채팅 소켓 연결 상태
 * @returns {ChatMessage[]} messages - 채팅 메시지 목록
 * @returns {Function} sendJson - 채팅 메시지 전송 함수
 */
export function useChatSocket(options?: UseChatSocketOptions) {
  const { accessToken } = useAccessTokenStore();

  // 채팅 소켓 연결 상태
  const [isConnected, setIsConnected] = React.useState(false);
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const socketRef = React.useRef<WebSocket | null>(null);

  React.useEffect(() => {
    const base =
      process.env.NEXT_PUBLIC_CHAT_WS_URL ||
      (typeof window !== "undefined" && window.location.origin.replace(/^http/, "ws")) ||
      "ws://localhost:4000";

    // 예: ws://host/ws/chat?roomId=...&token=...
    const url = new URL("/ws/chat", base);
    if (options?.roomId) url.searchParams.set("roomId", options.roomId);
    if (accessToken) url.searchParams.set("token", accessToken);

    const ws = new WebSocket(url.toString());
    socketRef.current = ws;

    ws.onopen = () => setIsConnected(true);
    ws.onclose = () => setIsConnected(false);
    ws.onerror = () => setIsConnected(false);
    ws.onmessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data) as ChatMessage | { type: string; payload: unknown };
        if ("role" in (data as ChatMessage) && "content" in (data as ChatMessage)) {
          setMessages((prev) => [...prev, data as ChatMessage]);
        }
      } catch {
        // ignore parse error
      }
    };

    return () => {
      ws.close();
      socketRef.current = null;
    };
  }, [accessToken, options?.roomId]);

  const sendJson = React.useCallback((payload: unknown) => {
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) return;
    socketRef.current.send(JSON.stringify(payload));
  }, []);

  return { isConnected, messages, sendJson };
}
