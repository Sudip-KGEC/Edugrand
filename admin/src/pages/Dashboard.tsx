import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarClock, GraduationCap, Inbox, Star, Users } from "lucide-react";
import { api } from "../lib/api";
import { formatDate } from "../lib/format";
import type { Stats } from "../types";

function StatCard({ icon: Icon, label, value, dark }: { icon: typeof Star; label: string; value: number; dark?: boolean }) {
  return (
    <div className={`fade-up rounded-3xl p-6 ${dark ? "bg-ink text-white" : "bg-white ring-1 ring-line"}`}>
      <span className={`grid size-11 place-items-center rounded-2xl ${dark ? "bg-brand-gradient" : "bg-brand-soft text-brand"}`}>
        <Icon className="size-5" />
      </span>
      <p className="mt-5 text-3xl font-extrabold">{value.toLocaleString("en-IN")}</p>
      <p className={`mt-1 text-sm font-medium ${dark ? "text-white/60" : "text-muted"}`}>{label}</p>
    </div>
  );
}

export function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api<Stats>("/admin/stats")
      .then(setStats)
      .catch((err: Error) => setError(err.message));
  }, []);

  if (error) return <p role="alert" className="rounded-2xl bg-red-50 p-5 text-red-700">{error}</p>;
  if (!stats) return <p className="text-muted">Loading dashboard</p>;

  const max = Math.max(1, ...stats.byCategory.map((row) => row.count));

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-extrabold">Dashboard</h1>
        <p className="mt-1 text-muted">A quick look at your scholarship portal.</p>
      </header>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard dark icon={GraduationCap} label="Open scholarships" value={stats.active} />
        <StatCard icon={Star} label="Featured" value={stats.featured} />
        <StatCard icon={CalendarClock} label="Closing in 14 days" value={stats.closingSoon} />
        <StatCard icon={Inbox} label="New messages" value={stats.newInquiries} />
        <StatCard icon={Users} label="Subscribers" value={stats.subscribers} />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-3xl bg-white p-6 ring-1 ring-line">
          <h2 className="text-lg font-bold">Scholarships by category</h2>
          <ul className="mt-5 space-y-4">
            {stats.byCategory.length === 0 ? <li className="text-sm text-muted">No data yet.</li> : null}
            {stats.byCategory.map((row) => (
              <li key={row.category}>
                <div className="mb-1.5 flex justify-between text-sm font-semibold">
                  <span>{row.category}</span>
                  <span>{row.count}</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-brand-soft">
                  <div className="bg-brand-gradient h-full rounded-full" style={{ width: `${(row.count / max) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-3xl bg-white p-6 ring-1 ring-line">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Recently added</h2>
            <Link to="/scholarships" className="text-sm font-semibold text-brand hover:underline">View all</Link>
          </div>
          <ul className="mt-4 divide-y divide-line">
            {stats.recent.length === 0 ? <li className="py-3 text-sm text-muted">Nothing added yet.</li> : null}
            {stats.recent.map((item) => (
              <li key={item._id} className="flex items-center justify-between gap-4 py-3.5">
                <div className="min-w-0">
                  <p className="truncate font-semibold">{item.title}</p>
                  <p className="text-xs text-muted">Deadline {formatDate(item.deadline)}</p>
                </div>
                <span className="rounded-full bg-mist px-2.5 py-1 text-xs font-semibold capitalize">{item.status}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
