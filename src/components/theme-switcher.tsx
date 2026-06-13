import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

type Mode = "dark" | "light";
const MODE_KEY = "sah-mode";
const MODE_EVENT = "sah-mode-change";

function currentMode(): Mode {
  return document.documentElement.getAttribute("data-mode") === "light" ? "light" : "dark";
}

function applyMode(mode: Mode) {
  const root = document.documentElement;
  if (mode === "light") root.setAttribute("data-mode", "light");
  else root.removeAttribute("data-mode");
  window.dispatchEvent(new Event(MODE_EVENT));
}

function osPrefersDark(): boolean {
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
}

export function useThemeMode() {
  const [mode, setMode] = useState<Mode>("light");

  useEffect(() => {
    const saved = localStorage.getItem(MODE_KEY) as Mode | null;

    if (saved) {
      setMode(saved);
      applyMode(saved);
    } else {
      // No saved preference — follow OS, defaulting to light
      const initial: Mode = osPrefersDark() ? "dark" : "light";
      setMode(initial);
      applyMode(initial);
    }

    const sync = () => setMode(currentMode());
    window.addEventListener(MODE_EVENT, sync);

    // When OS theme changes and user hasn't pinned a preference, follow it live
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onOsChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem(MODE_KEY)) {
        const next: Mode = e.matches ? "dark" : "light";
        applyMode(next);
      }
    };
    mq.addEventListener("change", onOsChange);

    return () => {
      window.removeEventListener(MODE_EVENT, sync);
      mq.removeEventListener("change", onOsChange);
    };
  }, []);

  const toggle = () => {
    const next: Mode = currentMode() === "dark" ? "light" : "dark";
    applyMode(next);
    localStorage.setItem(MODE_KEY, next);
  };

  return { mode, toggle };
}

export function ThemeSwitcher({ className = "" }: { className?: string }) {
  const { mode, toggle } = useThemeMode();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className={
        "flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-cream/25 text-cream transition hover:border-brass hover:text-brass " +
        className
      }
    >
      {mode === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}
