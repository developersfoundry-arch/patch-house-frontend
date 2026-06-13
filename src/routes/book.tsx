import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight } from "lucide-react";
import { BRAND } from "@/data/content";
import { setAuthUser, DEMO_OTP } from "@/lib/auth";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book your free home consultation — StrandsAtHome" },
      {
        name: "description",
        content: "Book a free, private at-home hair patch consultation in Delhi NCR.",
      },
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
  const navigate = useNavigate();
  const [step, setStep] = useState<"form" | "otp">("form");
  const [bookingData, setBookingData] = useState<FormValues | null>(null);
  const [otp, setOtp] = useState("");
  const [otpErr, setOtpErr] = useState<string | null>(null);
  const today = new Date().toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormValues) => {
    setBookingData(data);
    setStep("otp");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submitOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(otp)) {
      setOtpErr("Enter the 6-digit OTP");
      return;
    }
    if (otp !== DEMO_OTP) {
      setOtpErr("Incorrect OTP. Please try again.");
      return;
    }
    setOtpErr(null);
    setAuthUser({ phone: bookingData!.phone, name: bookingData!.name });
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="section-dark grain min-h-screen px-5 py-14 sm:py-20">
      <div className="mx-auto max-w-xl">
        <Link
          to="/"
          className="mb-8 block text-center font-display text-xl font-semibold text-cream"
        >
          {BRAND.name.replace("AtHome", "")}
          <span className="text-brass">AtHome</span>
        </Link>

        {step === "otp" && bookingData ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur sm:p-10">
            <div className="text-center">
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-brass">
                One last step
              </p>
              <h1 className="mt-3 font-display text-3xl font-semibold text-cream">
                Verify your number
              </h1>
              <p className="mt-3 text-sm text-cream/70">OTP sent to +91 {bookingData.phone}</p>
            </div>
            <form onSubmit={submitOtp} className="mt-8 space-y-5">
              <div>
                <label className="text-xs font-medium uppercase tracking-widest text-cream/60">
                  Enter 6-digit OTP
                </label>
                <input
                  inputMode="numeric"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  placeholder="••••••"
                  className="mt-2 w-full rounded-xl border border-white/15 bg-ink/40 px-4 py-3 text-center text-2xl tracking-[0.5em] text-cream outline-none placeholder:text-cream/20 focus:border-brass"
                />
                {otpErr && <p className="mt-2 text-xs text-red-400">{otpErr}</p>}
              </div>
              <button
                type="submit"
                className="btn-lift flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-brass py-3.5 text-sm font-semibold text-ink hover:bg-brass-soft"
              >
                Confirm my visit <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setStep("form");
                  setOtp("");
                  setOtpErr(null);
                }}
                className="block w-full cursor-pointer text-center text-xs text-cream/60 hover:text-brass"
              >
                ← Edit booking details
              </button>
            </form>
          </div>
        ) : (
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
                  <option value="" disabled>
                    Select your city
                  </option>
                  {BRAND.cities.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
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
                    <option value="" disabled>
                      Pick a slot
                    </option>
                    {SLOTS.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label="Hair concern" error={errors.concern?.message}>
                <select className={fieldCls} defaultValue="" {...register("concern")}>
                  <option value="" disabled>
                    What brings you here?
                  </option>
                  {CONCERNS.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
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
                className="btn-lift mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-ink py-4 text-sm font-semibold text-cream hover:bg-ink-soft disabled:opacity-60"
              >
                Continue to verify <ArrowRight className="h-4 w-4" />
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
