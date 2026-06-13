import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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

const inputCls =
  "mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-brass";
const labelCls = "block text-sm font-medium text-muted-foreground";

export default function ProfilePage() {
  const user = getAuthUser();

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
    if (user) setAuthUser({ ...user, name: data.name });
    toast.success("Profile updated");
  };

  return (
    <div className="space-y-8">
      <h1 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">Profile</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg space-y-5">
        {/* Full name */}
        <div>
          <label className={labelCls}>Full name</label>
          <input className={inputCls} placeholder="Your full name" {...register("name")} />
          {errors.name && (
            <p className="mt-1.5 text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Phone — read-only */}
        <div>
          <label className={labelCls}>Phone</label>
          <div className="mt-1.5 flex items-center rounded-xl border border-border bg-muted px-4 py-3">
            <span className="flex-1 text-sm text-foreground">+91 {user?.phone}</span>
            <span className="flex items-center gap-1 text-xs font-medium text-emerald-500">
              <span>✓</span> Verified
            </span>
          </div>
        </div>

        {/* Email */}
        <div>
          <label className={labelCls}>
            Email{" "}
            <span className="text-muted-foreground/60">(optional)</span>
          </label>
          <input
            type="email"
            className={inputCls}
            placeholder="you@example.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label className={labelCls}>Address</label>
          <textarea
            rows={2}
            className={inputCls}
            placeholder="House / Flat, Street, Sector, Landmark"
            {...register("address")}
          />
        </div>

        {/* City */}
        <div>
          <label className={labelCls}>City</label>
          <select className={inputCls} defaultValue="" {...register("city")}>
            <option value="">Select city</option>
            {BRAND.cities.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Hair concern */}
        <div>
          <label className={labelCls}>Hair concern</label>
          <select className={inputCls} defaultValue="" {...register("concern")}>
            <option value="">Select concern</option>
            {CONCERNS.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={!isDirty}
          className="btn-lift cursor-pointer rounded-full bg-brass px-6 py-3 text-sm font-semibold text-ink transition hover:bg-brass-soft disabled:opacity-50"
        >
          Save changes
        </button>
      </form>
    </div>
  );
}
