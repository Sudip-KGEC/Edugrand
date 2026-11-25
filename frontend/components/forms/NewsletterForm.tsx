"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { subscribeNewsletter } from "@/services/inquiry.service";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("loading");
    try {
      await subscribeNewsletter(email);
      setStatus("success");
      setMessage("You are in! We will email you new scholarships and deadlines.");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Could not subscribe, please try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md" noValidate>
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="flex gap-2 rounded-full bg-white p-1.5 ring-1 ring-white/20">
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
          autoComplete="email"
          className="min-w-0 flex-1 rounded-full bg-transparent px-4 text-sm text-ink outline-none placeholder:text-muted/70"
        />
        <Button type="submit" disabled={status === "loading"} className="px-5">
          {status === "loading" ? "Joining" : "Get alerts"}
          <ArrowRight className="size-4" />
        </Button>
      </div>
      <p role="status" aria-live="polite" className={`mt-3 min-h-5 text-sm ${status === "error" ? "text-red-300" : "text-white/80"}`}>
        {status === "success" || status === "error" ? message : ""}
      </p>
    </form>
  );
}
