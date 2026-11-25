
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
    this.name = "ApiRequestError";
    this.status = status;
  }
}

export async function apiFetch<T>(
  path: string,
  {
    method = "GET",
    body,
    revalidate,
    signal,
  }: Options = {}
): Promise<T> {
  if (!SITE.apiUrl) {
    throw new Error("Backend API URL is missing");
  }

  const baseUrl = SITE.apiUrl.replace(/\/+$/, "");
  const url = `${baseUrl}${path}`;

  const response = await fetch(url, {
    method,
    signal,
    headers: body !== undefined
      ? { "Content-Type": "application/json" }
      : undefined,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    ...(method === "GET" && revalidate !== undefined
      ? { next: { revalidate } }
      : {}),
  });

  const json = await response.json().catch(() => null);

  if (!response.ok || !json?.success) {
    throw new ApiRequestError(
      json?.message || json?.error || "Something went wrong",
      response.status
    );
  }

  return (json.data ?? json) as T;
}
