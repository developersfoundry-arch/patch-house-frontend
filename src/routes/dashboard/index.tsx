import { createFileRoute, Link } from "@tanstack/react-router";
import { getAuthUser } from "@/lib/auth";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardOverview,
});

const APPOINTMENT = {
  daysUntil: 5,
  expert: "Priya Sharma",
  dateLabel: "Wed 18 Jun · 11:00 AM",
};

const PATCH_HEALTH = {
  daysLeft: 23,
  totalDays: 42,
  serviceDue: "6 Jul 2026",
};

const SERVICE_HISTORY = [
  { label: "Initial Fitting", date: "25 May 2026" },
  { label: "Consultation & Trial", date: "12 Apr 2026" },
  { label: "Discovery Call", date: "28 Mar 2026" },
];

function CircularRing({ daysLeft, totalDays }: { daysLeft: number; totalDays: number }) {
  const r = 40;
  const size = 110;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const pct = Math.min(daysLeft / totalDays, 1);
  const filled = circumference * pct;
  const gap = circumference - filled;

  return (
    <div className="relative flex h-[110px] w-[110px] shrink-0 items-center justify-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="absolute inset-0 -rotate-90"
        aria-hidden="true"
      >
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth="9"
          className="text-border"
        />
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={`${filled} ${gap}`}
          className="text-brass"
        />
      </svg>
      <div className="text-center">
        <p className="font-display text-3xl font-bold leading-none text-foreground">{daysLeft}</p>
        <p className="mt-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
          days left
        </p>
      </div>
    </div>
  );
}

function DashboardOverview() {
  const user = getAuthUser();
  const firstName = user?.name.split(" ")[0] ?? "there";

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
        Welcome back, {firstName}
      </h1>

      {/* Appointment hero card */}
      <div className="flex overflow-hidden rounded-2xl bg-brass/[0.07]">
        <div className="w-1 shrink-0 bg-brass" />
        <div className="flex flex-1 flex-wrap items-center justify-between gap-4 p-6 sm:p-8">
          <div>
            <p
              className="font-display font-bold leading-none text-foreground"
              style={{ fontSize: "clamp(3.5rem, 8vw, 5rem)" }}
            >
              {APPOINTMENT.daysUntil}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">days until your next visit</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              With
            </p>
            <p className="mt-1 font-display text-2xl font-semibold text-foreground">
              {APPOINTMENT.expert}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{APPOINTMENT.dateLabel}</p>
            <button className="mt-2 cursor-pointer text-xs font-medium text-brass hover:underline">
              Reschedule
            </button>
          </div>
        </div>
      </div>

      {/* Two-column grid */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Patch Health */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Patch Health
          </p>
          <div className="mt-4 flex items-center gap-6">
            <CircularRing
              daysLeft={PATCH_HEALTH.daysLeft}
              totalDays={PATCH_HEALTH.totalDays}
            />
            <div>
              <p className="font-display text-base font-semibold text-foreground">
                Maintenance cycle
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Service due {PATCH_HEALTH.serviceDue}
              </p>
            </div>
          </div>
        </div>

        {/* Service History */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Service History
            </p>
            <Link to="/dashboard/patch" className="text-xs font-medium text-brass hover:underline">
              View all ↗
            </Link>
          </div>
          <p className="mt-3 font-display text-lg font-semibold text-foreground">Your visits</p>
          <ul className="mt-3 space-y-3">
            {SERVICE_HISTORY.map((s) => (
              <li key={s.label} className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brass" />
                <div>
                  <p className="text-sm font-medium text-foreground">{s.label}</p>
                  <p className="text-xs text-muted-foreground">{s.date}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
