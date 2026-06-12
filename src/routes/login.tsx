import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { BRAND } from "@/data/content";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — StrandsAtHome" },
      { name: "description", content: "Log in to manage your at-home hair patch booking." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [err, setErr] = useState<string | null>(null);

  const submitPhone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(phone)) {
      setErr("Please enter a 10-digit mobile number");
      return;
    }
    setErr(null);
    setStep("otp");
  };

  const submitOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(otp)) {
      setErr("Enter the 6-digit OTP");
      return;
    }
    setErr(null);
    navigate({ to: "/book" });
  };

  return (
    <div className="section-dark grain flex min-h-screen items-center justify-center px-5 py-16">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="mb-10 block text-center font-display text-2xl font-semibold text-cream"
        >
          {BRAND.name.replace("AtHome", "")}
          <span className="text-brass">AtHome</span>
        </Link>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur">
          <h1 className="font-display text-3xl font-semibold text-cream">Welcome back</h1>
          <p className="mt-2 text-sm text-cream/70">
            {step === "phone" ? "Log in with your phone number." : `OTP sent to +91 ${phone}`}
          </p>

          {step === "phone" ? (
            <form onSubmit={submitPhone} className="mt-8 space-y-5">
              <div>
                <label className="text-xs font-medium uppercase tracking-widest text-cream/60">
                  Mobile number
                </label>
                <div className="mt-2 flex items-center gap-2 rounded-xl border border-white/15 bg-ink/40 px-4 py-3 focus-within:border-brass">
                  <span className="text-cream/70">+91</span>
                  <input
                    inputMode="numeric"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    placeholder="98XXXXXXXX"
                    className="flex-1 bg-transparent text-cream outline-none placeholder:text-cream/30"
                  />
                </div>
                {err && <p className="mt-2 text-xs text-red-400">{err}</p>}
              </div>
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-brass py-3.5 text-sm font-semibold text-ink transition hover:bg-brass-soft"
              >
                Send OTP <ArrowRight className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-3 py-2">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-xs text-cream/50">OR</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              <button
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-full border border-white/20 bg-white py-3 text-sm font-medium text-ink transition hover:bg-cream"
              >
                <GoogleIcon />
                Continue with Google
              </button>
            </form>
          ) : (
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
                {err && <p className="mt-2 text-xs text-red-400">{err}</p>}
              </div>
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-brass py-3.5 text-sm font-semibold text-ink transition hover:bg-brass-soft"
              >
                Verify &amp; continue <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setStep("phone");
                  setOtp("");
                  setErr(null);
                }}
                className="block w-full text-center text-xs text-cream/60 hover:text-brass"
              >
                Use a different number
              </button>
            </form>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-cream/50">
          By continuing you agree to our private &amp; confidential service terms.
        </p>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.56c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.76c-.99.66-2.25 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.11A6.6 6.6 0 0 1 5.48 12c0-.73.13-1.44.36-2.11V7.05H2.18A11 11 0 0 0 1 12c0 1.77.42 3.45 1.18 4.95l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.05l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
      />
    </svg>
  );
}
