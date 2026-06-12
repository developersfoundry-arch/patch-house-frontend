import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  before: string;
  after: string;
  caption?: string;
  altBefore?: string;
  altAfter?: string;
}

export function BeforeAfter({
  before,
  after,
  caption,
  altBefore = "Before at-home hair patch fitting",
  altAfter = "After at-home hair patch fitting",
}: Props) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, pct)));
  };

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging.current) return;
      const x = "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      setFromClientX(x);
    };
    const onUp = () => (dragging.current = false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, []);

  return (
    <div className="w-full">
      <div
        ref={ref}
        className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 select-none bg-ink shadow-2xl"
        onMouseDown={(e) => {
          dragging.current = true;
          setFromClientX(e.clientX);
        }}
        onTouchStart={(e) => {
          dragging.current = true;
          setFromClientX(e.touches[0].clientX);
        }}
      >
        {/* After (base, fills container) */}
        <img
          src={after}
          alt={altAfter}
          className="absolute inset-0 h-full w-full object-cover object-top"
          draggable={false}
        />
        {/* Before (same container, clipped with inset) */}
        <img
          src={before}
          alt={altBefore}
          className="absolute inset-0 h-full w-full object-cover object-top"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          draggable={false}
        />

        {/* Labels */}
        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-ink/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-cream backdrop-blur sm:left-4 sm:top-4 sm:text-xs">
          Before
        </span>
        <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-brass px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink sm:right-4 sm:top-4 sm:text-xs">
          After
        </span>

        {/* Handle */}
        <button
          type="button"
          aria-label="Drag to compare before and after"
          role="slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 4));
            if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 4));
          }}
          className="absolute top-0 bottom-0 z-10 -ml-px w-0.5 cursor-ew-resize bg-brass focus:outline-none"
          style={{ left: `${pos}%` }}
        >
          <span className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brass text-ink shadow-lg ring-4 ring-ink/40 sm:h-12 sm:w-12">
            <ChevronLeft className="h-3.5 w-3.5" />
            <ChevronRight className="h-3.5 w-3.5" />
          </span>
        </button>
      </div>
      {caption && <p className="mt-4 text-center text-sm text-muted-foreground">{caption}</p>}
    </div>
  );
}
