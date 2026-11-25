import type { ChatReply } from "@/types";
import { apiFetch } from "./api";

export type ChatTurn = {
  role: "user" | "bot";
  text: string;
};

export const askChatbot = (
  message: string,
  history: ChatTurn[],
  signal?: AbortSignal,
) =>
  apiFetch<ChatReply>("/chat", {
    method: "POST",
    body: { message, history },
    signal,
  });
