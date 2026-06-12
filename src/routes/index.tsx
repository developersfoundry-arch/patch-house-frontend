import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { BeforeAfter } from "@/components/before-after";
import { useReveal } from "@/hooks/use-reveal";
import {
  BEFORE_AFTER,
  BRAND,
  COMPARISON,
  EXPERTS,
  FAQ,
  PRICING,
  PROBLEMS,
  STEPS,
  TESTIMONIALS,
  TRUST,
  waLink,
} from "@/data/content";
import heroImg from "@/assets/hero-portrait.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Camera,
  FlaskConical,
  DoorClosed,
  Check,
  X,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Star,
} from "lucide-react";

const ICONS = { Camera, FlaskConical, DoorClosed } as const;

// LocalBusiness + FAQPage structured data for Google rich results
const JSON_LD = JSON.stringify([
  {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    name: BRAND.name,
    description:
      "Discreet at-home hair patch fittings across Delhi NCR. A certified hair expert visits you privately and fits your non-surgical hair patch the same day.",
    telephone: `+${BRAND.whatsappNumber}`,
    areaServed: BRAND.cities.map((c) => ({ "@type": "City", name: c })),
    priceRange: "₹₹",
    knowsAbout: [
      "Non-surgical hair replacement",
      "Hair patch fitting for men",
      "Hair systems and toupees",
      "At-home hair loss solutions",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "At-home hair patch services",
      itemListElement: PRICING.map((p) => ({
        "@type": "Offer",
        name: p.name,
        description: p.tagline,
      })),
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
]);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "StrandsAtHome — At-Home Hair Patch Service in Delhi NCR" },
      {
        name: "description",
        content:
          "Non-surgical hair patch for men, fitted at home in Delhi, Noida, Gurugram & across NCR. A certified expert visits privately and fits it the same day.",
      },
    ],
    scripts: [{ type: "application/ld+json", children: JSON_LD }],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Results />
        <How />
        <Compare />
        <Experts />
        <Testimonials />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}

function Hero() {
  return (
    <section className="section-dark grain relative min-h-screen overflow-hidden">
      <div className="mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-5 pt-28 pb-16 sm:px-8 md:grid-cols-2 md:pt-32">
        <div>
          <p
            className="text-xs font-medium uppercase tracking-[0.25em] text-brass animate-[reveal-up_0.7s_ease-out_forwards] opacity-0"
            style={{ animationDelay: "0.05s" }}
          >
            At-Home Hair Patch Service · Delhi NCR
          </p>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.02] tracking-tight text-cream sm:text-6xl md:text-7xl">
            <span
              className="block animate-[reveal-up_0.8s_ease-out_forwards] opacity-0"
              style={{ animationDelay: "0.2s" }}
            >
              Get your hair back.
            </span>
            <span
              className="block text-brass animate-[reveal-up_0.8s_ease-out_forwards] opacity-0"
              style={{ animationDelay: "0.45s" }}
            >
              Without ever leaving home.
            </span>
          </h1>
          <p
            className="mt-7 max-w-xl text-base leading-relaxed text-cream/75 sm:text-lg animate-[reveal-up_0.8s_ease-out_forwards] opacity-0"
            style={{ animationDelay: "0.7s" }}
          >
            A certified hair expert visits you privately, finds your perfect non-surgical hair
            patch, and fits it the same day — at your home, on your schedule.
          </p>
          <div
            className="mt-9 flex flex-col gap-3 sm:flex-row animate-[reveal-up_0.8s_ease-out_forwards] opacity-0"
            style={{ animationDelay: "0.9s" }}
          >
            <Link
              to="/book"
              className="btn-lift inline-flex items-center justify-center gap-2 rounded-full bg-brass px-7 py-3.5 text-sm font-semibold text-ink hover:bg-brass-soft"
            >
              Book a Free Home Consultation <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={waLink()}
              target="_blank"
              rel="noreferrer"
              className="btn-lift inline-flex items-center justify-center gap-2 rounded-full border border-cream/30 px-7 py-3.5 text-sm font-medium text-cream hover:border-brass hover:text-brass"
            >
              <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
            </a>
          </div>
          <div
            className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-xs text-cream/55 animate-[reveal-up_0.8s_ease-out_forwards] opacity-0"
            style={{ animationDelay: "1.1s" }}
          >
            {TRUST.map((t, i) => (
              <span key={t} className="flex items-center gap-2">
                {i > 0 && <span className="h-1 w-1 rounded-full bg-brass" />}
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
            <img
              src={heroImg}
              alt="Confident man with a natural-looking non-surgical hair patch, side profile"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
          </div>
          <div className="absolute -bottom-4 -left-4 hidden h-24 w-24 rounded-full border border-brass/40 md:block" />
        </div>
      </div>
    </section>
  );
}

function Problem() {
  const r = useReveal();
  return (
    <section className="bg-cream py-24 sm:py-32">
      <div ref={r.ref} className={`${r.className} mx-auto max-w-5xl px-5 sm:px-8`}>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-brass">
            Sound familiar?
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-ink sm:text-5xl">
            Hair loss changes more than your hairline.
          </h2>
          <p className="mt-4 text-base text-slate-muted sm:text-lg">
            Your evenings. Your photos. Your confidence.
          </p>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {PROBLEMS.map((p) => {
            const Icon = ICONS[p.icon as keyof typeof ICONS];
            return (
              <div
                key={p.line}
                className="lift rounded-2xl border border-ink/10 bg-white p-7 shadow-sm"
              >
                <Icon className="h-7 w-7 text-brass" strokeWidth={1.5} />
                <p className="mt-5 text-base font-medium text-ink">{p.line}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Results() {
  const [active, setActive] = useState(0);
  const r = useReveal();
  const current = BEFORE_AFTER[active];
  return (
    <section id="results" className="section-dark grain py-24 sm:py-32">
      <div ref={r.ref} className={`${r.className} mx-auto max-w-6xl px-5 sm:px-8`}>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-brass">The Results</p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-cream sm:text-5xl">
            Drag. See the difference.
          </h2>
          <p className="mt-4 text-cream/70">Real results from home fittings across Delhi NCR.</p>
          <div className="brass-rule mx-auto mt-8 w-24" />
        </div>

        <div className="mt-12">
          <BeforeAfter
            key={active}
            before={current.before}
            after={current.after}
            caption={`${current.name} · ${current.city} · ${current.type}`}
            altBefore={`Hair loss before at-home hair patch fitting — ${current.name}, ${current.city}`}
            altAfter={`Natural hairline after non-surgical hair patch fitting at home — ${current.name}, ${current.city}`}
          />
        </div>

        <div className="mt-8 flex gap-3 overflow-x-auto pb-2">
          {BEFORE_AFTER.map((b, i) => (
            <button
              key={b.name}
              onClick={() => setActive(i)}
              className={`lift group flex shrink-0 flex-col items-start gap-2 rounded-xl border p-2 text-left ${
                i === active ? "border-brass" : "border-white/10 hover:border-white/30"
              }`}
            >
              <div className="flex gap-1">
                <img src={b.before} alt="" className="h-16 w-16 rounded-md object-cover" />
                <img src={b.after} alt="" className="h-16 w-16 rounded-md object-cover" />
              </div>
              <p className="px-1 text-xs text-cream/80">
                {b.name} — {b.city}
                <span className="block text-cream/50">{b.type}</span>
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({ step, index }: { step: (typeof STEPS)[number]; index: number }) {
  const sr = useReveal<HTMLLIElement>();
  return (
    <li
      ref={sr.ref}
      className={`${sr.className} reveal-delay-${index + 1} lift rounded-2xl border border-ink/10 bg-white p-7 shadow-sm`}
    >
      <div className="font-display text-4xl font-semibold text-brass">{step.n}</div>
      <h3 className="mt-4 text-lg font-semibold text-ink">{step.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-muted">{step.desc}</p>
    </li>
  );
}

function How() {
  const r = useReveal();
  return (
    <section id="how" className="bg-cream py-24 sm:py-32">
      <div ref={r.ref} className={`${r.className} mx-auto max-w-6xl px-5 sm:px-8`}>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-brass">How it works</p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-ink sm:text-5xl">
            Four calm steps. One visit.
          </h2>
        </div>

        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <StepCard key={s.n} step={s} index={i} />
          ))}
        </ol>

        <div className="mt-12 text-center">
          <Link
            to="/book"
            className="btn-lift inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-cream hover:bg-ink-soft"
          >
            Start with a free home visit <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Compare() {
  const r = useReveal();
  return (
    <section className="section-dark grain py-24 sm:py-32">
      <div ref={r.ref} className={`${r.className} mx-auto max-w-5xl px-5 sm:px-8`}>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold leading-tight text-cream sm:text-5xl">
            Why at-home beats the clinic.
          </h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <div className="card-glass lift rounded-2xl border border-white/10 p-8 hover:border-white/25">
            <h3 className="text-sm font-medium uppercase tracking-widest text-cream/50">
              Typical clinic visit
            </h3>
            <ul className="mt-6 space-y-4">
              {COMPARISON.clinic.map((c) => (
                <li key={c} className="flex items-start gap-3 text-cream/70">
                  <X className="mt-0.5 h-5 w-5 shrink-0 text-cream/30" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card-glass-brass lift rounded-2xl border border-brass/40 p-8 hover:border-brass">
            <h3 className="text-sm font-medium uppercase tracking-widest text-brass">
              StrandsAtHome
            </h3>
            <ul className="mt-6 space-y-4">
              {COMPARISON.us.map((c) => (
                <li key={c} className="flex items-start gap-3 text-cream">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-brass" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Experts() {
  const r = useReveal();
  return (
    <section className="bg-cream py-24 sm:py-32">
      <div ref={r.ref} className={`${r.className} mx-auto max-w-6xl px-5 sm:px-8`}>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-brass">
            {EXPERTS.kicker}
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-ink sm:text-5xl">
            {EXPERTS.heading}
          </h2>
          <p className="mt-4 text-slate-muted">{EXPERTS.intro}</p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {EXPERTS.points.map((p) => (
            <div
              key={p.title}
              className="lift flex items-start gap-4 rounded-2xl border border-ink/10 bg-white p-7 shadow-sm"
            >
              <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-brass" strokeWidth={1.5} />
              <div>
                <h3 className="text-base font-semibold text-ink">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-muted">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const r = useReveal();
  return (
    <section id="pricing" className="bg-cream py-24 sm:py-32">
      <div ref={r.ref} className={`${r.className} mx-auto max-w-6xl px-5 sm:px-8`}>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-brass">
            Transparent pricing
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-ink sm:text-5xl">
            Honest prices. No hidden charges.
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PRICING.map((p) => (
            <div
              key={p.name}
              className={`lift relative flex flex-col rounded-2xl border p-8 ${
                p.featured
                  ? "scale-[1.02] border-brass bg-ink text-cream shadow-xl"
                  : "border-ink/10 bg-white shadow-sm"
              }`}
            >
              {p.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brass px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ink">
                  Most chosen
                </span>
              )}
              <h3
                className={`font-display text-2xl font-semibold ${p.featured ? "text-cream" : "text-ink"}`}
              >
                {p.name}
              </h3>
              <p className={`mt-1 text-sm ${p.featured ? "text-cream/60" : "text-slate-muted"}`}>
                {p.tagline}
              </p>
              <div
                className={`mt-5 font-display text-3xl font-semibold ${p.featured ? "text-brass" : "text-ink"}`}
              >
                {p.price}
              </div>
              <ul
                className={`mt-6 flex-1 space-y-3 text-sm ${p.featured ? "text-cream/80" : "text-ink/80"}`}
              >
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brass" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/book"
                className={`btn-lift mt-8 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold ${
                  p.featured
                    ? "bg-brass text-ink hover:bg-brass-soft"
                    : "border border-ink text-ink hover:bg-ink hover:text-cream"
                }`}
              >
                {p.cta}
              </Link>
            </div>
          ))}
        </div>

        <div className="lift mx-auto mt-10 max-w-2xl rounded-2xl border border-brass/40 bg-white p-6 text-center shadow-sm">
          <p className="font-display text-lg font-semibold text-ink">The mirror-check promise</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-muted">
            No fitting fee is due unless you approve the final look in the mirror. Pay after your
            fitting — UPI, card, or cash. Final pricing confirmed at home after analysis.
          </p>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const r = useReveal();
  return (
    <section className="section-dark grain py-24 sm:py-32">
      <div ref={r.ref} className={`${r.className} mx-auto max-w-6xl px-5 sm:px-8`}>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-brass">
            Quietly confident
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-cream sm:text-5xl">
            What they tell us afterwards.
          </h2>
        </div>

        <div className="mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="card-glass lift flex w-[85%] shrink-0 snap-start flex-col rounded-2xl border border-white/10 p-7 hover:border-white/25 md:w-auto"
            >
              <div className="flex gap-1 text-brass">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < t.rating ? "fill-brass" : "fill-cream/10 text-cream/25"}`}
                  />
                ))}
              </div>
              <blockquote className="mt-5 flex-1 text-cream/85 leading-relaxed">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brass/20 font-semibold text-brass">
                  {t.initials}
                </div>
                <div className="text-sm">
                  <div className="font-medium text-cream">
                    {t.name}, {t.age}
                  </div>
                  <div className="text-cream/50">{t.city}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const r = useReveal();
  return (
    <section id="faq" className="section-dark grain py-24 sm:py-32">
      <div ref={r.ref} className={`${r.className} mx-auto max-w-3xl px-5 sm:px-8`}>
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-brass">Questions</p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-cream sm:text-5xl">
            Everything you wanted to ask.
          </h2>
        </div>

        <Accordion type="single" collapsible className="mt-12 w-full">
          {FAQ.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b border-white/10">
              <AccordionTrigger className="py-5 text-left text-base font-medium text-cream hover:text-brass hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-cream/70 leading-relaxed">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function FinalCta() {
  const r = useReveal();
  return (
    <section className="bg-cream py-24">
      <div ref={r.ref} className={`${r.className} mx-auto max-w-3xl px-5 text-center sm:px-8`}>
        <h2 className="font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
          Your hair is one home visit away.
        </h2>
        <p className="mt-4 text-slate-muted">Free consultation · Delhi NCR · Completely private</p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/book"
            className="btn-lift inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-cream hover:bg-ink-soft"
          >
            Book a Free Home Consultation <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={waLink()}
            target="_blank"
            rel="noreferrer"
            className="btn-lift inline-flex items-center justify-center gap-2 rounded-full border border-ink/30 px-7 py-3.5 text-sm font-medium text-ink hover:border-brass hover:text-brass"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp us
          </a>
        </div>
      </div>
    </section>
  );
}
