import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MessageCircle, Phone, ChevronDown, ChevronUp, Send } from "lucide-react";
import { waLink, BRAND } from "@/data/content";
import { getAuthUser } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/support")({
  component: SupportPage,
});

const FAQS = [
  {
    q: "How long does the fitting appointment take?",
    a: "The initial fitting takes 1.5–2 hours. This includes consultation, patch selection, cutting to match your hairline, bonding, and styling. Maintenance visits are shorter — typically 45–60 minutes.",
  },
  {
    q: "How long will my hair patch last?",
    a: "With regular maintenance (every 6 weeks) and proper care, a quality hair patch lasts 8–12 months. The base material (lace or skin) determines longevity. We'll advise you when it's time for a replacement.",
  },
  {
    q: "Can I swim or exercise with the patch on?",
    a: "Yes, with precautions. Use a silicone swim cap in pools, as chlorine weakens adhesive. For workouts, sweat is fine — blot (don't rub) afterwards. Avoid submerging your head in the sea without protection.",
  },
  {
    q: "Will the patch look natural in wind or rain?",
    a: "Yes. Our patches are cut, styled and taped to your scalp contour, so they behave like natural hair. Wind-resistance depends on how recently it was re-bonded — book a re-bonding when you feel edges lifting.",
  },
  {
    q: "How do I reschedule or cancel an appointment?",
    a: "WhatsApp us at least 24 hours before your appointment for a free reschedule. Cancellations within 12 hours may forfeit the consultation fee. Use the Appointments section to message your expert directly.",
  },
];

export default function SupportPage() {
  const user = getAuthUser();
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    toast.success("Message sent! We'll reply within 2 hours.");
    setMessage("");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">Support</h1>
        <p className="mt-1 text-sm text-slate-muted">
          We're here for you — typically replies within 2 hours
        </p>
      </div>

      {/* Contact channels */}
      <div className="grid gap-4 sm:grid-cols-2">
        <a
          href={waLink(
            `Hi! I need help with my hair patch service. My name is ${user?.name ?? "a customer"}.`,
          )}
          target="_blank"
          rel="noreferrer"
          className="btn-lift flex cursor-pointer items-center gap-4 rounded-2xl border border-emerald-500/25 bg-emerald-500/10 p-5 transition hover:border-emerald-500/40"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500 text-white">
            <MessageCircle className="h-6 w-6" />
          </div>
          <div>
            <p className="font-semibold text-emerald-500">WhatsApp Us</p>
            <p className="text-sm text-emerald-500/70">Fastest response · Usually under 2 hrs</p>
          </div>
        </a>

        <a
          href={`tel:+${BRAND.whatsappNumber}`}
          className="btn-lift flex cursor-pointer items-center gap-4 rounded-2xl border border-border bg-card p-5 transition hover:border-brass/40"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brass/15 text-brass">
            <Phone className="h-6 w-6" />
          </div>
          <div>
            <p className="font-semibold text-card-foreground">Call Us</p>
            <p className="text-sm text-slate-muted">Mon–Sat · 9 AM to 7 PM</p>
          </div>
        </a>
      </div>

      {/* Quick message */}
      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <h2 className="font-display text-base font-semibold text-card-foreground">
          Send a message
        </h2>
        <p className="mt-0.5 text-sm text-slate-muted">
          We'll reply to your registered WhatsApp number
        </p>
        <form onSubmit={sendMessage} className="mt-4">
          <textarea
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="How can we help you today?"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-brass"
          />
          <button
            type="submit"
            disabled={!message.trim()}
            className="btn-lift mt-3 flex cursor-pointer items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-cream transition hover:bg-ink-soft disabled:opacity-50"
          >
            <Send className="h-3.5 w-3.5" /> Send message
          </button>
        </form>
      </div>

      {/* FAQ */}
      <div>
        <h2 className="mb-3 text-xs font-medium uppercase tracking-widest text-slate-muted">
          Frequently Asked Questions
        </h2>
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          {FAQS.map((faq, i) => (
            <div key={i} className="border-b border-border last:border-0">
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="flex w-full cursor-pointer items-start justify-between gap-4 px-5 py-4 text-left transition hover:bg-ink/4"
              >
                <span className="font-medium text-card-foreground">{faq.q}</span>
                {openIdx === i ? (
                  <ChevronUp className="mt-0.5 h-4 w-4 shrink-0 text-slate-muted" />
                ) : (
                  <ChevronDown className="mt-0.5 h-4 w-4 shrink-0 text-slate-muted" />
                )}
              </button>
              {openIdx === i && (
                <div className={cn("border-t border-border bg-ink/3 px-5 py-4")}>
                  <p className="text-sm leading-relaxed text-slate-muted">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
