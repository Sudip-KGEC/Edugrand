import type { ChatReply } from "@/types";
import { apiFetch } from "./api";

export const askChatbot = (message: string, signal?: AbortSignal) =>
  apiFetch<ChatReply>("/chat", { method: "POST", body: { message }, signal });
