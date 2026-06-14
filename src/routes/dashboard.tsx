import { createFileRoute, Outlet, Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Home, Sparkles, User, LogOut, Menu, X } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { clearAuthUser } from "@/lib/auth";
import { api } from "@/lib/api";
import { BRAND, waLink } from "@/data/content";
import { cn } from "@/lib/utils";
import type { User as UserType } from "@/lib/types";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Home", icon: Home, exact: true },
  { to: "/dashboard/patch", label: "My Patch", icon: Sparkles, exact: false },
  { to: "/dashboard/profile", label: "Profile", icon: User, exact: false },
] as const;

export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
});

function DashboardLayout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Dashboard is always light mode — the dark sidebar is part of its own design system
  // (dashboard-sidebar / dashboard-area classes), not the landing page dark/light toggle.
  // We restore the previous preference when the user navigates back to the landing page.
  useEffect(() => {
    const prev = document.documentElement.getAttribute("data-mode");
    document.documentElement.setAttribute("data-mode", "light");
    return () => {
      if (prev === null) document.documentElement.removeAttribute("data-mode");
      else document.documentElement.setAttribute("data-mode", prev);
    };
  }, []);

  const { data: user, isLoading, isError } = useQuery({
    queryKey: ["me"],
    queryFn: () => api.get<UserType>("/me"),
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (isError) navigate({ to: "/login", replace: true });
  }, [isError, navigate]);

  const handleLogout = async () => {
    try { await api.post("/auth/logout"); } catch { /* ignore */ }
    clearAuthUser();
    queryClient.clear();
    window.location.href = "/";
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-brass border-t-transparent" />
      </div>
    );
  }

  if (!user) return null;

  const initial = (user.name?.[0] ?? user.phone?.[0] ?? "U").toUpperCase();
  const displayName = user.name || `+91 ${user.phone}`;

  return (
    <div className="flex h-screen overflow-hidden">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          "dashboard-sidebar fixed inset-y-0 left-0 z-30 flex w-56 shrink-0 flex-col transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-5">
          <Link to="/" className="font-display text-lg font-semibold text-cream">
            {BRAND.name.replace("House", "")}
            <span className="text-brass">House</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-cream/60 hover:bg-white/5 hover:text-cream lg:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-0.5 px-3 py-3">
          {NAV_ITEMS.map((item) => (
            <SidebarNavItem key={item.to} {...item} onNavigate={() => setSidebarOpen(false)} />
          ))}
        </nav>

        {/* WhatsApp CTA */}
        <div className="px-3 pb-3">
          <a
            href={waLink()}
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-400"
          >
            Connect on
            <svg viewBox="0 0 16 16" fill="currentColor" className="h-5 w-5 shrink-0" aria-hidden="true">
              <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
            </svg>
          </a>
        </div>

        {/* User footer */}
        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brass text-sm font-bold text-ink">
              {initial}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-cream">{displayName}</p>
              <p className="truncate text-xs text-cream/50">+91 {user.phone}</p>
            </div>
            <button
              onClick={handleLogout}
              aria-label="Log out"
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-cream/50 transition hover:bg-white/5 hover:text-cream"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="dashboard-area flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Mobile top bar */}
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border px-5 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-foreground transition hover:bg-foreground/8"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Link to="/" className="font-display text-lg font-semibold text-foreground">
            {BRAND.name.replace("House", "")}
            <span className="text-brass">House</span>
          </Link>
        </header>

        <main className="flex-1 overflow-y-auto p-6 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function SidebarNavItem({
  to,
  label,
  icon: Icon,
  exact,
  onNavigate,
}: {
  to: string;
  label: string;
  icon: React.ElementType;
  exact: boolean;
  onNavigate: () => void;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const active = exact ? pathname === to : pathname.startsWith(to);

  return (
    <Link
      to={to}
      onClick={onNavigate}
      className={cn(
        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
        active ? "bg-white/10 text-cream" : "text-cream/60 hover:bg-white/5 hover:text-cream",
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {label}
    </Link>
  );
}
