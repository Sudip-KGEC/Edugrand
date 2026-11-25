"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUp, Bot, MessageCircle, X } from "lucide-react";
import { useChat } from "@/hooks/useChat";
import { deadlineLabel } from "@/lib/format";
import { cn } from "@/lib/utils";

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, suggestions, loading, send } = useChat();
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) =>
      event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  async function submit(event: React.FormEvent) {
  event.preventDefault();

  const message = input.trim();

  if (!message || loading) return;

  setInput("");
  await send(message);
}

  return (
    <div className="fixed bottom-5 right-5 z-50 sm:bottom-6 sm:right-6">
      {open ? (
        <section
          role="dialog"
          aria-label="Scholarship assistant"
          className="mb-4 flex h-[min(34rem,calc(100dvh-7rem))] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-3xl bg-white shadow-lift ring-1 ring-line"
        >
          <header className="bg-dark flex items-center justify-between px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-brand-gradient">
                <Bot className="size-5" />
              </span>
              <div>
                <p className="font-display text-sm font-bold">
                  Scholarship assistant
                </p>
                <p className="flex items-center gap-1.5 text-xs text-white/70">
                  <span className="size-1.5 rounded-full bg-emerald-400" />{" "}
                  Online
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="grid size-8 place-items-center rounded-full hover:bg-white/10"
            >
              <X className="size-4" />
            </button>
          </header>

          <div
            className="flex-1 space-y-4 overflow-y-auto bg-mist px-4 py-4"
            aria-live="polite"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex flex-col gap-2",
                  message.role === "user" ? "items-end" : "items-start",
                )}
              >
                <p
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                    message.role === "user"
                      ? "rounded-br-md bg-brand-gradient text-white"
                      : "rounded-bl-md bg-white text-ink ring-1 ring-line",
                  )}
                >
                  {message.text}
                </p>
                {message.scholarships?.map((item) => (
                  <Link
                    key={item._id}
                    href={`/scholarships/${item.slug}`}
                    onClick={() => setOpen(false)}
                    className="block w-[85%] rounded-2xl bg-white p-3.5 ring-1 ring-line transition hover:ring-brand"
                  >
                    <p className="line-clamp-2 text-sm font-semibold text-ink">
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm font-bold text-brand">
                      {item.amountLabel}
                    </p>
                    <p className="mt-1 text-xs text-muted">
                      {item.level} · {item.country} ·{" "}
                      {deadlineLabel(item.deadline)}
                    </p>
                  </Link>
                ))}
              </div>
            ))}
            {loading ? (
              <div
                className="flex w-16 gap-1.5 rounded-2xl rounded-bl-md bg-white px-4 py-3.5 ring-1 ring-line"
                aria-label="Assistant is typing"
              >
                {[0, 1, 2].map((dot) => (
                  <span
                    key={dot}
                    className="size-2 animate-bounce rounded-full bg-brand"
                    style={{ animationDelay: `${dot * 120}ms` }}
                  />
                ))}
              </div>
            ) : null}
            <div ref={endRef} />
          </div>

          <div className="border-t border-line bg-white p-3">
            <ul className="mb-3 flex gap-2 overflow-x-auto pb-1">
              {suggestions.map((suggestion) => (
                <li key={suggestion} className="shrink-0">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => send(suggestion)}
                    className="rounded-full bg-brand-soft px-3 py-1.5 text-xs font-semibold text-brand-dark transition hover:bg-brand hover:text-white disabled:opacity-60"
                  >
                    {suggestion}
                  </button>
                </li>
              ))}
            </ul>
            <form onSubmit={submit} className="flex items-center gap-2">
              <label htmlFor="chat-input" className="sr-only">
                Type your question
              </label>
              <input
                ref={inputRef}
                id="chat-input"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                maxLength={300}
                placeholder="Ask about scholarships"
                autoComplete="off"
                className="h-11 min-w-0 flex-1 rounded-full bg-mist px-4 text-sm outline-none ring-1 ring-line focus:ring-2 focus:ring-brand"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className="grid size-11 shrink-0 place-items-center rounded-full bg-brand-gradient text-white shadow-glow transition disabled:opacity-50"
              >
                <ArrowUp className="size-5" />
              </button>
            </form>
            <p className="mt-2 px-1 text-center text-[11px] leading-snug text-muted">
              AI replies can be wrong. Confirm details on the official site. Do
              not share personal data.
            </p>
          </div>
        </section>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={
          open ? "Close scholarship assistant" : "Open scholarship assistant"
        }
        className="ml-auto grid size-14 place-items-center rounded-full bg-brand-gradient text-white shadow-glow transition hover:scale-105"
      >
        {open ? <X className="size-6" /> : <MessageCircle className="size-6" />}
      </button>
    </div>
  );
}
