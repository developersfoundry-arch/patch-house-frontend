import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight } from "lucide-react";
import { signInWithPopup } from "firebase/auth";
import { BRAND } from "@/data/content";
import { setAuthUser, isAuthenticated } from "@/lib/auth";
import { getFirebaseAuth, getGoogleProvider } from "@/lib/firebase";
import { api } from "@/lib/api";
import { toast } from "sonner";
import type { User, Appointment } from "@/lib/types";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book your free home consultation — PatchHouse" },
      {
        name: "description",
        content: "Book a free, private at-home hair patch consultation in Delhi NCR.",
      },
    ],
  }),
  component: BookPage,
});

const SLOTS = [
  { label: "Morning (9 AM – 12 PM)", value: "morning" as const },
  { label: "Afternoon (12 PM – 4 PM)", value: "afternoon" as const },
  { label: "Evening (4 PM – 8 PM)", value: "evening" as const },
];

const CONCERNS = [
  "Receding hairline",
  "Crown thinning",
  "Full top baldness",
  "Patchy loss",
  "Not sure",
];

const schema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  phone: z.string().regex(/^\d{10}$/, "Please enter a 10-digit mobile number"),
  city: z.string().min(1, "Please select your city"),
  address: z.string().min(8, "Please enter your full address"),
  date: z.string().min(1, "Pick a date"),
  slot: z.enum(["morning", "afternoon", "evening"], {
    errorMap: () => ({ message: "Pick a time slot" }),
  }),
  concern: z.string().min(1, "Please pick one"),
  notes: z.string().optional(),
});
type FormValues = z.infer<typeof schema>;

const fieldCls =
  "mt-2 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-brass";
const labelCls = "text-xs font-medium uppercase tracking-widest text-slate-muted";

function BookPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      // 1. Authenticate with Google if no active session
      if (!isAuthenticated()) {
        const result = await signInWithPopup(getFirebaseAuth(), getGoogleProvider());
        const idToken = await result.user.getIdToken();
        const user = await api.post<User>("/auth/firebase", { id_token: idToken });
        setAuthUser({ id: user.id, phone: data.phone, name: data.name });
      }

      // 2. Save profile details (including phone as contact number)
      await api.put<User>("/me", {
        name: data.name,
        phone: data.phone,
        address: data.address,
        city: data.city,
        concern: data.concern,
      });

      // 3. Create the appointment
      const appt = await api.post<Appointment>("/appointments", {
        service_type: "Hair Patch Fitting",
        preferred_date: data.date,
        time_slot: data.slot,
        address: data.address,
        city: data.city,
        notes: data.notes ?? "",
      });

      toast.success(`Booking confirmed! Ref: ${appt.booking_ref}`);
      navigate({ to: "/dashboard", replace: true });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      if (!msg.includes("popup-closed")) toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-dark grain min-h-screen px-5 py-14 sm:py-20">
      <div className="mx-auto max-w-xl">
        <Link
          to="/"
          className="mb-8 block text-center font-display text-xl font-semibold text-cream"
        >
          {BRAND.name.replace("House", "")}
          <span className="text-brass">House</span>
        </Link>

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
              className="mt-8 space-y-5 rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
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
                    {SLOTS.map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
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
                disabled={loading}
                className="btn-lift mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-brass py-4 text-sm font-semibold text-ink hover:bg-brass-soft disabled:opacity-60"
              >
                {loading ? "Signing in…" : <>Book my visit <ArrowRight className="h-4 w-4" /></>}
              </button>
            </form>

            <p className="mt-6 text-center text-xs text-cream/55">
              Our expert arrives in plain, unbranded attire. Your privacy is guaranteed.
            </p>
          </>
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
