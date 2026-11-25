import { NavLink, Outlet } from "react-router-dom";
import { GraduationCap, LayoutDashboard, LogOut, MailOpen } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const links = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/scholarships", label: "Scholarships", icon: GraduationCap },
  { to: "/inquiries", label: "Inquiries", icon: MailOpen },
];

export function Layout() {
  const { admin, logout } = useAuth();

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[16rem_minmax(0,1fr)]">
      <aside className="bg-ink text-white lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col">
        <div className="flex items-center justify-between gap-3 px-5 py-4 lg:block lg:px-6 lg:py-7">
          <div className="flex items-center gap-2.5">
            <span className="bg-brand-gradient grid size-9 place-items-center rounded-xl">
              <GraduationCap className="size-5" />
            </span>
            <div>
              <p className="text-lg font-bold leading-none">
                Edu<span className="text-brand">Grand</span>
              </p>
              <p className="mt-1 text-xs text-white/50">Admin panel</p>
            </div>
          </div>
          <div className="lg:hidden">
            <button type="button" onClick={logout} className="btn btn-outline !px-3 !py-2 text-ink" aria-label="Sign out">
              <LogOut className="size-4" />
            </button>
          </div>
        </div>

        <nav aria-label="Admin" className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-1 lg:flex-col lg:px-4 lg:pb-0">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex shrink-0 items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                  isActive ? "bg-brand-gradient text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <Icon className="size-4" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden border-t border-white/10 p-5 lg:block">
          <p className="truncate text-sm font-semibold">{admin?.name}</p>
          <p className="truncate text-xs text-white/50">{admin?.email}</p>
          <button type="button" onClick={logout} className="btn mt-4 w-full bg-white/10 text-white hover:bg-white/20">
            <LogOut className="size-4" /> Sign out
          </button>
        </div>
      </aside>

      <main className="min-w-0 p-5 sm:p-8">
        <Outlet />
      </main>
    </div>
  );
}
