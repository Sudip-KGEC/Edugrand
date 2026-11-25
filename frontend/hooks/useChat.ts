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

const DEFAULT_SUGGESTIONS = ["Closing soon", "Undergraduate scholarships", "Scholarships for women", "How do I apply?"];

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [suggestions, setSuggestions] = useState<string[]>(DEFAULT_SUGGESTIONS);
  const [loading, setLoading] = useState(false);
  const counter = useRef(1);
  const turns = useRef<ChatTurn[]>([]);
  const controller = useRef<AbortController | null>(null);

  const send = useCallback(async (raw: string) => {
    const text = raw.trim();
    if (!text) return;
    controller.current?.abort();
    controller.current = new AbortController();

    const history = turns.current.slice(-8);
    const userMessage: ChatMessage = { id: counter.current++, role: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const data = await askChatbot(text, history, controller.current.signal);
      setMessages((prev) => [
        ...prev,
        { id: counter.current++, role: "bot", text: data.reply, scholarships: data.scholarships },
      ]);
      turns.current = [...history, { role: "user" as const, text }, { role: "bot" as const, text: data.reply }].map((turn) => ({
        ...turn,
        text: turn.text.slice(0, 600),
      }));
      if (data.suggestions?.length) setSuggestions(data.suggestions);
    } catch (error) {
      if ((error as Error).name === "AbortError") return;
      setMessages((prev) => [
        ...prev,
        {
          id: counter.current++,
          role: "bot",
          text: error instanceof Error ? error.message : "Sorry, I could not reach the server. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { messages, suggestions, loading, send };
}