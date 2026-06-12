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
  // Keep every useThemeMode() instance (navbar desktop + mobile, root) in sync
  window.dispatchEvent(new Event(MODE_EVENT));
}

export function useThemeMode() {
  const [mode, setMode] = useState<Mode>("dark");
  useEffect(() => {
    const saved = (localStorage.getItem(MODE_KEY) as Mode | null) ?? "dark";
    setMode(saved);
    applyMode(saved);
    const sync = () => setMode(currentMode());
    window.addEventListener(MODE_EVENT, sync);
    return () => window.removeEventListener(MODE_EVENT, sync);
  }, []);
  const toggle = () => {
    // Read from the DOM, not local state — another instance may have toggled since
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
        "flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 text-cream transition hover:border-brass hover:text-brass " +
        className
      }
    >
      {mode === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}
