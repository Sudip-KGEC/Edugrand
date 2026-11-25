"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { sendContact } from "@/services/inquiry.service";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "loading" | "success" | "error";

const fieldClass =
  "w-full rounded-2xl border-0 bg-white px-4 py-3 text-base text-ink ring-1 ring-line outline-none transition placeholder:text-muted/60 focus:ring-2 focus:ring-brand";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("loading");
    try {
      await sendContact({
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        message: String(data.get("message") ?? ""),
        website: String(data.get("website") ?? ""),
      });
      setStatus("success");
      setMessage("Thank you! Your message has been sent and we will reply soon.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Could not send your message, please try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-3xl bg-mist p-6 ring-1 ring-line sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-semibold">Full name</label>
          <input id="name" name="name" required minLength={2} maxLength={80} autoComplete="name" className={fieldClass} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-semibold">Email</label>
          <input id="email" name="email" type="email" required autoComplete="email" className={fieldClass} placeholder="you@example.com" />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-semibold">How can we help?</label>
        <textarea id="message" name="message" required minLength={10} maxLength={2000} rows={6} className={fieldClass} placeholder="Tell us a little about your question" />
      </div>
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <Button type="submit" size="lg" disabled={status === "loading"}>
        {status === "loading" ? "Sending" : "Send message"}
        <Send className="size-4" />
      </Button>
      <p role="status" aria-live="polite" className={`min-h-5 text-sm font-medium ${status === "error" ? "text-red-600" : "text-brand-dark"}`}>
        {status === "success" || status === "error" ? message : ""}
      </p>
    </form>
  );
}
