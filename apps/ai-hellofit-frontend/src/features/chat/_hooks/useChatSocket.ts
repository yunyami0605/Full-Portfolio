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
  const streamingRef = React.useRef<{ tempId: string | null }>({ tempId: null });
  // StrictMode 이중 마운트로 인한 중복 연결 방지
  const startedRef = React.useRef(false);
  // 중복 id 레이스 방지
  const seenIdsRef = React.useRef<Set<string>>(new Set());

  React.useEffect(() => {
    if (!accessToken) {
      // 액세스 토큰이 준비되지 않았으면 연결 시도하지 않음
      setIsConnected(false);
      return;
    }
    if (startedRef.current) {
      // 이미 연결 시도 중/완료 상태면 중복으로 만들지 않음
      return;
    }
    startedRef.current = true;

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
        const data = JSON.parse(event.data) as
          | ChatMessage
          | { type: "assistant_chunk"; delta: string }
          | { type: "assistant_done"; id: string }
          | { type: string; [k: string]: any };

        // 최종 메시지(서버가 브로드캐스트한 user/assistant 형태)
        if ("role" in (data as ChatMessage) && "content" in (data as ChatMessage)) {
          const msg = data as ChatMessage;
          if (seenIdsRef.current.has(msg.id)) return;
          seenIdsRef.current.add(msg.id);
          setMessages((prev) => (prev.some((p) => p.id === msg.id) ? prev : [...prev, msg]));
          return;
        }

        // 스트리밍 청크
        if ((data as any).type === "assistant_chunk") {
          const delta = (data as any).delta as string;
          setMessages((prev) => {
            // 이미 진행 중인 임시 메시지가 있으면 내용만 누적
            const tempId = streamingRef.current.tempId ?? `cm_streaming_${Date.now()}`;
            streamingRef.current.tempId = tempId;
            const last = prev[prev.length - 1];
            if (last && last.id === tempId) {
              const updated = { ...last, content: last.content + delta };
              return [...prev.slice(0, -1), updated];
            }
            // 없으면 새 임시 메시지 생성
            const draft: ChatMessage = {
              id: tempId,
              role: "assistant",
              content: delta,
              createdAt: new Date().toISOString(),
            };
            return [...prev, draft];
          });
          return;
        }

        // 스트리밍 완료 → 임시 id를 최종 id로 교체
        if ((data as any).type === "assistant_done") {
          const finalId = (data as any).id as string;
          setMessages((prev) => {
            const tempId = streamingRef.current.tempId;
            streamingRef.current.tempId = null;
            // 이미 최종 메시지가 먼저 도착한 경우(브로드캐스트 선도착)
            const finalIdx = prev.findIndex((m) => m.id === finalId);
            if (!tempId) {
              // 임시가 없고 최종만 있으면 그대로 유지
              return prev;
            }
            const tempIdx = prev.findIndex((m) => m.id === tempId);
            if (tempIdx === -1) {
              return prev;
            }
            const next = [...prev];
            if (finalIdx !== -1) {
              // 최종이 이미 있음 → 임시를 제거
              next.splice(tempIdx, 1);
              return next;
            }
            // 최종이 아직 없음 → 임시 id를 최종 id로 교체
            next[tempIdx] = { ...next[tempIdx], id: finalId };
            seenIdsRef.current.add(finalId);
            return next;
          });
          return;
        }
      } catch {
        // ignore parse error
      }
    };

    return () => {
      ws.close();
      socketRef.current = null;
      startedRef.current = false;
    };
  }, [accessToken, options?.roomId]);

  const sendJson = React.useCallback((payload: unknown) => {
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) return;
    socketRef.current.send(JSON.stringify(payload));
  }, []);

  return { isConnected, messages, sendJson };
}
