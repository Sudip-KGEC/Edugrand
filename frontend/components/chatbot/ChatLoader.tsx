"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ChatWidget = dynamic(() => import("./ChatWidget").then((mod) => mod.ChatWidget), { ssr: false });

export function ChatLoader() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const start = () => setReady(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 4000 });
      return () => window.cancelIdleCallback(id);
    }
    const timer = setTimeout(start, 2500);
    return () => clearTimeout(timer);
  }, []);

  return ready ? <ChatWidget /> : null;
}
