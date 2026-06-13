import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { signInWithPhoneNumber, RecaptchaVerifier, type ConfirmationResult } from "firebase/auth";
import { BRAND } from "@/data/content";
import { setAuthUser, isAuthenticated } from "@/lib/auth";
import { getFirebaseAuth } from "@/lib/firebase";
import { api } from "@/lib/api";
import type { User } from "@/lib/types";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — PatchHouse" },
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
  const [loading, setLoading] = useState(false);

  const verifierRef = useRef<RecaptchaVerifier | null>(null);
  const confirmationRef = useRef<ConfirmationResult | null>(null);

  // If already authenticated locally, verify with API and redirect
  const { data: existingUser } = useQuery({
    queryKey: ["me"],
    queryFn: () => api.get<User>("/me"),
    retry: false,
    enabled: isAuthenticated(),
  });

  useEffect(() => {
    if (existingUser) navigate({ to: "/dashboard", replace: true });
  }, [existingUser, navigate]);

  useEffect(() => {
    verifierRef.current = new RecaptchaVerifier(getFirebaseAuth(), "recaptcha-container", {
      size: "invisible",
    });
    return () => {
      verifierRef.current?.clear();
      verifierRef.current = null;
    };
  }, []);

  const submitPhone = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(phone)) {
      setErr("Please enter a 10-digit mobile number");
      return;
    }
    setErr(null);
    setLoading(true);
    try {
      if (!verifierRef.current) {
        verifierRef.current = new RecaptchaVerifier(getFirebaseAuth(), "recaptcha-container", {
          size: "invisible",
        });
      }
      const confirmation = await signInWithPhoneNumber(getFirebaseAuth(), `+91${phone}`, verifierRef.current);
      confirmationRef.current = confirmation;
      setStep("otp");
    } catch {
      setErr("Failed to send OTP. Please check the number and try again.");
      verifierRef.current?.clear();
      verifierRef.current = new RecaptchaVerifier(getFirebaseAuth(), "recaptcha-container", {
        size: "invisible",
      });
    } finally {
      setLoading(false);
    }
  };

  const submitOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(otp)) {
      setErr("Enter the 6-digit OTP");
      return;
    }
    setErr(null);
    setLoading(true);
    try {
      const credential = await confirmationRef.current!.confirm(otp);
      const idToken = await credential.user.getIdToken();
      const user = await api.post<User>("/auth/firebase", { id_token: idToken });
      setAuthUser({ id: user.id, phone: user.phone, name: user.name });
      navigate({ to: "/dashboard", replace: true });
    } catch {
      setErr("Incorrect OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-dark grain flex min-h-screen items-center justify-center px-5 py-16">
      <div id="recaptcha-container" />
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="mb-10 block text-center font-display text-2xl font-semibold text-cream"
        >
          {BRAND.name.replace("House", "")}
          <span className="text-brass">House</span>
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
                disabled={loading}
                className="btn-lift flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-brass py-3.5 text-sm font-semibold text-ink hover:bg-brass-soft disabled:opacity-60"
              >
                {loading ? "Sending…" : <>Send OTP <ArrowRight className="h-4 w-4" /></>}
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
                disabled={loading}
                className="btn-lift flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-brass py-3.5 text-sm font-semibold text-ink hover:bg-brass-soft disabled:opacity-60"
              >
                {loading ? "Verifying…" : <>Verify &amp; continue <ArrowRight className="h-4 w-4" /></>}
              </button>
              <button
                type="button"
                onClick={() => { setStep("phone"); setOtp(""); setErr(null); }}
                className="block w-full cursor-pointer text-center text-xs text-cream/60 hover:text-brass"
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
