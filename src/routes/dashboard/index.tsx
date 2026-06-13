import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format, parseISO, differenceInCalendarDays } from "date-fns";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import type { Appointment, Patch, User } from "@/lib/types";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardOverview,
});

const TIME_SLOTS = [
  { label: "Morning", sub: "9 AM – 12 PM", value: "morning" as const },
  { label: "Afternoon", sub: "12 PM – 4 PM", value: "afternoon" as const },
  { label: "Evening", sub: "4 PM – 8 PM", value: "evening" as const },
];

const SLOT_LABEL: Record<string, string> = {
  morning: "9 AM – 12 PM",
  afternoon: "12 PM – 4 PM",
  evening: "4 PM – 8 PM",
};

function formatApptDateLabel(appt: Appointment): string {
  const dateStr = format(parseISO(appt.preferred_date), "EEE d MMM");
  return `${dateStr} · ${SLOT_LABEL[appt.time_slot] ?? appt.time_slot}`;
}

function CircularRing({ daysLeft, totalDays }: { daysLeft: number; totalDays: number }) {
  const r = 40;
  const size = 110;
  const circumference = 2 * Math.PI * r;
  const filled = circumference * Math.min(daysLeft / Math.max(totalDays, 1), 1);
  const gap = circumference - filled;

  return (
    <div className="relative flex h-[110px] w-[110px] shrink-0 items-center justify-center">
      <svg
        width={size} height={size} viewBox={`0 0 ${size} ${size}`}
        className="absolute inset-0 -rotate-90" aria-hidden="true"
      >
        <circle cx={55} cy={55} r={r} fill="none" stroke="currentColor" strokeWidth="9" className="text-border" />
        <circle
          cx={55} cy={55} r={r} fill="none" stroke="currentColor"
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
  const queryClient = useQueryClient();

  const { data: upcomingAppts = [], isLoading: loadingAppts } = useQuery({
    queryKey: ["appointments", "upcoming"],
    queryFn: () => api.get<Appointment[]>("/appointments?status=upcoming"),
  });

  const { data: patches = [] } = useQuery({
    queryKey: ["patches"],
    queryFn: () => api.get<Patch[]>("/patches"),
  });

  const { data: user } = useQuery<User>({
    queryKey: ["me"],
    staleTime: 5 * 60 * 1000,
  });

  const [rescheduleOpen, setRescheduleOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<"morning" | "afternoon" | "evening" | null>(null);

  const { data: pastAppts = [], isLoading: loadingPast } = useQuery({
    queryKey: ["appointments", "past"],
    queryFn: () => api.get<Appointment[]>("/appointments?status=past"),
    enabled: historyOpen,
  });

  const upcomingAppt = upcomingAppts[0] ?? null;
  const activePatch = patches.find((p) => p.status === "active") ?? null;

  const daysUntil = upcomingAppt
    ? Math.max(0, differenceInCalendarDays(parseISO(upcomingAppt.preferred_date), new Date()))
    : null;

  const patchDaysLeft = activePatch?.next_maintenance_date
    ? Math.max(0, differenceInCalendarDays(parseISO(activePatch.next_maintenance_date), new Date()))
    : 0;

  const patchTotalDays =
    activePatch?.fitted_date && activePatch?.next_maintenance_date
      ? differenceInCalendarDays(
          parseISO(activePatch.next_maintenance_date),
          parseISO(activePatch.fitted_date),
        )
      : 42;

  const serviceDue = activePatch?.next_maintenance_date
    ? format(parseISO(activePatch.next_maintenance_date), "d MMM yyyy")
    : "Not scheduled";

  const rescheduleMutation = useMutation({
    mutationFn: ({ preferred_date, time_slot }: { preferred_date: string; time_slot: string }) =>
      api.put(`/appointments/${upcomingAppt!.id}/reschedule`, { preferred_date, time_slot }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      setRescheduleOpen(false);
      setSelectedDate(undefined);
      setSelectedTime(null);
      toast.success("Appointment rescheduled");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const cancelMutation = useMutation({
    mutationFn: () => api.del(`/appointments/${upcomingAppt!.id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      setCancelOpen(false);
      toast.success("Appointment cancelled");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const confirmReschedule = () => {
    if (!selectedDate || !selectedTime || !upcomingAppt) return;
    rescheduleMutation.mutate({
      preferred_date: format(selectedDate, "yyyy-MM-dd"),
      time_slot: selectedTime,
    });
  };

  const firstName = user?.name?.split(" ")[0] ?? "there";

  const historyItems = pastAppts.map((a) => ({
    label: a.service_type,
    date: format(parseISO(a.preferred_date), "d MMM yyyy"),
    status: a.status,
  }));

  const shortHistory = historyItems.slice(0, 3);

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
        Welcome back, {firstName}
      </h1>

      {/* Appointment hero */}
      {loadingAppts ? (
        <div className="h-36 animate-pulse rounded-2xl bg-muted" />
      ) : !upcomingAppt ? (
        <div className="flex items-center justify-between overflow-hidden rounded-2xl border border-border bg-card px-6 py-5 shadow-sm">
          <p className="text-sm text-muted-foreground">No upcoming appointments.</p>
          <a href="/book" className="text-xs font-medium text-brass hover:underline">Book now</a>
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
                {daysUntil}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">days until your next visit</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">With</p>
              <p className="mt-1 font-display text-2xl font-semibold text-foreground">
                {upcomingAppt.expert?.name ?? "Expert TBD"}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{formatApptDateLabel(upcomingAppt)}</p>
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
          {!activePatch ? (
            <p className="mt-4 text-sm text-muted-foreground">
              Your patch details will appear here after your first fitting.
            </p>
          ) : (
            <div className="mt-4 flex items-center gap-6">
              <CircularRing daysLeft={patchDaysLeft} totalDays={patchTotalDays} />
              <div>
                <p className="font-display text-base font-semibold text-foreground">Maintenance cycle</p>
                <p className="mt-1 text-sm text-muted-foreground">Service due {serviceDue}</p>
              </div>
            </div>
          )}
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
          {shortHistory.length === 0 ? (
            <p className="mt-3 text-sm text-muted-foreground">No past visits yet.</p>
          ) : (
            <ul className="mt-3 space-y-3">
              {shortHistory.map((s, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brass" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{s.label}</p>
                    <p className="text-xs text-muted-foreground">{s.date}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Reschedule dialog */}
      <Dialog
        open={rescheduleOpen}
        onOpenChange={(o) => {
          setRescheduleOpen(o);
          if (!o) { setSelectedDate(undefined); setSelectedTime(null); }
        }}
      >
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
              classNames={{ today: "text-brass font-semibold rounded-md" }}
            />
            <div className="w-full">
              <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Select time slot
              </p>
              <div className="grid grid-cols-3 gap-2">
                {TIME_SLOTS.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => setSelectedTime(t.value)}
                    className={cn(
                      "cursor-pointer rounded-xl border px-3 py-3 text-left transition",
                      selectedTime === t.value
                        ? "border-brass bg-brass/10"
                        : "border-border bg-background hover:border-brass/50",
                    )}
                  >
                    <p className={cn("text-xs font-semibold", selectedTime === t.value ? "text-brass" : "text-foreground")}>{t.label}</p>
                    <p className="mt-0.5 text-[10px] text-muted-foreground">{t.sub}</p>
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
              disabled={!selectedDate || !selectedTime || rescheduleMutation.isPending}
              className="flex-1 cursor-pointer rounded-full bg-brass py-2.5 text-sm font-semibold text-ink transition hover:bg-brass-soft disabled:opacity-40"
            >
              {rescheduleMutation.isPending ? "Saving…" : "Confirm"}
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Cancel dialog */}
      <Dialog open={cancelOpen} onOpenChange={setCancelOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Cancel appointment?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            This will cancel your visit with{" "}
            <span className="font-medium text-foreground">
              {upcomingAppt?.expert?.name ?? "your expert"}
            </span>{" "}
            on{" "}
            <span className="font-medium text-foreground">
              {upcomingAppt ? formatApptDateLabel(upcomingAppt) : ""}
            </span>
            . You can book again anytime.
          </p>
          <div className="flex gap-2 pt-1">
            <DialogClose asChild>
              <button className="flex-1 cursor-pointer rounded-full border border-border py-2.5 text-sm font-medium text-foreground transition hover:bg-muted">
                Keep it
              </button>
            </DialogClose>
            <button
              onClick={() => cancelMutation.mutate()}
              disabled={cancelMutation.isPending}
              className="flex-1 cursor-pointer rounded-full bg-red-500 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600 disabled:opacity-60"
            >
              {cancelMutation.isPending ? "Cancelling…" : "Yes, cancel"}
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
          {loadingPast ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => <div key={i} className="h-10 animate-pulse rounded-lg bg-muted" />)}
            </div>
          ) : historyItems.length === 0 ? (
            <p className="text-sm text-muted-foreground">No past visits yet.</p>
          ) : (
            <ul className="space-y-4">
              {historyItems.map((s, i) => (
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
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
