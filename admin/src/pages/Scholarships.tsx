import { useCallback, useEffect, useState } from "react";
import { Pencil, Plus, Search, Star, Trash2 } from "lucide-react";
import { api, toQuery } from "../lib/api";
import { formatDate } from "../lib/format";
import { STATUSES } from "../constants";
import { Modal } from "../components/Modal";
import { ScholarshipForm } from "../components/ScholarshipForm";
import type { Paginated, Scholarship } from "../types";

const statusStyle: Record<string, string> = {
  active: "bg-emerald-50 text-emerald-700",
  draft: "bg-amber-50 text-amber-700",
  closed: "bg-zinc-100 text-zinc-600",
};

export function Scholarships() {
  const [data, setData] = useState<Paginated<Scholarship> | null>(null);
  const [q, setQ] = useState("");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<Scholarship | "new" | null>(null);

  const load = useCallback(() => {
    api<Paginated<Scholarship>>(`/admin/scholarships${toQuery({ q: query, status, page, limit: 10, sort: "latest" })}`)
      .then((result) => {
        setData(result);
        setError("");
      })
      .catch((err: Error) => setError(err.message));
  }, [query, status, page]);

  useEffect(load, [load]);

  async function save(payload: Record<string, unknown>) {
    if (editing && editing !== "new") {
      await api(`/admin/scholarships/${editing._id}`, { method: "PUT", body: payload });
    } else {
      await api("/admin/scholarships", { method: "POST", body: payload });
    }
    setEditing(null);
    load();
  }

  async function remove(item: Scholarship) {
    if (!window.confirm(`Delete "${item.title}"? This cannot be undone.`)) return;
    try {
      await api(`/admin/scholarships/${item._id}`, { method: "DELETE" });
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete");
    }
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold">Scholarships</h1>
          <p className="mt-1 text-muted">{data ? `${data.total} total` : "Loading"}</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={() => setEditing("new")}>
          <Plus className="size-4" /> Add scholarship
        </button>
      </header>

      <form
        className="flex flex-wrap gap-3"
        onSubmit={(event) => {
          event.preventDefault();
          setPage(1);
          setQuery(q);
        }}
      >
        <div className="relative min-w-60 flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <input className="field !pl-10" placeholder="Search by title, provider or country" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search" />
        </div>
        <select
          className="field !w-auto"
          value={status}
          aria-label="Filter by status"
          onChange={(e) => {
            setPage(1);
            setStatus(e.target.value);
          }}
        >
          <option value="">All statuses</option>
          {STATUSES.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        <button type="submit" className="btn btn-dark">Search</button>
      </form>

      {error ? <p role="alert" className="rounded-2xl bg-red-50 p-4 text-sm font-medium text-red-700">{error}</p> : null}

      <div className="overflow-x-auto rounded-3xl bg-white ring-1 ring-line">
        <table className="w-full min-w-[44rem] text-left text-sm">
          <thead className="border-b border-line text-xs uppercase tracking-wider text-muted">
            <tr>
              <th className="px-5 py-4 font-semibold">Scholarship</th>
              <th className="px-5 py-4 font-semibold">Level</th>
              <th className="px-5 py-4 font-semibold">Deadline</th>
              <th className="px-5 py-4 font-semibold">Status</th>
              <th className="px-5 py-4 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {data?.items.map((item) => (
              <tr key={item._id} className="hover:bg-mist/70">
                <td className="px-5 py-4">
                  <p className="flex items-center gap-2 font-semibold">
                    {item.title}
                    {item.featured ? <Star className="size-3.5 fill-brand text-brand" aria-label="Featured" /> : null}
                  </p>
                  <p className="text-xs text-muted">{item.provider} · {item.category}</p>
                </td>
                <td className="px-5 py-4">{item.level}</td>
                <td className="px-5 py-4 whitespace-nowrap">{formatDate(item.deadline)}</td>
                <td className="px-5 py-4">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${statusStyle[item.status]}`}>{item.status}</span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <button type="button" className="btn btn-outline !p-2.5" aria-label={`Edit ${item.title}`} onClick={() => setEditing(item)}>
                      <Pencil className="size-4" />
                    </button>
                    <button type="button" className="btn btn-danger !p-2.5" aria-label={`Delete ${item.title}`} onClick={() => remove(item)}>
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {data && data.items.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-14 text-center text-muted">No scholarships found.</td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      {data && data.pages > 1 ? (
        <div className="flex items-center justify-between text-sm">
          <p className="text-muted">Page {data.page} of {data.pages}</p>
          <div className="flex gap-2">
            <button type="button" className="btn btn-outline" disabled={page <= 1} onClick={() => setPage((value) => value - 1)}>Previous</button>
            <button type="button" className="btn btn-outline" disabled={page >= data.pages} onClick={() => setPage((value) => value + 1)}>Next</button>
          </div>
        </div>
      ) : null}

      {editing ? (
        <Modal title={editing === "new" ? "Add scholarship" : "Edit scholarship"} onClose={() => setEditing(null)}>
          <ScholarshipForm item={editing === "new" ? undefined : editing} onSubmit={save} onCancel={() => setEditing(null)} />
        </Modal>
      ) : null}
    </div>
  );
}
