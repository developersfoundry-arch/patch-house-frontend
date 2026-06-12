import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { BRAND, waLink } from "@/data/content";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book your free home consultation — StrandsAtHome" },
      { name: "description", content: "Book a free, private at-home hair patch consultation in Delhi NCR." },
    ],
  }),
  component: BookPage,
});

const schema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  phone: z.string().regex(/^\d{10}$/, "Please enter a 10-digit mobile number"),
  city: z.string().min(1, "Please select your city"),
  address: z.string().min(8, "Please enter your full address"),
  date: z.string().min(1, "Pick a date"),
  slot: z.string().min(1, "Pick a time slot"),
  concern: z.string().min(1, "Please pick one"),
  notes: z.string().optional(),
});
type FormValues = z.infer<typeof schema>;

const SLOTS = ["Morning 9–12", "Afternoon 12–4", "Evening 4–8"];
const CONCERNS = [
  "Receding hairline",
  "Crown thinning",
  "Full top baldness",
  "Patchy loss",
  "Not sure",
];

const fieldCls =
  "mt-2 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-brass";
const labelCls = "text-xs font-medium uppercase tracking-widest text-slate-muted";

function BookPage() {
  const [done, setDone] = useState<FormValues | null>(null);
  const today = new Date().toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormValues) => {
    console.log("Booking submitted:", data);
    setDone(data);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="section-dark grain min-h-screen px-5 py-14 sm:py-20">
      <div className="mx-auto max-w-xl">
        <Link to="/" className="mb-8 block text-center font-display text-xl font-semibold text-cream">
          {BRAND.name.replace("AtHome", "")}
          <span className="text-brass">AtHome</span>
        </Link>

        {done ? <Success data={done} /> : (
          <>
            <div className="text-center">
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-brass">
                Free Home Consultation
              </p>
              <h1 className="mt-3 font-display text-3xl font-semibold text-cream sm:text-4xl">
                Book your home visit
              </h1>
              <p className="mt-3 text-sm text-cream/70">
                Takes under 2 minutes. We'll WhatsApp you to confirm.
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-8 space-y-5 rounded-3xl bg-cream p-6 shadow-2xl sm:p-8"
            >
              <Field label="Full name" error={errors.name?.message}>
                <input className={fieldCls} placeholder="Your name" {...register("name")} />
              </Field>

              <Field label="Phone number" error={errors.phone?.message}>
                <div className="mt-2 flex items-center gap-2 rounded-xl border border-ink/15 bg-white px-4 py-3 focus-within:border-brass">
                  <span className="text-ink/70">+91</span>
                  <input
                    inputMode="numeric"
                    maxLength={10}
                    placeholder="98XXXXXXXX"
                    className="flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink/30"
                    {...register("phone")}
                  />
                </div>
              </Field>

              <Field label="City" error={errors.city?.message}>
                <select className={fieldCls} defaultValue="" {...register("city")}>
                  <option value="" disabled>Select your city</option>
                  {BRAND.cities.map((c) => <option key={c}>{c}</option>)}
                </select>
              </Field>

              <Field label="Full address" error={errors.address?.message}>
                <textarea
                  rows={3}
                  className={fieldCls}
                  placeholder="House / Flat, Street, Sector, Landmark"
                  {...register("address")}
                />
              </Field>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Preferred date" error={errors.date?.message}>
                  <input type="date" min={today} className={fieldCls} {...register("date")} />
                </Field>
                <Field label="Time slot" error={errors.slot?.message}>
                  <select className={fieldCls} defaultValue="" {...register("slot")}>
                    <option value="" disabled>Pick a slot</option>
                    {SLOTS.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </Field>
              </div>

              <Field label="Hair concern" error={errors.concern?.message}>
                <select className={fieldCls} defaultValue="" {...register("concern")}>
                  <option value="" disabled>What brings you here?</option>
                  {CONCERNS.map((c) => <option key={c}>{c}</option>)}
                </select>
              </Field>

              <Field label="Notes (optional)">
                <textarea
                  rows={2}
                  className={fieldCls}
                  placeholder="Anything we should know?"
                  {...register("notes")}
                />
              </Field>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-ink py-4 text-sm font-semibold text-cream transition hover:bg-ink-soft disabled:opacity-60"
              >
                Confirm my free visit <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <p className="mt-6 text-center text-xs text-cream/55">
              Our expert arrives in plain, unbranded attire. Your privacy is guaranteed.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}

function Success({ data }: { data: FormValues }) {
  return (
    <div className="rounded-3xl border border-brass/30 bg-white/[0.03] p-8 text-center backdrop-blur sm:p-12">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brass text-ink shadow-lg animate-[reveal-up_0.6s_ease-out_forwards]">
        <Check className="h-8 w-8" strokeWidth={2.5} />
      </div>
      <h1 className="mt-6 font-display text-3xl font-semibold text-cream sm:text-4xl">
        You're booked!
      </h1>
      <p className="mt-3 text-cream/70">
        Hi {data.name.split(" ")[0]}, our expert will reach out to confirm.
      </p>

      <dl className="mx-auto mt-8 grid max-w-sm gap-3 rounded-2xl border border-white/10 bg-ink/40 p-5 text-left text-sm">
        <Row k="When" v={`${data.date} · ${data.slot}`} />
        <Row k="Where" v={`${data.address}, ${data.city}`} />
        <Row k="Phone" v={`+91 ${data.phone}`} />
        <Row k="Concern" v={data.concern} />
      </dl>

      <a
        href={waLink(`Hi! I just booked a home visit for ${data.date} (${data.slot}) in ${data.city}. Please share confirmation.`)}
        target="_blank"
        rel="noreferrer"
        className="mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
        style={{ backgroundColor: "#25D366" }}
      >
        <MessageCircle className="h-4 w-4" /> Get confirmation on WhatsApp
      </a>

      <div className="mt-5">
        <Link to="/" className="text-xs text-cream/50 hover:text-brass">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-white/5 pb-2 last:border-0 last:pb-0">
      <dt className="text-cream/50">{k}</dt>
      <dd className="text-right text-cream">{v}</dd>
    </div>
  );
}
