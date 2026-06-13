import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, MessageCircle, Phone, ChevronRight, Sparkles } from "lucide-react";
import { getAuthUser } from "@/lib/auth";
import { waLink, BRAND } from "@/data/content";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardOverview,
});

const NEXT_APPOINTMENT = {
  service: "Initial Hair Patch Fitting",
  date: "Wednesday, 18 Jun 2026",
  time: "11:00 AM",
  expert: "Priya Sharma",
  address: "Your home address",
};

// Today is Jun 13. Fitted May 25 → 19 days elapsed. Next maintenance Jul 6 → 23 days away.
// Progress: 19 / 42 = 45%
const PATCH = {
  nextMaintenance: "6 Jul 2026",
  daysLeft: 23,
  progressPct: 45,
};

function DashboardOverview() {
  const user = getAuthUser();
  const firstName = user?.name.split(" ")[0] ?? "there";
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <p className="text-sm text-slate-muted">{greeting},</p>
        <h1 className="mt-0.5 font-display text-3xl font-semibold text-foreground sm:text-4xl">
          {firstName}
        </h1>
      </div>

      {/* Quick stat chips */}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Next Visit" value="Jun 18" sub="11:00 AM · Priya Sharma" color="brass" />
        <StatCard
          label="Maintenance Due"
          value="Jul 6"
          sub={`${PATCH.daysLeft} days away`}
          color="emerald"
        />
        <StatCard label="Account" value="Active" sub="Member since May 2026" color="sky" />
      </div>

      {/* Upcoming appointment */}
      <Section title="Upcoming Appointment">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <span className="inline-block rounded-full bg-brass/15 px-3 py-1 text-xs font-semibold text-brass">
                Confirmed
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold text-card-foreground">
                {NEXT_APPOINTMENT.service}
              </h3>
              <ul className="mt-3 space-y-1.5 text-sm text-slate-muted">
                <li>
                  📅 {NEXT_APPOINTMENT.date} · {NEXT_APPOINTMENT.time}
                </li>
                <li>👤 Expert: {NEXT_APPOINTMENT.expert}</li>
                <li>📍 {NEXT_APPOINTMENT.address}</li>
              </ul>
            </div>
            <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-brass" />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              to="/dashboard/appointments"
              className="flex cursor-pointer items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-xs font-semibold text-cream transition hover:bg-ink-soft"
            >
              View details <ChevronRight className="h-3 w-3" />
            </Link>
            <button className="cursor-pointer rounded-full border border-ink/15 px-4 py-2 text-xs font-medium text-foreground transition hover:bg-ink/5">
              Reschedule
            </button>
          </div>
        </div>
      </Section>

      {/* Patch status */}
      <Section title="Hair Patch Status">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-medium text-card-foreground">Maintenance lifecycle</p>
              <p className="mt-0.5 text-sm text-slate-muted">
                Next service due {PATCH.nextMaintenance} · {PATCH.daysLeft} days remaining
              </p>
            </div>
            <Link to="/dashboard/patch" className="text-xs font-medium text-brass hover:underline">
              Details →
            </Link>
          </div>
          <div className="mt-5">
            <div className="h-2 w-full overflow-hidden rounded-full bg-ink/10">
              <div
                className="h-full rounded-full bg-brass transition-all duration-700"
                style={{ width: `${PATCH.progressPct}%` }}
              />
            </div>
            <div className="mt-2 flex justify-between text-xs text-slate-muted">
              <span>Fitted 25 May</span>
              <span>{PATCH.progressPct}% of 6-week cycle</span>
              <span>Due 6 Jul</span>
            </div>
          </div>
        </div>
      </Section>

      {/* Quick actions */}
      <Section title="Quick Actions">
        <div className="grid gap-3 sm:grid-cols-3">
          <QuickAction
            href={`tel:+${BRAND.whatsappNumber}`}
            icon={<Phone className="h-4 w-4" />}
            label="Call Us"
            sub="Speak directly"
          />
          <QuickAction
            href={waLink()}
            external
            icon={<MessageCircle className="h-4 w-4" />}
            label="WhatsApp"
            sub="Fastest response"
            accent
          />
          <QuickActionLink
            to="/book"
            icon={<Sparkles className="h-4 w-4" />}
            label="Book Again"
            sub="New appointment"
          />
        </div>
      </Section>
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
  color,
}: {
  label: string;
  value: string;
  sub: string;
  color: "brass" | "emerald" | "sky";
}) {
  const chip = {
    brass: "bg-brass/12 text-brass",
    emerald: "bg-emerald-500/12 text-emerald-700",
    sky: "bg-sky-500/12 text-sky-700",
  }[color];

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-widest text-slate-muted">{label}</p>
      <p
        className={cn(
          "mt-2 inline-block rounded-lg px-2 py-0.5 font-display text-2xl font-semibold",
          chip,
        )}
      >
        {value}
      </p>
      <p className="mt-1 text-xs text-slate-muted">{sub}</p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-3 text-xs font-medium uppercase tracking-widest text-slate-muted">
        {title}
      </h2>
      {children}
    </div>
  );
}

function QuickAction({
  href,
  icon,
  label,
  sub,
  external,
  accent,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  sub: string;
  external?: boolean;
  accent?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={cn(
        "flex items-center gap-3 rounded-2xl border p-4 transition hover:shadow-md",
        accent
          ? "border-emerald-500/25 bg-emerald-500/10 hover:border-emerald-500/40"
          : "border-border bg-card hover:border-brass/40",
      )}
    >
      <div
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
          accent ? "bg-emerald-500/20 text-emerald-500" : "bg-foreground/8 text-foreground",
        )}
      >
        {icon}
      </div>
      <div>
        <p
          className={cn(
            "text-sm font-medium",
            accent ? "text-emerald-500" : "text-card-foreground",
          )}
        >
          {label}
        </p>
        <p className={cn("text-xs", accent ? "text-emerald-500/70" : "text-slate-muted")}>{sub}</p>
      </div>
    </a>
  );
}

function QuickActionLink({
  to,
  icon,
  label,
  sub,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
  sub: string;
}) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition hover:border-brass/40 hover:shadow-md"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brass/12 text-brass">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-card-foreground">{label}</p>
        <p className="text-xs text-slate-muted">{sub}</p>
      </div>
    </Link>
  );
}
