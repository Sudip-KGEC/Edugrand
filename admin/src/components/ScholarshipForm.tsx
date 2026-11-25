import { useState } from "react";
import { ApiError } from "../lib/api";
import { toDateInput } from "../lib/format";
import { CATEGORIES, LEVELS, STATUSES } from "../constants";
import type { Scholarship } from "../types";

type FormState = {
  title: string;
  provider: string;
  summary: string;
  description: string;
  eligibility: string;
  benefits: string;
  documents: string;
  amount: string;
  amountLabel: string;
  level: string;
  category: string;
  country: string;
  deadline: string;
  applyUrl: string;
  featured: boolean;
  status: string;
};

const lines = (value: string) =>
  value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

function initial(item?: Scholarship): FormState {
  return {
    title: item?.title ?? "",
    provider: item?.provider ?? "",
    summary: item?.summary ?? "",
    description: item?.description ?? "",
    eligibility: item?.eligibility.join("\n") ?? "",
    benefits: item?.benefits.join("\n") ?? "",
    documents: item?.documents.join("\n") ?? "",
    amount: String(item?.amount ?? ""),
    amountLabel: item?.amountLabel ?? "",
    level: item?.level ?? LEVELS[2],
    category: item?.category ?? CATEGORIES[0],
    country: item?.country ?? "India",
    deadline: item ? toDateInput(item.deadline) : "",
    applyUrl: item?.applyUrl ?? "",
    featured: item?.featured ?? false,
    status: item?.status ?? "active",
  };
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold">{label}</span>
      {children}
      {hint ? <span className="mt-1 block text-xs text-muted">{hint}</span> : null}
    </label>
  );
}

export function ScholarshipForm({
  item,
  onSubmit,
  onCancel,
}: {
  item?: Scholarship;
  onSubmit: (payload: Record<string, unknown>) => Promise<void>;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<FormState>(() => initial(item));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((prev) => ({ ...prev, [key]: value }));

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      await onSubmit({
        title: form.title,
        provider: form.provider,
        summary: form.summary,
        description: form.description,
        eligibility: lines(form.eligibility),
        benefits: lines(form.benefits),
        documents: lines(form.documents),
        amount: Number(form.amount),
        amountLabel: form.amountLabel,
        level: form.level,
        category: form.category,
        country: form.country,
        deadline: form.deadline,
        applyUrl: form.applyUrl,
        featured: form.featured,
        status: form.status,
      });
    } catch (err) {
      if (err instanceof ApiError && err.details?.length) {
        setError(err.details.map((detail) => `${detail.field}: ${detail.message}`).join(" · "));
      } else {
        setError(err instanceof Error ? err.message : "Could not save");
      }
      setSaving(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Title">
          <input className="field" required minLength={5} value={form.title} onChange={(e) => set("title", e.target.value)} />
        </Field>
        <Field label="Provider">
          <input className="field" required value={form.provider} onChange={(e) => set("provider", e.target.value)} />
        </Field>
      </div>
      <Field label="Short summary" hint="Shown on cards and search results (20 to 300 characters)">
        <textarea className="field" required minLength={20} maxLength={300} rows={2} value={form.summary} onChange={(e) => set("summary", e.target.value)} />
      </Field>
      <Field label="Full description" hint="Use a new line for a new paragraph">
        <textarea className="field" required minLength={50} rows={5} value={form.description} onChange={(e) => set("description", e.target.value)} />
      </Field>
      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Eligibility" hint="One item per line">
          <textarea className="field" rows={5} value={form.eligibility} onChange={(e) => set("eligibility", e.target.value)} />
        </Field>
        <Field label="Benefits" hint="One item per line">
          <textarea className="field" rows={5} value={form.benefits} onChange={(e) => set("benefits", e.target.value)} />
        </Field>
        <Field label="Documents" hint="One item per line">
          <textarea className="field" rows={5} value={form.documents} onChange={(e) => set("documents", e.target.value)} />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Amount (number)" hint="Used for sorting">
          <input className="field" type="number" min={0} required value={form.amount} onChange={(e) => set("amount", e.target.value)} />
        </Field>
        <Field label="Amount label" hint="For example ₹50,000 / year">
          <input className="field" required value={form.amountLabel} onChange={(e) => set("amountLabel", e.target.value)} />
        </Field>
        <Field label="Deadline">
          <input className="field" type="date" required value={form.deadline} onChange={(e) => set("deadline", e.target.value)} />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-4">
        <Field label="Level">
          <select className="field" value={form.level} onChange={(e) => set("level", e.target.value)}>
            {LEVELS.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </Field>
        <Field label="Category">
          <select className="field" value={form.category} onChange={(e) => set("category", e.target.value)}>
            {CATEGORIES.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </Field>
        <Field label="Country">
          <input className="field" required value={form.country} onChange={(e) => set("country", e.target.value)} />
        </Field>
        <Field label="Status">
          <select className="field" value={form.status} onChange={(e) => set("status", e.target.value)}>
            {STATUSES.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="Official application URL">
        <input className="field" type="url" required placeholder="https://" value={form.applyUrl} onChange={(e) => set("applyUrl", e.target.value)} />
      </Field>
      <label className="flex items-center gap-3 text-sm font-semibold">
        <input type="checkbox" className="size-4 accent-[#ff6a00]" checked={form.featured} onChange={(e) => set("featured", e.target.checked)} />
        Show on the home page as featured
      </label>

      {error ? (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </p>
      ) : null}

      <div className="flex justify-end gap-3 border-t border-line pt-5">
        <button type="button" className="btn btn-outline" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? "Saving" : item ? "Save changes" : "Create scholarship"}
        </button>
      </div>
    </form>
  );
}
