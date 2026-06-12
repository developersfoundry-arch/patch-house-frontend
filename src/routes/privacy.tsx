import { createFileRoute, Link } from "@tanstack/react-router";
import { BRAND } from "@/data/content";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — StrandsAtHome" },
      {
        name: "description",
        content: "How StrandsAtHome collects, uses, and protects your personal information.",
      },
    ],
  }),
  component: PrivacyPage,
});

const SECTIONS = [
  {
    h: "What we collect",
    p: "When you book a visit or message us on WhatsApp, we collect your name, phone number, city, address, and your preferred visit slot. During the consultation, our expert may note basic details about your hair and scalp to recommend the right patch.",
  },
  {
    h: "How we use it",
    p: "Only to schedule and deliver your home visit, follow up on your fitting, and provide aftercare support. We do not run marketing campaigns on your number, and we never add you to promotional broadcast lists without your explicit consent.",
  },
  {
    h: "What we never do",
    p: "We never sell, rent, or share your personal information with third parties. Your address is shared only with the expert assigned to your visit, and only for that visit. No photos of you are ever taken or kept without your written consent.",
  },
  {
    h: "Data retention & deletion",
    p: "We keep your booking details only as long as needed to serve you. Message us on WhatsApp at any time to have your information deleted from our records — we confirm deletion within 7 days.",
  },
  {
    h: "Contact",
    p: "For any privacy question or request, reach us on WhatsApp at the number listed on this site. We respond within one business day.",
  },
];

function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-2xl">
        <Link
          to="/"
          className="font-display text-2xl font-semibold text-foreground transition hover:text-brass"
        >
          {BRAND.name.replace("AtHome", "")}
          <span className="text-brass">AtHome</span>
        </Link>
        <h1 className="mt-10 font-display text-4xl font-semibold text-foreground">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Privacy isn't a page on our site — it's the reason we exist. Here's exactly how we handle
          your information.
        </p>
        <div className="mt-10 space-y-8">
          {SECTIONS.map((s) => (
            <section key={s.h}>
              <h2 className="font-display text-xl font-semibold text-foreground">{s.h}</h2>
              <p className="mt-2 leading-relaxed text-muted-foreground">{s.p}</p>
            </section>
          ))}
        </div>
        <Link
          to="/"
          className="mt-12 inline-flex items-center rounded-full border border-foreground/20 px-5 py-2.5 text-sm font-medium text-foreground transition hover:border-brass hover:text-brass"
        >
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
