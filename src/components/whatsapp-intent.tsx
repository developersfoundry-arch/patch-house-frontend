import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { signInWithGoogle } from "@/lib/firebase";
import { getAuthUser, setAuthUser, isAuthenticated } from "@/lib/auth";
import { api } from "@/lib/api";
import { waLink } from "@/data/content";
import type { User } from "@/lib/types";

type Step = "prompt" | "signing-in" | "phone" | "saving";

export function WhatsAppButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("prompt");
  const [phone, setPhone] = useState("");
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setStep("prompt");
        setPhone("");
        setErr(null);
      }, 200);
      return () => clearTimeout(t);
    }
  }, [open]);

  function openWA() {
    window.open(waLink(), "_blank", "noopener,noreferrer");
  }

  function handleClick() {
    const user = getAuthUser();
    if (user?.phone) { openWA(); return; }
    setStep(isAuthenticated() ? "phone" : "prompt");
    setOpen(true);
  }

  function skip() { setOpen(false); openWA(); }

  async function handleGoogle() {
    setErr(null);
    setStep("signing-in");
    try {
      const result = await signInWithGoogle();
      const idToken = await result.user.getIdToken();
      const user = await api.post<User>("/auth/firebase", { id_token: idToken });
      setAuthUser({ id: user.id, phone: user.phone ?? "", name: user.name });
      queryClient.setQueryData(["me"], user);
      if (user.phone) { setOpen(false); openWA(); }
      else setStep("phone");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "";
      if (!msg.includes("popup-closed")) setErr("Sign-in failed. Please try again.");
      setStep("prompt");
    }
  }

  async function handlePhone() {
    if (!/^[6-9]\d{9}$/.test(phone)) {
      setErr("Enter a valid 10-digit mobile number");
      return;
    }
    setErr(null);
    setStep("saving");
    try {
      const updated = await api.put<User>("/me", { phone });
      const auth = getAuthUser();
      if (auth) setAuthUser({ ...auth, phone: updated.phone });
      queryClient.setQueryData(["me"], updated);
      setOpen(false);
      openWA();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed to save. Try again.");
      setStep("phone");
    }
  }

  const busy = step === "signing-in" || step === "saving";

  return (
    <>
      <button type="button" {...props} onClick={handleClick}>
        {children}
      </button>

      <Dialog open={open} onOpenChange={(o) => { if (!busy) setOpen(o); }}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2.5 font-display text-lg">
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: "#25D366" }}
              >
                <MessageCircle className="h-3.5 w-3.5 text-white" />
              </span>
              {step === "phone" || step === "saving" ? "One last thing" : "Quick sign-in"}
            </DialogTitle>
          </DialogHeader>

          {(step === "prompt" || step === "signing-in") && (
            <div className="space-y-4 pt-1">
              <p className="text-sm text-muted-foreground">
                Sign in to track this conversation in your dashboard — or skip and go straight to WhatsApp.
              </p>
              {err && <p className="text-xs text-red-500">{err}</p>}
              <button
                onClick={handleGoogle}
                disabled={busy}
                className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-brass py-3 text-sm font-semibold text-ink transition hover:bg-brass-soft disabled:opacity-60"
              >
                {step === "signing-in" ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink border-t-transparent" />
                ) : (
                  <GoogleIcon />
                )}
                {step === "signing-in" ? "Signing in…" : "Continue with Google"}
              </button>
              <button
                onClick={skip}
                disabled={busy}
                className="w-full cursor-pointer text-center text-sm text-muted-foreground transition hover:text-foreground disabled:opacity-40"
              >
                Skip — open WhatsApp directly →
              </button>
            </div>
          )}

          {(step === "phone" || step === "saving") && (
            <div className="space-y-4 pt-1">
              <p className="text-sm text-muted-foreground">
                Add your mobile number so we can link your WhatsApp chat to your dashboard.
              </p>
              <div>
                <div className="flex overflow-hidden rounded-xl border border-border bg-background focus-within:border-brass">
                  <span className="shrink-0 border-r border-border bg-muted px-3 py-3 text-sm text-muted-foreground">
                    +91
                  </span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    placeholder="98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    onKeyDown={(e) => e.key === "Enter" && handlePhone()}
                    className="flex-1 bg-transparent px-3 py-3 text-sm text-foreground outline-none"
                    autoFocus
                    disabled={step === "saving"}
                  />
                </div>
                {err && <p className="mt-1.5 text-xs text-red-500">{err}</p>}
              </div>
              <button
                onClick={handlePhone}
                disabled={step === "saving" || phone.length < 10}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-brass py-3 text-sm font-semibold text-ink transition hover:bg-brass-soft disabled:opacity-50"
              >
                {step === "saving" && (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink border-t-transparent" />
                )}
                {step === "saving" ? "Saving…" : "Save & open WhatsApp"}
              </button>
              <button
                onClick={skip}
                disabled={step === "saving"}
                className="w-full cursor-pointer text-center text-sm text-muted-foreground transition hover:text-foreground disabled:opacity-40"
              >
                Skip — open WhatsApp directly →
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" aria-hidden="true">
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
