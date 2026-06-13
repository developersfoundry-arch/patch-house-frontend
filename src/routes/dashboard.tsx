import { createFileRoute, Outlet, Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Home, Sparkles, User, LogOut, Menu, X, MessageCircle } from "lucide-react";
import { isAuthenticated, getAuthUser, clearAuthUser } from "@/lib/auth";
import { BRAND, waLink } from "@/data/content";
import { cn } from "@/lib/utils";
import { ThemeSwitcher } from "@/components/theme-switcher";

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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = getAuthUser();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate({ to: "/login", replace: true });
    }
  }, [navigate]);

  if (!user) return <div className="min-h-screen bg-background" />;

  const handleLogout = () => {
    clearAuthUser();
    window.location.href = "/";
  };

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
          <div className="flex items-center gap-1">
            <ThemeSwitcher className="h-8 w-8 border-white/10 text-cream/60 hover:border-brass hover:text-brass" />
            <button
              onClick={() => setSidebarOpen(false)}
              aria-label="Close menu"
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-cream/60 hover:bg-white/5 hover:text-cream lg:hidden"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
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
            <MessageCircle className="h-4 w-4" />
            Contact on WhatsApp
          </a>
        </div>

        {/* User footer */}
        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brass text-sm font-bold text-ink">
              {user.name[0]?.toUpperCase() ?? "U"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-cream">{user.name}</p>
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
