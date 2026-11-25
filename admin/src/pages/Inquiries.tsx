import { useCallback, useEffect, useState } from "react";
import { Check, Trash2 } from "lucide-react";
import { api, toQuery } from "../lib/api";
import { formatDate } from "../lib/format";
import type { Inquiry, Paginated } from "../types";

const tabs = [
  { label: "Messages", value: "contact" },
  { label: "Subscribers", value: "newsletter" },
] as const;

export function Inquiries() {
  const [type, setType] = useState<"contact" | "newsletter">("contact");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<Paginated<Inquiry> | null>(null);
  const [error, setError] = useState("");

  const load = useCallback(() => {
    api<Paginated<Inquiry>>(`/admin/inquiries${toQuery({ type, page, limit: 15 })}`)
      .then((result) => {
        setData(result);
        setError("");
      })
      .catch((err: Error) => setError(err.message));
  }, [type, page]);

  useEffect(load, [load]);

  async function markRead(item: Inquiry) {
    await api(`/admin/inquiries/${item._id}`, { method: "PATCH", body: { status: "read" } }).catch((err: Error) => setError(err.message));
    load();
  }

  async function remove(item: Inquiry) {
    if (!window.confirm("Delete this entry?")) return;
    await api(`/admin/inquiries/${item._id}`, { method: "DELETE" }).catch((err: Error) => setError(err.message));
    load();
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-extrabold">Inquiries</h1>
        <p className="mt-1 text-muted">Messages from the contact form and newsletter sign ups.</p>
      </header>

      <div className="flex gap-2" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={type === tab.value}
            className={`btn ${type === tab.value ? "btn-dark" : "btn-outline"}`}
            onClick={() => {
              setType(tab.value);
              setPage(1);
              setData(null);
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {error ? <p role="alert" className="rounded-2xl bg-red-50 p-4 text-sm font-medium text-red-700">{error}</p> : null}

      <ul className="space-y-3">
        {data?.items.map((item) => (
          <li key={item._id} className="fade-up flex flex-wrap items-start justify-between gap-4 rounded-3xl bg-white p-5 ring-1 ring-line">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-bold">{item.name || item.email}</p>
                {item.status === "new" && item.type === "contact" ? (
                  <span className="bg-brand-gradient rounded-full px-2 py-0.5 text-[11px] font-bold text-white">New</span>
                ) : null}
              </div>
              <a href={`mailto:${item.email}`} className="text-sm text-brand hover:underline">{item.email}</a>
              {item.message ? <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-muted">{item.message}</p> : null}
              <p className="mt-3 text-xs text-muted">{formatDate(item.createdAt)}</p>
            </div>
            <div className="flex gap-2">
              {item.type === "contact" && item.status === "new" ? (
                <button type="button" className="btn btn-outline !p-2.5" aria-label="Mark as read" onClick={() => markRead(item)}>
                  <Check className="size-4" />
                </button>
              ) : null}
              <button type="button" className="btn btn-danger !p-2.5" aria-label="Delete" onClick={() => remove(item)}>
                <Trash2 className="size-4" />
              </button>
            </div>
          </li>
        ))}
        {data && data.items.length === 0 ? <li className="rounded-3xl bg-white p-14 text-center text-muted ring-1 ring-line">Nothing here yet.</li> : null}
        {!data && !error ? <li className="text-muted">Loading</li> : null}
      </ul>

      {data && data.pages > 1 ? (
        <div className="flex items-center justify-between text-sm">
          <p className="text-muted">Page {data.page} of {data.pages}</p>
          <div className="flex gap-2">
            <button type="button" className="btn btn-outline" disabled={page <= 1} onClick={() => setPage((value) => value - 1)}>Previous</button>
            <button type="button" className="btn btn-outline" disabled={page >= data.pages} onClick={() => setPage((value) => value + 1)}>Next</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
