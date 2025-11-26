export type ChatRole = "user" | "assistant" | "system";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: string;
};

export type GetChatHistoryQuery = {
  cursorId?: string | null;
  size?: number;
};

export type GetChatHistoryResponse = {
  items: ChatMessage[];
  nextCursor: string | null;
};

export type PostChatMessageBody = {
  content: string;
  meta?: Record<string, unknown>;
};

export type PostChatMessageResponse = {
  id: string;
  status: "queued" | "processing" | "done";
};
