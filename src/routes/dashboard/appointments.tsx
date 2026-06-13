import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarDays, MapPin, User, Clock, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/appointments")({
  component: AppointmentsPage,
});

type Status = "confirmed" | "completed" | "cancelled";

interface Appointment {
  id: string;
  service: string;
  date: string;
  time: string;
  expert: string;
  address: string;
  city: string;
  status: Status;
}

const UPCOMING: Appointment[] = [
  {
    id: "SAH-2026-002",
    service: "Initial Hair Patch Fitting",
    date: "Wed, 18 Jun 2026",
    time: "11:00 AM",
    expert: "Priya Sharma",
    address: "Your home address",
    city: "Noida",
    status: "confirmed",
  },
];

const PAST: Appointment[] = [
  {
    id: "SAH-2026-001",
    service: "Free Consultation",
    date: "Tue, 20 May 2026",
    time: "10:30 AM",
    expert: "Priya Sharma",
    address: "Your home address",
    city: "Noida",
    status: "completed",
  },
];

const STATUS_STYLES: Record<Status, string> = {
  confirmed: "bg-brass/15 text-brass",
  completed: "bg-emerald-500/12 text-emerald-700",
  cancelled: "bg-red-500/12 text-red-600",
};

const STATUS_LABELS: Record<Status, string> = {
  confirmed: "Confirmed",
  completed: "Completed",
  cancelled: "Cancelled",
};

export default function AppointmentsPage() {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");

  const list = tab === "upcoming" ? UPCOMING : PAST;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
            Appointments
          </h1>
          <p className="mt-1 text-sm text-slate-muted">View and manage your home visit schedule</p>
        </div>
        <Link
          to="/book"
          className="btn-lift shrink-0 cursor-pointer rounded-full bg-brass px-4 py-2.5 text-sm font-semibold text-ink hover:bg-brass-soft"
        >
          + Book visit
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-xl bg-ink/8 p-1 w-fit">
        {(["upcoming", "past"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "cursor-pointer rounded-lg px-4 py-2 text-sm font-medium capitalize transition",
              tab === t
                ? "bg-card text-foreground shadow-sm"
                : "text-slate-muted hover:text-foreground",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {/* List */}
      {list.length === 0 ? (
        <EmptyState tab={tab} />
      ) : (
        <div className="space-y-4">
          {list.map((appt) => (
            <AppointmentCard key={appt.id} appt={appt} />
          ))}
        </div>
      )}
    </div>
  );
}

function AppointmentCard({ appt }: { appt: Appointment }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold",
                STATUS_STYLES[appt.status],
              )}
            >
              {STATUS_LABELS[appt.status]}
            </span>
            <span className="text-xs text-slate-muted">{appt.id}</span>
          </div>
          <h3 className="mt-2 font-display text-base font-semibold text-card-foreground">
            {appt.service}
          </h3>
          <div className="mt-2.5 grid gap-1.5 text-sm text-slate-muted sm:grid-cols-2">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5 shrink-0" />
              {appt.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 shrink-0" />
              {appt.time}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 shrink-0" />
              {appt.expert}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              {appt.city}
            </span>
          </div>
        </div>
      </div>

      {appt.status === "confirmed" && (
        <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
          <button className="cursor-pointer rounded-full border border-ink/15 px-4 py-2 text-xs font-medium text-foreground transition hover:bg-ink/5">
            Reschedule
          </button>
          <button className="cursor-pointer rounded-full border border-red-200 px-4 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50">
            Cancel
          </button>
          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noreferrer"
            className="ml-auto flex cursor-pointer items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-xs font-semibold text-cream transition hover:bg-ink-soft"
          >
            Message expert <ChevronRight className="h-3 w-3" />
          </a>
        </div>
      )}
    </div>
  );
}

function EmptyState({ tab }: { tab: "upcoming" | "past" }) {
  return (
    <div className="rounded-2xl border border-dashed border-ink/20 bg-card p-12 text-center">
      <CalendarDays className="mx-auto h-10 w-10 text-ink/20" />
      <p className="mt-4 font-medium text-foreground">
        {tab === "upcoming" ? "No upcoming appointments" : "No past appointments yet"}
      </p>
      <p className="mt-1 text-sm text-slate-muted">
        {tab === "upcoming"
          ? "Book a home visit and your expert will come to you."
          : "Completed visits will appear here."}
      </p>
      {tab === "upcoming" && (
        <Link
          to="/book"
          className="mt-5 inline-block rounded-full bg-brass px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-brass-soft"
        >
          Book a visit
        </Link>
      )}
    </div>
  );
}
