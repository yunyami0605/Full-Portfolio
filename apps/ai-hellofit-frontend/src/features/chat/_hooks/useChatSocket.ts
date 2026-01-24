import React from "react";
import { apiCall } from "@/libs/apiCall";
import { ChatMessage } from "../_types/chat";

/**
 *@description [Hook] 채팅 소켓 연결
 * @param options - 채팅 소켓 옵션
 * @returns {boolean} isConnected - 채팅 소켓 연결 상태
 * @returns {ChatMessage[]} messages - 채팅 메시지 목록
 * @returns {Function} sendJson - 채팅 메시지 전송 함수
 */
export function useChatSocket() {
  // 채팅 소켓 연결 상태
  const [isConnected, setIsConnected] = React.useState(false);
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  // assistant 응답 스트리밍/생성 중이면 전송 잠금
  const [isAwaitingAssistant, _setIsAwaitingAssistant] = React.useState(false);
  const esRef = React.useRef<EventSource | null>(null);
  const streamingRef = React.useRef<{ tempId: string | null }>({ tempId: null });
  // 중복 id 방지
  const seenIdsRef = React.useRef<Set<string>>(new Set());
  const awaitingRef = React.useRef(false);

  const setIsAwaitingAssistant = React.useCallback((next: boolean) => {
    awaitingRef.current = next;
    _setIsAwaitingAssistant(next);
  }, []);

  React.useEffect(() => {
    const connect = () => {
      const base = process.env.NEXT_PUBLIC_CHAT_WS_URL;

      // 슬래시로 시작하면 base의 경로(/api)가 날아가므로 상대경로로 지정
      const url = new URL("/api/chat/stream", base);
      // roomId는 SSE에서는 사용하지 않음(단일 사용자 스트림)

      const es = new EventSource(url.toString(), { withCredentials: true });
      esRef.current = es;

      es.onopen = () => {
        setIsConnected(true);
      };

      es.onerror = () => {
        setIsConnected(false);
        setIsAwaitingAssistant(false);
      };

      es.onmessage = (event: MessageEvent) => {
        try {
          const data = JSON.parse(event.data) as
            | ChatMessage
            | { type: "assistant_chunk"; delta: string }
            | { type: "assistant_done"; id: string }
            | { type: string; [k: string]: any };

          // 서버 connected 신호
          if ((data as any).type === "connected") {
            return;
          }

          // 최종 메시지(서버가 브로드캐스트한 user/assistant 형태)
          if ("role" in (data as ChatMessage) && "content" in (data as ChatMessage)) {
            const msg = data as ChatMessage;
            if (seenIdsRef.current.has(msg.id)) return;
            seenIdsRef.current.add(msg.id);
            setMessages((prev) => (prev.some((p) => p.id === msg.id) ? prev : [...prev, msg]));

            // 스트리밍(done) 없이 최종 assistant 메시지만 오는 케이스 대비
            if (msg.role === "assistant" && awaitingRef.current && !streamingRef.current.tempId) {
              setIsAwaitingAssistant(false);
            }
            return;
          }

          // 스트리밍 청크
          if ((data as any).type === "assistant_chunk") {
            const delta = (data as any).delta as string;

            // 스트리밍이 시작되면 전송 잠금
            if (!awaitingRef.current) setIsAwaitingAssistant(true);
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

            // assistant 응답 완료 → 전송 잠금 해제
            setIsAwaitingAssistant(false);
            return;
          }
        } catch {
          // ignore parse error
        }
      };
    };

    connect();

    return () => {
      if (esRef.current) {
        esRef.current.close();
      }
      esRef.current = null;
      seenIdsRef.current.clear();
      streamingRef.current.tempId = null;
      setIsAwaitingAssistant(false);
      setIsConnected(false);
    };
  }, []);

  const sendJson = React.useCallback(async (payload: any) => {
    // 지원: { type: "user_message", content: string }
    if (!payload || payload.type !== "user_message" || !payload.content) return;
    // assistant 응답이 끝나기 전에는 추가 전송 방지
    if (awaitingRef.current) return;
    setIsAwaitingAssistant(true);
    try {
      await apiCall.post("/chat/message", { content: payload.content });
    } catch (e) {
      setIsAwaitingAssistant(false);
      throw e;
    }
  }, []);

  return { isConnected, isAwaitingAssistant, messages, sendJson };
}
