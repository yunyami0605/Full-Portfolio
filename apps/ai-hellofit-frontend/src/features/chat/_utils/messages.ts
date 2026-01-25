import type { ChatMessage, GetChatHistoryResponse } from "@/features/chat/_types/chat";

/**
 * 서버는 최신순(내림차순)으로 페이지를 내려줌.
 * UI는 오래된→최신(오름차순)으로 보여야 하므로 페이지/아이템을 뒤집어 평탄화한다.
 */
export function buildHistoryMessages(pages: GetChatHistoryResponse[] | undefined): ChatMessage[] {
  const ps = pages ?? [];
  const orderedPages = [...ps].reverse();
  const flat: ChatMessage[] = [];
  for (const p of orderedPages) {
    flat.push(...[...p.items].reverse());
  }
  return flat;
}

/**
 * history(오래된→최신) + realtime(도착순)을 합치고 id 기준으로 중복 제거한다.
 * 마지막(가장 최신) 값을 우선해 realtime이 history를 덮어쓰는 효과를 준다.
 */
export function mergeMessages(history: ChatMessage[], realtime: ChatMessage[]): ChatMessage[] {
  const combined = [...history, ...realtime];
  const seen = new Set<string>();
  const outRev: ChatMessage[] = [];
  for (let i = combined.length - 1; i >= 0; i--) {
    const m = combined[i];
    if (seen.has(m.id)) continue;
    seen.add(m.id);
    outRev.push(m);
  }
  return outRev.reverse();
}

