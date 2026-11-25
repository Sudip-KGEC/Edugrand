
const BASE_URL = (
  import.meta.env.VITE_BACKEND_API_URL
).replace(/\/$/, "");

const TOKEN_KEY = "edugrand_admin_token";

export const tokenStore = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

let onUnauthorized: () => void = () => undefined;

export const setUnauthorizedHandler = (handler: () => void) => {
  onUnauthorized = handler;
};

export class ApiError extends Error {
  status: number;
  details?: { field: string; message: string }[];

  constructor(
    message: string,
    status: number,
    details?: { field: string; message: string }[]
  ) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

export async function api<T>(
  path: string,
  options: { method?: string; body?: unknown } = {}
): Promise<T> {
  const token = tokenStore.get();

  let response: Response;

  try {
    response = await fetch(`${BASE_URL}${path}`, {
      method: options.method ?? "GET",
      headers: {
        ...(options.body !== undefined
          ? { "Content-Type": "application/json" }
          : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body:
        options.body !== undefined
          ? JSON.stringify(options.body)
          : undefined,
    });
  } catch {
    throw new ApiError(
      "Cannot reach the server. Check your connection.",
      0
    );
  }

  const json = await response.json().catch(() => null);

  if (response.status === 401 && token) {
    onUnauthorized();
  }

  if (!response.ok || !json?.success) {
    throw new ApiError(
      json?.message ?? "Request failed",
      response.status,
      json?.details
    );
  }

  return json.data as T;
}

export const toQuery = (
  params: Record<string, string | number | undefined>
) => {
  const search = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      search.set(key, String(value));
    }
  });

  const query = search.toString();

  return query ? `?${query}` : "";
};
