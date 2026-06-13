import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { getAuthUser } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardOverview,
});

const TIME_SLOTS = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
];

const PATCH_HEALTH = {
  daysLeft: 23,
  totalDays: 42,
  serviceDue: "6 Jul 2026",
};

const SERVICE_HISTORY_SHORT = [
  { label: "Initial Fitting", date: "25 May 2026" },
  { label: "Consultation & Trial", date: "12 Apr 2026" },
  { label: "Discovery Call", date: "28 Mar 2026" },
];

const ALL_SERVICE_HISTORY = [
  { label: "Initial Fitting", date: "25 May 2026", status: "Completed" },
  { label: "Re-bonding Service", date: "10 May 2026", status: "Completed" },
  { label: "Consultation & Trial", date: "12 Apr 2026", status: "Completed" },
  { label: "Follow-up Check", date: "25 Mar 2026", status: "Completed" },
  { label: "Discovery Call", date: "28 Mar 2026", status: "Completed" },
  { label: "Initial Consultation", date: "5 Jan 2026", status: "Completed" },
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
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="currentColor" strokeWidth="9" className="text-border" />
        <circle
          cx={cx} cy={cy} r={r} fill="none" stroke="currentColor"
          strokeWidth="9" strokeLinecap="round"
          strokeDasharray={`${filled} ${gap}`}
          className="text-brass"
        />
      </svg>
      <div className="text-center">
        <p className="font-display text-3xl font-bold leading-none text-foreground">{daysLeft}</p>
        <p className="mt-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">days left</p>
      </div>
    </div>
  );
}

function DashboardOverview() {
  const user = getAuthUser();
  const firstName = user?.name.split(" ")[0] ?? "there";

  const [appt, setAppt] = useState({
    daysUntil: 5,
    expert: "Priya Sharma",
    dateLabel: "Wed 18 Jun · 11:00 AM",
    cancelled: false,
  });

  const [rescheduleOpen, setRescheduleOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const confirmReschedule = () => {
    if (!selectedDate || !selectedTime) return;
    const days = Math.max(0, Math.ceil((selectedDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)));
    const dateStr = selectedDate.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
    setAppt((a) => ({ ...a, daysUntil: days, dateLabel: `${dateStr} · ${selectedTime}` }));
    setRescheduleOpen(false);
    setSelectedDate(undefined);
    setSelectedTime(null);
    toast.success("Appointment rescheduled");
  };

  const confirmCancel = () => {
    setAppt((a) => ({ ...a, cancelled: true }));
    setCancelOpen(false);
    toast.success("Appointment cancelled");
  };

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
        Welcome back, {firstName}
      </h1>

      {/* Appointment hero card */}
      {appt.cancelled ? (
        <div className="flex items-center justify-between overflow-hidden rounded-2xl border border-border bg-card px-6 py-5 shadow-sm">
          <p className="text-sm text-muted-foreground">No upcoming appointments.</p>
          <button
            onClick={() => setAppt((a) => ({ ...a, cancelled: false }))}
            className="cursor-pointer text-xs font-medium text-brass hover:underline"
          >
            Book now
          </button>
        </div>
      ) : (
        <div className="flex overflow-hidden rounded-2xl bg-brass/[0.07]">
          <div className="w-1 shrink-0 bg-brass" />
          <div className="flex flex-1 flex-wrap items-center justify-between gap-4 p-6 sm:p-8">
            <div>
              <p
                className="font-display font-bold leading-none text-foreground"
                style={{ fontSize: "clamp(3.5rem, 8vw, 5rem)" }}
              >
                {appt.daysUntil}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">days until your next visit</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">With</p>
              <p className="mt-1 font-display text-2xl font-semibold text-foreground">{appt.expert}</p>
              <p className="mt-1 text-sm text-muted-foreground">{appt.dateLabel}</p>
              <div className="mt-2 flex items-center justify-end gap-3">
                <button
                  onClick={() => setRescheduleOpen(true)}
                  className="cursor-pointer text-xs font-medium text-brass hover:underline"
                >
                  Reschedule
                </button>
                <span className="text-xs text-muted-foreground/40">·</span>
                <button
                  onClick={() => setCancelOpen(true)}
                  className="cursor-pointer text-xs font-medium text-red-400 hover:text-red-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Two-column grid */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Patch Health */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Patch Health
          </p>
          <div className="mt-4 flex items-center gap-6">
            <CircularRing daysLeft={PATCH_HEALTH.daysLeft} totalDays={PATCH_HEALTH.totalDays} />
            <div>
              <p className="font-display text-base font-semibold text-foreground">Maintenance cycle</p>
              <p className="mt-1 text-sm text-muted-foreground">Service due {PATCH_HEALTH.serviceDue}</p>
            </div>
          </div>
        </div>

        {/* Service History */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Service History
            </p>
            <button
              onClick={() => setHistoryOpen(true)}
              className="cursor-pointer text-xs font-medium text-brass hover:underline"
            >
              View all ↗
            </button>
          </div>
          <p className="mt-3 font-display text-lg font-semibold text-foreground">Your visits</p>
          <ul className="mt-3 space-y-3">
            {SERVICE_HISTORY_SHORT.map((s) => (
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

      {/* Reschedule dialog */}
      <Dialog open={rescheduleOpen} onOpenChange={(o) => { setRescheduleOpen(o); if (!o) { setSelectedDate(undefined); setSelectedTime(null); } }}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Reschedule appointment</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={{ before: new Date() }}
              className="rounded-xl border border-border"
              classNames={{
                today: "text-brass font-semibold rounded-md",
              }}
            />
            <div className="w-full">
              <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Select time
              </p>
              <div className="grid grid-cols-4 gap-2">
                {TIME_SLOTS.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTime(t)}
                    className={cn(
                      "cursor-pointer rounded-lg border px-2 py-2 text-xs font-medium transition",
                      selectedTime === t
                        ? "border-brass bg-brass/10 text-brass"
                        : "border-border bg-background text-foreground hover:border-brass/50",
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-2 pt-1">
            <DialogClose asChild>
              <button className="flex-1 cursor-pointer rounded-full border border-border py-2.5 text-sm font-medium text-foreground transition hover:bg-muted">
                Cancel
              </button>
            </DialogClose>
            <button
              onClick={confirmReschedule}
              disabled={!selectedDate || !selectedTime}
              className="flex-1 cursor-pointer rounded-full bg-brass py-2.5 text-sm font-semibold text-ink transition hover:bg-brass-soft disabled:opacity-40"
            >
              Confirm
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Cancel appointment dialog */}
      <Dialog open={cancelOpen} onOpenChange={setCancelOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Cancel appointment?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            This will cancel your visit with{" "}
            <span className="font-medium text-foreground">{appt.expert}</span> on{" "}
            <span className="font-medium text-foreground">{appt.dateLabel}</span>. You can book again
            anytime.
          </p>
          <div className="flex gap-2 pt-1">
            <DialogClose asChild>
              <button className="flex-1 cursor-pointer rounded-full border border-border py-2.5 text-sm font-medium text-foreground transition hover:bg-muted">
                Keep it
              </button>
            </DialogClose>
            <button
              onClick={confirmCancel}
              className="flex-1 cursor-pointer rounded-full bg-red-500 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600"
            >
              Yes, cancel
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Service history dialog */}
      <Dialog open={historyOpen} onOpenChange={setHistoryOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Service history</DialogTitle>
          </DialogHeader>
          <ul className="space-y-4">
            {ALL_SERVICE_HISTORY.map((s, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brass" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{s.label}</p>
                  <p className="text-xs text-muted-foreground">{s.date}</p>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-600">
                  {s.status}
                </span>
              </li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>
    </div>
  );
}
