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
    if (!accessToken) {
      // 액세스 토큰이 준비되지 않았으면 연결 시도하지 않음
      setIsConnected(false);
      return;
    }

    const base =
      process.env.NEXT_PUBLIC_CHAT_WS_URL ||
      (typeof window !== "undefined" && window.location.origin.replace(/^http/, "ws")) ||
      "ws://localhost:8084";

    const url = new URL("/api/ws/chat", base);

    if (options?.roomId) url.searchParams.set("roomId", options.roomId);
    url.searchParams.set("token", accessToken);

    const ws = new WebSocket(url.toString());
    socketRef.current = ws;

    ws.onopen = () => {
      setIsConnected(true);
    };
    ws.onclose = () => {
      setIsConnected(false);
    };
    ws.onerror = () => {
      setIsConnected(false);
    };
    ws.onmessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data) as ChatMessage | { type: string; payload: unknown };
        if ("role" in (data as ChatMessage) && "content" in (data as ChatMessage)) {
          const msg = data as ChatMessage;
          setMessages((prev) => (prev.some((p) => p.id === msg.id) ? prev : [...prev, msg]));
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
