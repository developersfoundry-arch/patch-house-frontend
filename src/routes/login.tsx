import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { signInWithPopup } from "firebase/auth";
import { BRAND } from "@/data/content";
import { setAuthUser, isAuthenticated } from "@/lib/auth";
import { getFirebaseAuth, getGoogleProvider } from "@/lib/firebase";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
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
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const { data: existingUser } = useQuery({
    queryKey: ["me"],
    queryFn: () => api.get<User>("/me"),
    retry: false,
    enabled: isAuthenticated(),
  });

  useEffect(() => {
    if (existingUser) navigate({ to: "/dashboard", replace: true });
  }, [existingUser, navigate]);

  const handleGoogleLogin = async () => {
    setErr(null);
    setLoading(true);
    try {
      const result = await signInWithPopup(getFirebaseAuth(), getGoogleProvider());
      const idToken = await result.user.getIdToken();
      const user = await api.post<User>("/auth/firebase", { id_token: idToken });
      setAuthUser({ id: user.id, phone: user.phone ?? "", name: user.name });
      navigate({ to: "/dashboard", replace: true });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Sign-in failed";
      // User closed the popup — don't show an error
      if (!msg.includes("popup-closed")) setErr("Sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-5 py-16 grain">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="mb-10 block text-center font-display text-2xl font-semibold text-ink"
        >
          {BRAND.name.replace("House", "")}
          <span className="text-brass">House</span>
        </Link>

        <div className="rounded-3xl border border-ink/10 bg-white p-8 shadow-xl">
          <h1 className="font-display text-3xl font-semibold text-ink">Welcome back</h1>
          <p className="mt-2 text-sm text-ink/60">Sign in to manage your bookings.</p>

          <div className="mt-8">
            {err && <p className="mb-4 text-sm text-red-600">{err}</p>}
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="btn-lift flex w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-brass py-3.5 text-sm font-semibold text-ink hover:bg-brass-soft disabled:opacity-60"
            >
              {loading ? (
                "Signing in…"
              ) : (
                <>
                  <GoogleIcon />
                  Continue with Google
                </>
              )}
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-ink/50">
          By continuing you agree to our private &amp; confidential service terms.
        </p>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}
