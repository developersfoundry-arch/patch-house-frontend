import { useEffect, useRef, useState } from "react";
import { X, Share } from "lucide-react";
import { BRAND } from "@/data/content";

const DISMISS_KEY = "sah-pwa-dismissed";
const DISMISS_TTL = 14 * 24 * 60 * 60 * 1000; // 14 days

type Platform = "android" | "ios" | null;

// ── Detection helpers ──────────────────────────────────────────────────────

function isMobile() {
  if (typeof window === "undefined") return false;
  return (
    /android|iphone|ipad|ipod/i.test(navigator.userAgent) ||
    // iPad on iOS 13+ reports as MacIntel with touch points
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}

function isIOS() {
  if (typeof window === "undefined") return false;
  return (
    /iphone|ipad|ipod/i.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}

function isInstalled() {
  if (typeof window === "undefined") return false;
  // Android/desktop Chrome: display-mode standalone means already installed
  // iOS Safari: navigator.standalone is true when launched from home screen
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (navigator as any).standalone === true
  );
}

function wasDismissedRecently() {
  try {
    const ts = localStorage.getItem(DISMISS_KEY);
    return ts !== null && Date.now() - parseInt(ts) < DISMISS_TTL;
  } catch {
    return false;
  }
}

function saveDismissed() {
  try {
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
  } catch { /* ignore */ }
}

// ── Component ──────────────────────────────────────────────────────────────

export function InstallPrompt() {
  const [platform, setPlatform] = useState<Platform>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const deferredRef = useRef<any>(null);

  useEffect(() => {
    if (!isMobile() || isInstalled() || wasDismissedRecently()) return;

    // Android Chrome / Edge / Samsung — native install event
    const onBeforeInstall = (e: Event) => {
      e.preventDefault();
      deferredRef.current = e;
      setPlatform("android");
    };
    window.addEventListener("beforeinstallprompt", onBeforeInstall);

    // iOS Safari — no event, so show instructions after a delay
    // Only set iOS if beforeinstallprompt never fired (Android would have fired first)
    let iosTimer: ReturnType<typeof setTimeout> | undefined;
    if (isIOS()) {
      iosTimer = setTimeout(() => {
        if (!deferredRef.current) setPlatform("ios");
      }, 5000); // wait 5 s of engagement before prompting
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      clearTimeout(iosTimer);
    };
  }, []);

  const dismiss = () => {
    setPlatform(null);
    saveDismissed();
  };

  const install = async () => {
    const prompt = deferredRef.current;
    if (!prompt) return;
    prompt.prompt();
    const { outcome } = await prompt.userChoice;
    deferredRef.current = null;
    setPlatform(null);
    if (outcome !== "accepted") saveDismissed();
  };

  if (!platform) return null;

  return (
    <div
      role="dialog"
      aria-label="Add to Home Screen"
      className="fixed bottom-4 left-4 right-4 z-50 sm:bottom-6 sm:left-auto sm:right-6 sm:w-80"
    >
      <div className="relative rounded-2xl border border-white/10 bg-ink shadow-2xl">
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss"
          className="absolute right-3 top-3 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-cream/40 transition hover:bg-white/10 hover:text-cream"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-start gap-3 p-4 pr-10">
          {/* Mini brand icon */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brass font-display text-xl font-bold text-ink">
            S
          </div>

          <div className="min-w-0">
            <p className="font-semibold text-cream">{BRAND.name}</p>

            {platform === "android" && (
              <>
                <p className="mt-0.5 text-sm text-cream/70">
                  Add to your home screen — opens instantly like an app.
                </p>
                <button
                  type="button"
                  onClick={install}
                  className="btn-lift mt-3 rounded-full bg-brass px-4 py-1.5 text-sm font-semibold text-ink"
                >
                  Add to Home Screen
                </button>
              </>
            )}

            {platform === "ios" && (
              <p className="mt-1 text-sm leading-relaxed text-cream/70">
                Tap{" "}
                <Share className="inline-block h-4 w-4 align-text-bottom text-cream" />{" "}
                in Safari, then{" "}
                <span className="font-semibold text-cream">Add to Home Screen</span>.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
