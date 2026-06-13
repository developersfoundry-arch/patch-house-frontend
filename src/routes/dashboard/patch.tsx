import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Wrench, ChevronDown, ChevronUp, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/patch")({
  component: PatchPage,
});

const PATCH = {
  id: "SAH-P-001",
  type: "Full lace hair patch",
  base: "Swiss lace",
  color: "Natural black (1B)",
  density: "Medium (120%)",
  length: "3 inches",
  fittedOn: "25 May 2026",
  fittedBy: "Priya Sharma",
  nextMaintenance: "6 Jul 2026",
  maintenanceCycle: "Every 6 weeks",
  daysLeft: 23,
  progressPct: 45,
};

const CARE_STEPS = [
  {
    title: "Daily care",
    content:
      "Use a soft-bristle brush; stroke from hairline back. Avoid excessive heat — hairdryer on low, 15 cm away. At night, loosely cover with a satin cap to reduce friction and tangling.",
  },
  {
    title: "Washing (twice a week)",
    content:
      "Use a mild, sulfate-free shampoo. Wash with lukewarm water in one direction — never rub in circles. Pat dry gently with a microfiber towel. Let air-dry before styling.",
  },
  {
    title: "Re-bonding (every 2–3 weeks)",
    content:
      "When you feel the edges lifting, contact us to schedule a re-bonding visit. Do not attempt to re-apply tape or adhesive yourself — incorrect bonding damages the base.",
  },
  {
    title: "Avoiding damage",
    content:
      "Keep away from chlorinated water (swimming pools) without a silicone cap. Limit salt-water exposure. Remove the patch before extended sun exposure or harsh chemical treatments.",
  },
];

export default function PatchPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
          My Hair Patch
        </h1>
        <p className="mt-1 text-sm text-slate-muted">
          Specifications, maintenance schedule &amp; care guide
        </p>
      </div>

      {/* Specs + maintenance row */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Specifications */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-brass" />
            <h2 className="font-display text-base font-semibold text-card-foreground">
              Specifications
            </h2>
            <span className="ml-auto text-xs text-slate-muted">{PATCH.id}</span>
          </div>
          <dl className="mt-4 space-y-3">
            {[
              ["Type", PATCH.type],
              ["Base material", PATCH.base],
              ["Hair colour", PATCH.color],
              ["Density", PATCH.density],
              ["Length", PATCH.length],
              ["Fitted on", PATCH.fittedOn],
              ["Fitted by", PATCH.fittedBy],
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex items-center justify-between gap-4 border-b border-border pb-2.5 last:border-0 last:pb-0"
              >
                <dt className="text-sm text-slate-muted">{k}</dt>
                <dd className="text-right text-sm font-medium text-card-foreground">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Maintenance */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center gap-2">
            <Wrench className="h-4 w-4 text-brass" />
            <h2 className="font-display text-base font-semibold text-card-foreground">
              Maintenance Schedule
            </h2>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-muted">Cycle</p>
              <p className="text-sm font-medium text-card-foreground">{PATCH.maintenanceCycle}</p>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-muted">Progress</span>
                <span className="font-medium text-card-foreground">{PATCH.progressPct}%</span>
              </div>
              <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-ink/10">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-700",
                    PATCH.progressPct > 75 ? "bg-amber-400" : "bg-brass",
                  )}
                  style={{ width: `${PATCH.progressPct}%` }}
                />
              </div>
              <div className="mt-2 flex justify-between text-xs text-slate-muted">
                <span>{PATCH.fittedOn}</span>
                <span>Due {PATCH.nextMaintenance}</span>
              </div>
            </div>
            <div className="mt-5 rounded-xl bg-brass/10 px-4 py-3">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-brass" />
                <p className="text-sm font-semibold text-card-foreground">
                  Next service: {PATCH.nextMaintenance}
                </p>
              </div>
              <p className="mt-0.5 text-xs text-slate-muted">
                {PATCH.daysLeft} days remaining · Book in advance to lock your preferred slot
              </p>
            </div>
            <Link
              to="/book"
              className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-ink py-2.5 text-sm font-semibold text-cream transition hover:bg-ink-soft"
            >
              Schedule maintenance visit
            </Link>
          </div>
        </div>
      </div>

      {/* Care guide */}
      <div>
        <h2 className="mb-3 text-xs font-medium uppercase tracking-widest text-slate-muted">
          Care Guide
        </h2>
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          {CARE_STEPS.map((step, i) => (
            <div key={step.title} className={cn("border-b border-border last:border-0")}>
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-ink/4"
              >
                <span className="font-medium text-card-foreground">{step.title}</span>
                {openIdx === i ? (
                  <ChevronUp className="h-4 w-4 shrink-0 text-slate-muted" />
                ) : (
                  <ChevronDown className="h-4 w-4 shrink-0 text-slate-muted" />
                )}
              </button>
              {openIdx === i && (
                <div className="border-t border-border bg-ink/3 px-5 py-4">
                  <p className="text-sm text-slate-muted leading-relaxed">{step.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
