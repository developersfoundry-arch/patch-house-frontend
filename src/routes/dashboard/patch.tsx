import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format, parseISO, differenceInCalendarDays } from "date-fns";
import { ChevronDown, ChevronUp } from "lucide-react";
import { api } from "@/lib/api";
import type { Patch } from "@/lib/types";

export const Route = createFileRoute("/dashboard/patch")({
  component: PatchPage,
});

const CARE_STEPS = [
  {
    title: "Daily care",
    content:
      "Use a soft-bristle brush and stroke gently from the hairline back. Avoid pulling at the perimeter. A satin cap at night reduces friction and adds days to your patch.",
  },
  {
    title: "Washing",
    content:
      "Wash twice a week with a mild sulfate-free shampoo and lukewarm water in one direction — never rub in circles. Pat dry gently with a microfiber towel and let air-dry before styling.",
  },
  {
    title: "Re-bonding",
    content:
      "When you feel edges lifting, contact us to schedule a re-bonding visit. Do not attempt to re-apply tape or adhesive yourself — incorrect bonding damages the base material.",
  },
  {
    title: "Avoiding damage",
    content:
      "Keep away from chlorinated water without a silicone cap. Limit salt-water exposure. Remove the patch before extended sun exposure or harsh chemical treatments.",
  },
];

export default function PatchPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const { data: patches = [], isLoading } = useQuery({
    queryKey: ["patches"],
    queryFn: () => api.get<Patch[]>("/patches"),
  });

  const activePatch = patches.find((p) => p.status === "active") ?? null;

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-muted" />
        <div className="h-32 animate-pulse rounded-2xl bg-muted" />
        <div className="h-48 animate-pulse rounded-2xl bg-muted" />
      </div>
    );
  }

  if (!activePatch) {
    return (
      <div className="space-y-8">
        <h1 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">My Patch</h1>
        <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brass/10 font-display text-xl font-bold text-brass">
            PH
          </div>
          <h2 className="mt-4 font-display text-xl font-semibold text-foreground">No active patch</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Your patch details will appear here after your first fitting with our expert.
          </p>
        </div>
        <CareGuide openIdx={openIdx} setOpenIdx={setOpenIdx} />
      </div>
    );
  }

  const daysToService = activePatch.next_maintenance_date
    ? Math.max(0, differenceInCalendarDays(parseISO(activePatch.next_maintenance_date), new Date()))
    : null;

  const fittedDate = activePatch.fitted_date
    ? format(parseISO(activePatch.fitted_date), "d MMM yyyy")
    : "Pending";

  const specs = [
    { label: "Type", value: activePatch.patch_type },
    { label: "Base", value: activePatch.base_material },
    { label: "Color", value: activePatch.color },
    { label: "Density", value: activePatch.density },
    { label: "Length", value: activePatch.hair_length },
    { label: "Fitted on", value: fittedDate },
  ];

  const specRows = [
    [specs[0], specs[1]],
    [specs[2], specs[3]],
    [specs[4], specs[5]],
  ];

  return (
    <div className="space-y-8">
      <h1 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">My Patch</h1>

      {/* Product hero */}
      <div className="flex items-start justify-between gap-6 overflow-hidden rounded-2xl bg-brass/[0.07] p-6 sm:p-8">
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-500">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Active System
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-foreground sm:text-3xl">
            {activePatch.patch_type}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {activePatch.base_material} · {activePatch.color}
          </p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-muted-foreground">
            <span>📅 Fitted {fittedDate}</span>
            {daysToService !== null && <span>✦ {daysToService} days to next service</span>}
          </div>
          {activePatch.expert && (
            <p className="mt-2 text-xs text-muted-foreground">
              Expert:{" "}
              <span className="font-medium text-foreground">{activePatch.expert.name}</span>
            </p>
          )}
        </div>
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-brass font-display text-xl font-bold text-ink">
          PH
        </div>
      </div>

      {/* Specifications */}
      <div>
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-xl font-semibold text-foreground">Specifications</h2>
          <p className="text-xs text-muted-foreground">Custom-built for you</p>
        </div>
        <div className="mt-3 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          {specRows.map((row, ri) => (
            <div
              key={ri}
              className="grid grid-cols-2 divide-x divide-border border-b border-border last:border-b-0"
            >
              {row.map((spec) => (
                <div key={spec.label} className="p-4">
                  <p className="text-xs font-medium uppercase tracking-widest text-brass/70">
                    {spec.label}
                  </p>
                  <p className="mt-1 text-sm font-medium text-card-foreground">{spec.value}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <CareGuide openIdx={openIdx} setOpenIdx={setOpenIdx} />
    </div>
  );
}

function CareGuide({
  openIdx,
  setOpenIdx,
}: {
  openIdx: number | null;
  setOpenIdx: (i: number | null) => void;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <h2 className="font-display text-xl font-semibold text-foreground">Care guide</h2>
        <p className="text-xs text-muted-foreground">Tap to expand</p>
      </div>
      <div className="mt-3 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        {CARE_STEPS.map((step, i) => (
          <div key={step.title} className="border-b border-border last:border-0">
            <button
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-foreground/[0.03]"
            >
              <span className="font-medium text-card-foreground">{step.title}</span>
              {openIdx === i ? (
                <ChevronUp className="h-4 w-4 shrink-0 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
              )}
            </button>
            {openIdx === i && (
              <div className="border-t border-border px-5 py-4">
                <p className="text-sm leading-relaxed text-muted-foreground">{step.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
