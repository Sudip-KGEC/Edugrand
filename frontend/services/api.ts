import { SITE } from "@/constants/site";

type Options = {
  method?: string;
  body?: unknown;
  revalidate?: number;
  signal?: AbortSignal;
};

export class ApiRequestError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export async function apiFetch<T>(path: string, { method = "GET", body, revalidate, signal }: Options = {}): Promise<T> {
  const response = await fetch(`${SITE.apiUrl}${path}`, {
    method,
    signal,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
    ...(method === "GET" && revalidate !== undefined ? { next: { revalidate } } : {}),
  });
  const json = await response.json().catch(() => null);
  if (!response.ok || !json?.success) {
    throw new ApiRequestError(json?.message ?? "Something went wrong", response.status);
  }
  return (json.data ?? json) as T;
}
