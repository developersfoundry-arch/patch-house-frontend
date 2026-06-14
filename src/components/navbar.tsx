import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { BRAND } from "@/data/content";
import { ThemeSwitcher } from "@/components/theme-switcher";

const links = [
  { href: "#how", label: "How it works" },
  { href: "#results", label: "Results" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? "border-b border-white/10 bg-ink/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-xl font-semibold tracking-tight text-cream">
            {BRAND.name.replace(BRAND.nameAccent, "")}
            <span className="text-brass">{BRAND.nameAccent}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={`/${l.href}`}
              className="text-sm text-cream/80 transition hover:text-brass"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeSwitcher />
          <Link
            to="/login"
            className="rounded-full px-4 py-2 text-sm text-cream/90 transition hover:text-brass"
          >
            Login
          </Link>
          <Link
            to="/book"
            className="btn-lift rounded-full bg-brass px-5 py-2.5 text-sm font-medium text-ink hover:bg-brass-soft"
          >
            Book Home Visit
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeSwitcher />
          <button aria-label="Open menu" className="text-cream" onClick={() => setOpen((o) => !o)}>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-ink/95 backdrop-blur md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={`/${l.href}`}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-cream/90 hover:bg-white/5"
              >
                {l.label}
              </a>
            ))}
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-cream/90 hover:bg-white/5"
            >
              Login
            </Link>
            <Link
              to="/book"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-brass px-5 py-3 text-center text-sm font-medium text-ink"
            >
              Book Home Visit
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
