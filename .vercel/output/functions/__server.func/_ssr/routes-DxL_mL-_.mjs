import { i as __toESM } from "../_runtime.mjs";
import { a as FAQ, c as STEPS, d as waLink, i as EXPERTS, l as TESTIMONIALS, n as BRAND, o as PRICING, r as COMPARISON, s as PROBLEMS, t as BEFORE_AFTER, u as TRUST } from "./content-CrqpDPtY.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Trigger2, i as Root2, n as Header, r as Item, t as Content2, v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { _ as Check, a as ShieldCheck, c as Menu, d as FlaskConical, f as DoorClosed, g as ChevronDown, h as ChevronLeft, m as ChevronRight, o as Phone, r as Star, s as MessageCircle, t as X, v as Camera, y as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DxL_mL-_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var links = [
	{
		href: "#how",
		label: "How it works"
	},
	{
		href: "#results",
		label: "Results"
	},
	{
		href: "#pricing",
		label: "Pricing"
	},
	{
		href: "#faq",
		label: "FAQ"
	}
];
function Navbar() {
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 20);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: `fixed inset-x-0 top-0 z-40 transition-all duration-300 ${scrolled ? "border-b border-white/10 bg-ink/85 backdrop-blur-md" : "bg-transparent"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "flex items-center gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-display text-xl font-semibold tracking-tight text-cream",
						children: [BRAND.name.replace("House", ""), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-brass",
							children: "House"
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-8 md:flex",
					children: links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: `/${l.href}`,
						className: "text-sm text-cream/80 transition hover:text-brass",
						children: l.label
					}, l.href))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden items-center gap-3 md:flex",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						className: "rounded-full px-4 py-2 text-sm text-cream/90 transition hover:text-brass",
						children: "Login"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/book",
						className: "btn-lift rounded-full bg-brass px-5 py-2.5 text-sm font-medium text-ink hover:bg-brass-soft",
						children: "Book Home Visit"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-2 md:hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						"aria-label": "Open menu",
						className: "text-cream",
						onClick: () => setOpen((o) => !o),
						children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-6 w-6" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-6 w-6" })
					})
				})
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-white/10 bg-ink/95 backdrop-blur md:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4",
				children: [
					links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: `/${l.href}`,
						onClick: () => setOpen(false),
						className: "rounded-lg px-3 py-3 text-cream/90 hover:bg-white/5",
						children: l.label
					}, l.href)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						onClick: () => setOpen(false),
						className: "rounded-lg px-3 py-3 text-cream/90 hover:bg-white/5",
						children: "Login"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/book",
						onClick: () => setOpen(false),
						className: "mt-2 rounded-full bg-brass px-5 py-3 text-center text-sm font-medium text-ink",
						children: "Book Home Visit"
					})
				]
			})
		})]
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "section-dark grain border-t border-white/10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "font-display text-2xl font-semibold text-cream",
						children: [BRAND.name.replace("House", ""), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-brass",
							children: "House"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-cream/70",
						children: "Discreet at-home hair patch fittings across Delhi NCR."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 flex flex-wrap gap-2",
						children: [
							"Non-surgical hair replacement",
							"Hair patch for men",
							"Fitted & styled at home",
							"Consultation to aftercare"
						].map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "rounded-full border border-white/10 px-3 py-1 text-xs text-cream/50",
							children: tag
						}, tag))
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "text-xs font-medium uppercase tracking-widest text-brass",
					children: "Service Areas"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 space-y-2 text-sm text-cream/80",
					children: BRAND.cities.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: c }, c))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "text-xs font-medium uppercase tracking-widest text-brass",
					children: "Quick Links"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 space-y-2 text-sm text-cream/80",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/#how",
							className: "hover:text-brass",
							children: "How it works"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/#results",
							className: "hover:text-brass",
							children: "Results"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/#pricing",
							className: "hover:text-brass",
							children: "Pricing"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/#faq",
							className: "hover:text-brass",
							children: "FAQ"
						}) })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "text-xs font-medium uppercase tracking-widest text-brass",
					children: "Talk to us"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 space-y-3 text-sm text-cream/80",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: `tel:+${BRAND.whatsappNumber}`,
						className: "flex items-center gap-2 hover:text-brass",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4" }), " +91 99999 99999"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: waLink(),
						target: "_blank",
						rel: "noreferrer",
						className: "flex items-center gap-2 hover:text-brass",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4" }), " WhatsApp us"]
					})]
				})] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-white/10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-6 text-xs text-cream/50 sm:flex-row sm:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" ",
					BRAND.name,
					", New Delhi. All rights reserved."
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/privacy",
							className: "hover:text-brass",
							children: "Privacy"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/terms",
							className: "hover:text-brass",
							children: "Terms"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Private & confidential, always." })
					]
				})]
			})
		})]
	});
}
function WhatsAppFab() {
	const [show, setShow] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setShow(window.scrollY > 600);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	if (!show) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
		href: waLink(),
		target: "_blank",
		rel: "noopener noreferrer",
		"aria-label": "Chat with us on WhatsApp",
		className: "fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-2xl transition-transform duration-300 hover:-translate-y-1 hover:scale-110 active:scale-95",
		style: { backgroundColor: "#25D366" },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "pulse-ring absolute inset-0 rounded-full",
			style: { backgroundColor: "#25D366" }
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "relative h-7 w-7" })]
	});
}
function BeforeAfter({ before, after, caption, altBefore = "Before at-home hair patch fitting", altAfter = "After at-home hair patch fitting" }) {
	const [pos, setPos] = (0, import_react.useState)(50);
	const ref = (0, import_react.useRef)(null);
	const dragging = (0, import_react.useRef)(false);
	const setFromClientX = (clientX) => {
		const el = ref.current;
		if (!el) return;
		const rect = el.getBoundingClientRect();
		const pct = (clientX - rect.left) / rect.width * 100;
		setPos(Math.max(0, Math.min(100, pct)));
	};
	(0, import_react.useEffect)(() => {
		const onMove = (e) => {
			if (!dragging.current) return;
			setFromClientX("touches" in e ? e.touches[0].clientX : e.clientX);
		};
		const onUp = () => dragging.current = false;
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref,
			className: "relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 select-none bg-ink shadow-2xl",
			onMouseDown: (e) => {
				dragging.current = true;
				setFromClientX(e.clientX);
			},
			onTouchStart: (e) => {
				dragging.current = true;
				setFromClientX(e.touches[0].clientX);
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: after,
					alt: altAfter,
					className: "absolute inset-0 h-full w-full object-cover object-top",
					draggable: false
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: before,
					alt: altBefore,
					className: "absolute inset-0 h-full w-full object-cover object-top",
					style: { clipPath: `inset(0 ${100 - pos}% 0 0)` },
					draggable: false
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "pointer-events-none absolute left-3 top-3 rounded-full bg-ink/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-cream backdrop-blur sm:left-4 sm:top-4 sm:text-xs",
					children: "Before"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "pointer-events-none absolute right-3 top-3 rounded-full bg-brass px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink sm:right-4 sm:top-4 sm:text-xs",
					children: "After"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": "Drag to compare before and after",
					role: "slider",
					"aria-valuemin": 0,
					"aria-valuemax": 100,
					"aria-valuenow": Math.round(pos),
					onKeyDown: (e) => {
						if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 4));
						if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 4));
					},
					className: "absolute top-0 bottom-0 z-10 -ml-px w-0.5 cursor-ew-resize bg-brass focus:outline-none",
					style: { left: `${pos}%` },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brass text-ink shadow-lg ring-4 ring-ink/40 sm:h-12 sm:w-12",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3.5 w-3.5" })]
					})
				})
			]
		}), caption && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 text-center text-sm text-muted-foreground",
			children: caption
		})]
	});
}
function useReveal() {
	const ref = (0, import_react.useRef)(null);
	const [inView, setInView] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		const obs = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				setInView(true);
				obs.disconnect();
			}
		}, { threshold: .15 });
		obs.observe(el);
		return () => obs.disconnect();
	}, []);
	return {
		ref,
		className: `reveal ${inView ? "in-view" : ""}`
	};
}
var hero_portrait_default = "/assets/hero-portrait-BDFo-Qd2.jpg";
var Accordion = Root2;
var AccordionItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
	ref,
	className: cn("border-b", className),
	...props
}));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
	className: "flex",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Trigger2, {
		ref,
		className: cn("flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })]
	})
}));
AccordionTrigger.displayName = Trigger2.displayName;
var AccordionContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("pb-4 pt-0", className),
		children
	})
}));
AccordionContent.displayName = Content2.displayName;
var ICONS = {
	Camera,
	FlaskConical,
	DoorClosed
};
function Landing() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Problem, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Results, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(How, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compare, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Experts, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Testimonials, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pricing, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Faq, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinalCta, {})
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppFab, {})
	] });
}
function Hero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "section-dark grain relative min-h-screen overflow-hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-5 pt-28 pb-16 sm:px-8 md:grid-cols-2 md:pt-32",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-[0.25em] text-brass animate-[reveal-up_0.7s_ease-out_forwards] opacity-0",
					style: { animationDelay: "0.05s" },
					children: "At-Home Hair Patch Service · Delhi NCR"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-6 font-display text-5xl font-semibold leading-[1.02] tracking-tight text-cream sm:text-6xl md:text-7xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block animate-[reveal-up_0.8s_ease-out_forwards] opacity-0",
						style: { animationDelay: "0.2s" },
						children: "Get your hair back."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-brass animate-[reveal-up_0.8s_ease-out_forwards] opacity-0",
						style: { animationDelay: "0.45s" },
						children: "Without ever leaving home."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-7 max-w-xl text-base leading-relaxed text-cream/75 sm:text-lg animate-[reveal-up_0.8s_ease-out_forwards] opacity-0",
					style: { animationDelay: "0.7s" },
					children: "A certified hair expert visits you privately, finds your perfect non-surgical hair patch, and fits it the same day — at your home, on your schedule."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-9 flex flex-col gap-3 sm:flex-row animate-[reveal-up_0.8s_ease-out_forwards] opacity-0",
					style: { animationDelay: "0.9s" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/book",
						className: "btn-lift inline-flex items-center justify-center gap-2 rounded-full bg-brass px-7 py-3.5 text-sm font-semibold text-ink hover:bg-brass-soft",
						children: ["Book a Free Home Consultation ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: waLink(),
						target: "_blank",
						rel: "noreferrer",
						className: "btn-lift inline-flex items-center justify-center gap-2 rounded-full border border-cream/30 px-7 py-3.5 text-sm font-medium text-cream hover:border-brass hover:text-brass",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4" }), " Chat on WhatsApp"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 flex flex-wrap gap-x-6 gap-y-2 text-xs text-cream/55 animate-[reveal-up_0.8s_ease-out_forwards] opacity-0",
					style: { animationDelay: "1.1s" },
					children: TRUST.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-2",
						children: [i > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1 w-1 rounded-full bg-brass" }), t]
					}, t))
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-3xl border border-white/10 shadow-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: hero_portrait_default,
						alt: "Confident man with a natural-looking non-surgical hair patch, side profile",
						className: "h-full w-full object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -bottom-4 -left-4 hidden h-24 w-24 rounded-full border border-brass/40 md:block" })]
			})]
		})
	});
}
function Problem() {
	const r = useReveal();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-cream py-24 sm:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref: r.ref,
			className: `${r.className} mx-auto max-w-5xl px-5 sm:px-8`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-3xl text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.25em] text-brass",
						children: "Sound familiar?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 font-display text-3xl font-semibold leading-tight text-ink sm:text-5xl",
						children: "Hair loss changes more than your hairline."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-base text-slate-muted sm:text-lg",
						children: "Your evenings. Your photos. Your confidence."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-14 grid gap-5 sm:grid-cols-3",
				children: PROBLEMS.map((p) => {
					const Icon = ICONS[p.icon];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lift rounded-2xl border border-ink/10 bg-white p-7 shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							className: "h-7 w-7 text-brass",
							strokeWidth: 1.5
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 text-base font-medium text-ink",
							children: p.line
						})]
					}, p.line);
				})
			})]
		})
	});
}
function Results() {
	const [active, setActive] = (0, import_react.useState)(0);
	const r = useReveal();
	const current = BEFORE_AFTER[active];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "results",
		className: "section-dark grain py-24 sm:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref: r.ref,
			className: `${r.className} mx-auto max-w-6xl px-5 sm:px-8`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-3xl text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium uppercase tracking-[0.25em] text-brass",
							children: "The Results"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-4 font-display text-3xl font-semibold leading-tight text-cream sm:text-5xl",
							children: "Drag. See the difference."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-cream/70",
							children: "Real results from home fittings across Delhi NCR."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "brass-rule mx-auto mt-8 w-24" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BeforeAfter, {
						before: current.before,
						after: current.after,
						caption: `${current.name} · ${current.city} · ${current.type}`,
						altBefore: `Hair loss before at-home hair patch fitting — ${current.name}, ${current.city}`,
						altAfter: `Natural hairline after non-surgical hair patch fitting at home — ${current.name}, ${current.city}`
					}, active)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 flex gap-3 overflow-x-auto pb-2",
					children: BEFORE_AFTER.map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setActive(i),
						className: `lift group flex shrink-0 flex-col items-start gap-2 rounded-xl border p-2 text-left ${i === active ? "border-brass" : "border-white/10 hover:border-white/30"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: b.before,
								alt: "",
								className: "h-16 w-16 rounded-md object-cover"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: b.after,
								alt: "",
								className: "h-16 w-16 rounded-md object-cover"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "px-1 text-xs text-cream/80",
							children: [
								b.name,
								" — ",
								b.city,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-cream/50",
									children: b.type
								})
							]
						})]
					}, b.name))
				})
			]
		})
	});
}
function StepCard({ step, index }) {
	const sr = useReveal();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		ref: sr.ref,
		className: `${sr.className} reveal-delay-${index + 1} lift rounded-2xl border border-ink/10 bg-white p-7 shadow-sm`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-display text-4xl font-semibold text-brass",
				children: step.n
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-4 text-lg font-semibold text-ink",
				children: step.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-relaxed text-slate-muted",
				children: step.desc
			})
		]
	});
}
function How() {
	const r = useReveal();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "how",
		className: "bg-cream py-24 sm:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref: r.ref,
			className: `${r.className} mx-auto max-w-6xl px-5 sm:px-8`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-2xl text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.25em] text-brass",
						children: "How it works"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 font-display text-3xl font-semibold leading-tight text-ink sm:text-5xl",
						children: "Four calm steps. One visit."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
					children: STEPS.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCard, {
						step: s,
						index: i
					}, s.n))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/book",
						className: "btn-lift inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-cream hover:bg-ink-soft",
						children: ["Start with a free home visit ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
					})
				})
			]
		})
	});
}
function Compare() {
	const r = useReveal();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "section-dark grain py-24 sm:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref: r.ref,
			className: `${r.className} mx-auto max-w-5xl px-5 sm:px-8`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-2xl text-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl font-semibold leading-tight text-cream sm:text-5xl",
					children: "Why at-home beats the clinic."
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-14 grid gap-6 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card-glass lift rounded-2xl border border-white/10 p-8 hover:border-white/25",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-medium uppercase tracking-widest text-cream/50",
						children: "Typical clinic visit"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-6 space-y-4",
						children: COMPARISON.clinic.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-start gap-3 text-cream/70",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "mt-0.5 h-5 w-5 shrink-0 text-cream/30" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: c })]
						}, c))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card-glass-brass lift rounded-2xl border border-brass/40 p-8 hover:border-brass",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-medium uppercase tracking-widest text-brass",
						children: "PatchHouse"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-6 space-y-4",
						children: COMPARISON.us.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-start gap-3 text-cream",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 h-5 w-5 shrink-0 text-brass" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: c })]
						}, c))
					})]
				})]
			})]
		})
	});
}
function Experts() {
	const r = useReveal();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-cream py-24 sm:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref: r.ref,
			className: `${r.className} mx-auto max-w-6xl px-5 sm:px-8`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-2xl text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.25em] text-brass",
						children: EXPERTS.kicker
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 font-display text-3xl font-semibold leading-tight text-ink sm:text-5xl",
						children: EXPERTS.heading
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-slate-muted",
						children: EXPERTS.intro
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-14 grid gap-6 sm:grid-cols-2",
				children: EXPERTS.points.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lift flex items-start gap-4 rounded-2xl border border-ink/10 bg-white p-7 shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
						className: "mt-0.5 h-6 w-6 shrink-0 text-brass",
						strokeWidth: 1.5
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-base font-semibold text-ink",
						children: p.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 text-sm leading-relaxed text-slate-muted",
						children: p.desc
					})] })]
				}, p.title))
			})]
		})
	});
}
function Pricing() {
	const r = useReveal();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "pricing",
		className: "bg-cream py-24 sm:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref: r.ref,
			className: `${r.className} mx-auto max-w-6xl px-5 sm:px-8`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-2xl text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.25em] text-brass",
						children: "Transparent pricing"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 font-display text-3xl font-semibold leading-tight text-ink sm:text-5xl",
						children: "Honest prices. No hidden charges."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-14 grid gap-6 md:grid-cols-3",
					children: PRICING.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `lift relative flex flex-col rounded-2xl border p-8 ${p.featured ? "scale-[1.02] border-brass bg-ink text-cream shadow-xl" : "border-ink/10 bg-white shadow-sm"}`,
						children: [
							p.featured && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brass px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ink",
								children: "Most chosen"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: `font-display text-2xl font-semibold ${p.featured ? "text-cream" : "text-ink"}`,
								children: p.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: `mt-1 text-sm ${p.featured ? "text-cream/60" : "text-slate-muted"}`,
								children: p.tagline
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `mt-5 font-display text-3xl font-semibold ${p.featured ? "text-brass" : "text-ink"}`,
								children: p.price
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: `mt-6 flex-1 space-y-3 text-sm ${p.featured ? "text-cream/80" : "text-ink/80"}`,
								children: p.features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-start gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 h-4 w-4 shrink-0 text-brass" }), f]
								}, f))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/book",
								className: `btn-lift mt-8 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold ${p.featured ? "bg-brass text-ink hover:bg-brass-soft" : "border border-ink text-ink hover:bg-ink hover:text-cream"}`,
								children: p.cta
							})
						]
					}, p.name))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lift mx-auto mt-10 max-w-2xl rounded-2xl border border-brass/40 bg-white p-6 text-center shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-lg font-semibold text-ink",
						children: "The mirror-check promise"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed text-slate-muted",
						children: "No fitting fee is due unless you approve the final look in the mirror. Pay after your fitting — UPI, card, or cash. Final pricing confirmed at home after analysis."
					})]
				})
			]
		})
	});
}
function Testimonials() {
	const r = useReveal();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "section-dark grain py-24 sm:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref: r.ref,
			className: `${r.className} mx-auto max-w-6xl px-5 sm:px-8`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-2xl text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-[0.25em] text-brass",
					children: "Quietly confident"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 font-display text-3xl font-semibold leading-tight text-cream sm:text-5xl",
					children: "What they tell us afterwards."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible",
				children: TESTIMONIALS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
					className: "card-glass lift flex w-[85%] shrink-0 snap-start flex-col rounded-2xl border border-white/10 p-7 hover:border-white/25 md:w-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-1 text-brass",
							children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: `h-4 w-4 ${i < t.rating ? "fill-brass" : "fill-cream/10 text-cream/25"}` }, i))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
							className: "mt-5 flex-1 text-cream/85 leading-relaxed",
							children: [
								"\"",
								t.quote,
								"\""
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
							className: "mt-6 flex items-center gap-3 border-t border-white/10 pt-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-10 w-10 items-center justify-center rounded-full bg-brass/20 font-semibold text-brass",
								children: t.initials
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "font-medium text-cream",
									children: [
										t.name,
										", ",
										t.age
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-cream/50",
									children: t.city
								})]
							})]
						})
					]
				}, t.name))
			})]
		})
	});
}
function Faq() {
	const r = useReveal();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "faq",
		className: "section-dark grain py-24 sm:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref: r.ref,
			className: `${r.className} mx-auto max-w-3xl px-5 sm:px-8`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-[0.25em] text-brass",
					children: "Questions"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 font-display text-3xl font-semibold leading-tight text-cream sm:text-5xl",
					children: "Everything you wanted to ask."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
				type: "single",
				collapsible: true,
				className: "mt-12 w-full",
				children: FAQ.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
					value: `item-${i}`,
					className: "border-b border-white/10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
						className: "py-5 text-left text-base font-medium text-cream hover:text-brass hover:no-underline",
						children: f.q
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
						className: "text-cream/70 leading-relaxed",
						children: f.a
					})]
				}, i))
			})]
		})
	});
}
function FinalCta() {
	const r = useReveal();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-cream py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref: r.ref,
			className: `${r.className} mx-auto max-w-3xl px-5 text-center sm:px-8`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl",
					children: "Your hair is one home visit away."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-slate-muted",
					children: "Free consultation · Delhi NCR · Completely private"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/book",
						className: "btn-lift inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-cream hover:bg-ink-soft",
						children: ["Book a Free Home Consultation ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: waLink(),
						target: "_blank",
						rel: "noreferrer",
						className: "btn-lift inline-flex items-center justify-center gap-2 rounded-full border border-ink/30 px-7 py-3.5 text-sm font-medium text-ink hover:border-brass hover:text-brass",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4" }), " WhatsApp us"]
					})]
				})
			]
		})
	});
}
//#endregion
export { Landing as component };
