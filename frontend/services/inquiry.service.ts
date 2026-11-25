import { apiFetch } from "./api";

export const sendContact = (payload: { name: string; email: string; message: string; website?: string }) =>
  apiFetch<unknown>("/inquiries/contact", { method: "POST", body: payload });

export const subscribeNewsletter = (email: string) =>
  apiFetch<unknown>("/inquiries/newsletter", { method: "POST", body: { email } });
