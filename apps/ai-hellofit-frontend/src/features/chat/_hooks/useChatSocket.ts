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
  // 채팅 소켓 연결 상태
  const [isConnected, setIsConnected] = React.useState(false);
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const socketRef = React.useRef<WebSocket | null>(null);
  const streamingRef = React.useRef<{ tempId: string | null }>({ tempId: null });
  // StrictMode 이중 마운트로 인한 중복 연결 방지
  const startedRef = React.useRef(false);
  // 중복 id 레이스 방지
  const seenIdsRef = React.useRef<Set<string>>(new Set());
  // 재연결/백오프
  const reconnectTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const attemptRef = React.useRef<number>(0);
  // Heartbeat
  const heartbeatTimerRef = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const lastActivityRef = React.useRef<number>(Date.now());
  const IDLE_TIMEOUT_MS = 90_000; // 일정 시간 활동 없으면 재연결 시도
  const HEARTBEAT_INTERVAL_MS = 30_000; // 주기적으로 앱 레벨 ping 전송

  React.useEffect(() => {
    // 쿠키 기반 세션 가정: 토큰 없이도 핸드셰이크에서 인증
    if (startedRef.current) {
      return;
    }
    startedRef.current = true;

    const connect = () => {
      // 기존 타이머 초기화
      if (reconnectTimerRef.current) {
        clearTimeout(reconnectTimerRef.current);
        reconnectTimerRef.current = null;
      }

      const base =
        process.env.NEXT_PUBLIC_CHAT_WS_URL ||
        (typeof window !== "undefined" && window.location.origin.replace(/^http/, "ws")) ||
        "ws://localhost:8084";

      const url = new URL("/api/ws/chat", base);
      // roomId는 계속 쿼리로 전달 (서버에서 handshake attr 매핑 가정)
      if (options?.roomId) url.searchParams.set("roomId", options.roomId);

      const ws = new WebSocket(url.toString());
      socketRef.current = ws;

      ws.onopen = () => {
        setIsConnected(true);
        attemptRef.current = 0; // 성공 시 백오프 초기화
        lastActivityRef.current = Date.now();
        // Heartbeat 시작
        if (heartbeatTimerRef.current) {
          clearInterval(heartbeatTimerRef.current);
        }
        heartbeatTimerRef.current = setInterval(() => {
          // 앱 레벨 ping: 서버는 typing을 no-op으로 처리하므로 keep-alive 용도로 사용
          sendJson({ type: "typing", value: true });
          // 유휴 연결 감지
          if (Date.now() - lastActivityRef.current > IDLE_TIMEOUT_MS) {
            try {
              ws.close();
            } catch {}
          }
        }, HEARTBEAT_INTERVAL_MS);
      };

      ws.onclose = () => {
        setIsConnected(false);
        // Heartbeat 종료
        if (heartbeatTimerRef.current) {
          clearInterval(heartbeatTimerRef.current);
          heartbeatTimerRef.current = null;
        }
        // 재연결 스케줄
        scheduleReconnect();
      };
      ws.onerror = () => {
        setIsConnected(false);
        // 오류 즉시 닫고 재연결
        try {
          ws.close();
        } catch {}
      };
      ws.onmessage = (event: MessageEvent) => {
        lastActivityRef.current = Date.now();
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
    };

    const scheduleReconnect = () => {
      // 이미 스케줄된 경우 무시
      if (reconnectTimerRef.current) return;
      const attempt = attemptRef.current + 1;
      attemptRef.current = attempt;
      // 지수 백오프 + 지터 (0.5~1.5배)
      const baseDelay = Math.min(20_000, 500 * Math.pow(2, attempt - 1));
      const jitter = baseDelay * (0.5 + Math.random());
      reconnectTimerRef.current = setTimeout(() => {
        reconnectTimerRef.current = null;
        connect();
      }, jitter);
    };

    connect();

    return () => {
      if (reconnectTimerRef.current) {
        clearTimeout(reconnectTimerRef.current);
        reconnectTimerRef.current = null;
      }
      if (heartbeatTimerRef.current) {
        clearInterval(heartbeatTimerRef.current);
        heartbeatTimerRef.current = null;
      }
      try {
        socketRef.current?.close();
      } catch {}
      socketRef.current = null;
      startedRef.current = false;
      seenIdsRef.current.clear();
      streamingRef.current.tempId = null;
      setIsConnected(false);
    };
  }, [options?.roomId]);

  const sendJson = React.useCallback((payload: unknown) => {
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) return;
    socketRef.current.send(JSON.stringify(payload));
  }, []);

  return { isConnected, messages, sendJson };
}
