import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { waLink } from "@/data/content";

export function WhatsAppFab() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-2xl transition-transform duration-300 hover:-translate-y-1 hover:scale-110 active:scale-95"
      style={{ backgroundColor: "#25D366" }}
    >
      <span
        className="pulse-ring absolute inset-0 rounded-full"
        style={{ backgroundColor: "#25D366" }}
      />
      <MessageCircle className="relative h-7 w-7" />
    </a>
  );
}
