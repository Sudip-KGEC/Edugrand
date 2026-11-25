
"use client";

import { useCallback, useRef, useState } from "react";
import { askChatbot, type ChatTurn } from "@/services/chat.service";
import type { ChatResult } from "@/types";

export type ChatMessage = {
  id: number;
  role: "user" | "bot";
  text: string;
  scholarships?: ChatResult[];
};

const WELCOME: ChatMessage = {
  id: 0,
  role: "bot",
  text: "Hi! I am the EduGrand assistant. Tell me your level, country or category and I will find scholarships for you.",
};

const DEFAULT_SUGGESTIONS = [
  "Closing soon",
  "Undergraduate scholarships",
  "Scholarships for women",
  "How do I apply?",
];

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [suggestions, setSuggestions] = useState<string[]>(DEFAULT_SUGGESTIONS);
  const [loading, setLoading] = useState(false);

  const counter = useRef(1);
  const turns = useRef<ChatTurn[]>([]);
  const controller = useRef<AbortController | null>(null);
  const requestId = useRef(0);

  const send = useCallback(async (raw: string) => {
    const text = raw.trim();

    if (!text || controller.current) return;

    const currentRequest = ++requestId.current;
    const abortController = new AbortController();

    controller.current = abortController;

    const history = turns.current.slice(-8);

    const userMessage: ChatMessage = {
      id: counter.current++,
      role: "user",
      text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const data = await askChatbot(
        text,
        history,
        abortController.signal
      );

      if (currentRequest !== requestId.current) return;

      setMessages((prev) => [
        ...prev,
        {
          id: counter.current++,
          role: "bot",
          text: data.reply,
          scholarships: data.scholarships ?? [],
        },
      ]);

      const updatedHistory: ChatTurn[] = [
  ...history,
  { role: "user", text },
  { role: "bot", text: data.reply },
];

turns.current = updatedHistory.map((turn): ChatTurn => ({
  role: turn.role,
  text: turn.text.slice(0, 600),
}));

      setSuggestions(
        data.suggestions?.length
          ? data.suggestions
          : DEFAULT_SUGGESTIONS
      );

    } catch (error) {
      if (abortController.signal.aborted) return;

      setMessages((prev) => [
        ...prev,
        {
          id: counter.current++,
          role: "bot",
          text:
            error instanceof Error
              ? error.message
              : "Sorry, I could not reach the server. Please try again.",
        },
      ]);
    } finally {
      if (currentRequest === requestId.current) {
        controller.current = null;
        setLoading(false);
      }
    }
  }, []);

  return {
    messages,
    suggestions,
    loading,
    send,
  };
}
