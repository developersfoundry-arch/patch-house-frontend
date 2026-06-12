import { BRAND, waLink } from "@/data/content";
import { Phone, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="section-dark grain border-t border-white/10">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-4">
        <div>
          <div className="font-display text-2xl font-semibold text-cream">
            {BRAND.name.replace("AtHome", "")}
            <span className="text-brass">AtHome</span>
          </div>
          <p className="mt-3 text-sm text-cream/70">
            Discreet, expert-led at-home hair patch fittings across Delhi NCR.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-medium uppercase tracking-widest text-brass">
            Service Areas
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            {BRAND.cities.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-medium uppercase tracking-widest text-brass">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            <li>
              <a href="/#how" className="hover:text-brass">
                How it works
              </a>
            </li>
            <li>
              <a href="/#results" className="hover:text-brass">
                Results
              </a>
            </li>
            <li>
              <a href="/#pricing" className="hover:text-brass">
                Pricing
              </a>
            </li>
            <li>
              <a href="/#faq" className="hover:text-brass">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-medium uppercase tracking-widest text-brass">Talk to us</h4>
          <div className="mt-4 space-y-3 text-sm text-cream/80">
            <a
              href={`tel:+${BRAND.whatsappNumber}`}
              className="flex items-center gap-2 hover:text-brass"
            >
              <Phone className="h-4 w-4" /> +91 99999 99999
            </a>
            <a
              href={waLink()}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 hover:text-brass"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp us
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-6 text-xs text-cream/50 sm:flex-row sm:px-8">
          <p>
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
          <p>100% private &amp; confidential service.</p>
        </div>
      </div>
    </footer>
  );
}
