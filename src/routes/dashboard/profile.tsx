import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, User } from "lucide-react";
import { getAuthUser, setAuthUser } from "@/lib/auth";
import { BRAND } from "@/data/content";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/profile")({
  component: ProfilePage,
});

const schema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Invalid email address").or(z.literal("")).optional(),
  address: z.string().min(8, "Please enter your full address").or(z.literal("")).optional(),
  city: z.string().optional(),
  concern: z.string().optional(),
});
type FormValues = z.infer<typeof schema>;

const CONCERNS = [
  "Receding hairline",
  "Crown thinning",
  "Full top baldness",
  "Patchy loss",
  "Not sure",
];

const fieldCls =
  "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-brass";
const labelCls = "text-xs font-medium uppercase tracking-widest text-slate-muted";

export default function ProfilePage() {
  const user = getAuthUser();
  const [saved, setSaved] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user?.name ?? "",
      email: "",
      address: "",
      city: "",
      concern: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    if (user) {
      setAuthUser({ ...user, name: data.name });
    }
    setSaved(true);
    toast.success("Profile updated");
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">Profile</h1>
        <p className="mt-1 text-sm text-slate-muted">
          Manage your personal details and hair profile
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal info */}
        <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center gap-2 border-b border-border pb-4">
            <User className="h-4 w-4 text-brass" />
            <h2 className="font-display text-base font-semibold text-card-foreground">
              Personal Information
            </h2>
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={labelCls}>Full name</label>
              <input className={fieldCls} placeholder="Your full name" {...register("name")} />
              {errors.name && <p className="mt-1.5 text-xs text-red-600">{errors.name.message}</p>}
            </div>
            <div>
              <label className={labelCls}>Phone number</label>
              <div className="mt-2 flex items-center gap-2 rounded-xl border border-border bg-ink/5 px-4 py-3">
                <span className="text-sm text-slate-muted">+91</span>
                <span className="text-sm text-foreground">{user?.phone}</span>
                <span className="ml-auto rounded-full bg-emerald-500/12 px-2 py-0.5 text-xs font-medium text-emerald-700">
                  Verified
                </span>
              </div>
              <p className="mt-1.5 text-xs text-slate-muted">
                Phone cannot be changed — contact support
              </p>
            </div>
            <div>
              <label className={labelCls}>Email (optional)</label>
              <input
                type="email"
                className={fieldCls}
                placeholder="you@example.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-600">{errors.email.message}</p>
              )}
            </div>
          </div>
        </section>

        {/* Address */}
        <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h2 className="border-b border-border pb-4 font-display text-base font-semibold text-card-foreground">
            Home Address
          </h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={labelCls}>Full address</label>
              <textarea
                rows={3}
                className={fieldCls}
                placeholder="House / Flat, Street, Sector, Landmark"
                {...register("address")}
              />
            </div>
            <div>
              <label className={labelCls}>City</label>
              <select className={fieldCls} defaultValue="" {...register("city")}>
                <option value="">Select city</option>
                {BRAND.cities.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Hair profile */}
        <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h2 className="border-b border-border pb-4 font-display text-base font-semibold text-card-foreground">
            Hair Profile
          </h2>
          <div className="mt-5">
            <label className={labelCls}>Primary concern</label>
            <select className={fieldCls} defaultValue="" {...register("concern")}>
              <option value="">Select concern</option>
              {CONCERNS.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
        </section>

        {/* Save button */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={!isDirty && !saved}
            className="btn-lift flex cursor-pointer items-center gap-2 rounded-full bg-brass px-6 py-3 text-sm font-semibold text-ink transition hover:bg-brass-soft disabled:opacity-50"
          >
            {saved ? (
              <>
                <Check className="h-4 w-4" /> Saved
              </>
            ) : (
              "Save changes"
            )}
          </button>
          {isDirty && !saved && (
            <p className="text-xs text-slate-muted">You have unsaved changes</p>
          )}
        </div>
      </form>
    </div>
  );
}
