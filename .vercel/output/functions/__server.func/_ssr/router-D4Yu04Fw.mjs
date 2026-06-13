import { i as __toESM } from "../_runtime.mjs";
import { a as FAQ, n as BRAND, o as PRICING } from "./content-CrqpDPtY.mjs";
import { t as api } from "./api-DU9Ccmp7.mjs";
import { r as setAuthUser } from "./auth-DCHKPFMY.mjs";
import { n as useForm, r as require_react, t as u } from "../_libs/@hookform/resolvers+[...].mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { i as stringType, n as literalType, r as objectType, t as enumType } from "../_libs/zod.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { g as ChevronDown, p as ChevronUp } from "../_libs/lucide-react.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { i as useQueryClient, n as useQuery, r as QueryClientProvider, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { k as differenceInCalendarDays, r as parseISO, u as format } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-D4Yu04Fw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-DfXNbXD1.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	useEffect(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$9 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "PatchHouse — At-Home Hair Patch Service in Delhi NCR" },
			{
				name: "description",
				content: "Discreet at-home hair patch fittings across Delhi NCR. A certified hair expert visits you privately. Same-day, no clinic, completely confidential."
			},
			{
				property: "og:title",
				content: "PatchHouse — At-Home Hair Patch Service"
			},
			{
				property: "og:description",
				content: "A certified hair expert visits you privately. Same-day fitting. Completely confidential."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("head", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", { dangerouslySetInnerHTML: { __html: `document.documentElement.setAttribute("data-mode","light");` } }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$9.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
var $$splitComponentImporter$6 = () => import("./terms-CqQxB8g5.mjs");
var Route$8 = createFileRoute("/terms")({
	head: () => ({ meta: [{ title: "Terms of Service — PatchHouse" }, {
		name: "description",
		content: "The terms that apply to PatchHouse consultations, fittings, and aftercare."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./privacy-DolCpKfh.mjs");
var Route$7 = createFileRoute("/privacy")({
	head: () => ({ meta: [{ title: "Privacy Policy — PatchHouse" }, {
		name: "description",
		content: "How PatchHouse collects, uses, and protects your personal information."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./login-Dkc-q3Am.mjs");
var Route$6 = createFileRoute("/login")({
	head: () => ({ meta: [{ title: "Login — PatchHouse" }, {
		name: "description",
		content: "Log in to manage your at-home hair patch booking."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./dashboard-Dej7ORrH.mjs");
var Route$5 = createFileRoute("/dashboard")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./book-CCKSxlfk.mjs");
var Route$4 = createFileRoute("/book")({
	head: () => ({ meta: [{ title: "Book your free home consultation — PatchHouse" }, {
		name: "description",
		content: "Book a free, private at-home hair patch consultation in Delhi NCR."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
objectType({
	name: stringType().min(2, "Please enter your full name"),
	phone: stringType().regex(/^\d{10}$/, "Please enter a 10-digit mobile number"),
	city: stringType().min(1, "Please select your city"),
	address: stringType().min(8, "Please enter your full address"),
	date: stringType().min(1, "Pick a date"),
	slot: enumType([
		"morning",
		"afternoon",
		"evening"
	], { errorMap: () => ({ message: "Pick a time slot" }) }),
	concern: stringType().min(1, "Please pick one"),
	notes: stringType().optional()
});
var $$splitComponentImporter$1 = () => import("./routes-DxL_mL-_.mjs");
var JSON_LD = JSON.stringify([{
	"@context": "https://schema.org",
	"@type": "HairSalon",
	name: BRAND.name,
	description: "Discreet at-home hair patch fittings across Delhi NCR. A certified hair expert visits you privately and fits your non-surgical hair patch the same day.",
	telephone: `+${BRAND.whatsappNumber}`,
	areaServed: BRAND.cities.map((c) => ({
		"@type": "City",
		name: c
	})),
	priceRange: "₹₹",
	knowsAbout: [
		"Non-surgical hair replacement",
		"Hair patch fitting for men",
		"Hair systems and toupees",
		"At-home hair loss solutions"
	],
	hasOfferCatalog: {
		"@type": "OfferCatalog",
		name: "At-home hair patch services",
		itemListElement: PRICING.map((p) => ({
			"@type": "Offer",
			name: p.name,
			description: p.tagline
		}))
	}
}, {
	"@context": "https://schema.org",
	"@type": "FAQPage",
	mainEntity: FAQ.map((f) => ({
		"@type": "Question",
		name: f.q,
		acceptedAnswer: {
			"@type": "Answer",
			text: f.a
		}
	}))
}]);
var Route$3 = createFileRoute("/")({
	head: () => ({
		meta: [{ title: "PatchHouse — At-Home Hair Patch Service in Delhi NCR" }, {
			name: "description",
			content: "Non-surgical hair patch for men, fitted at home in Delhi, Noida, Gurugram & across NCR. A certified expert visits privately and fits it the same day."
		}],
		scripts: [{
			type: "application/ld+json",
			children: JSON_LD
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./dashboard-Dp8Ph0wq.mjs");
var Route$2 = createFileRoute("/dashboard/")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var Route$1 = createFileRoute("/dashboard/profile")({ component: ProfilePage });
var schema = objectType({
	name: stringType().min(2, "Please enter your full name"),
	email: stringType().email("Invalid email address").or(literalType("")).optional(),
	address: stringType().min(8, "Please enter your full address").or(literalType("")).optional(),
	city: stringType().optional(),
	concern: stringType().optional()
});
var CONCERNS = [
	"Receding hairline",
	"Crown thinning",
	"Full top baldness",
	"Patchy loss",
	"Not sure"
];
var inputCls = "mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-brass";
var labelCls = "block text-sm font-medium text-muted-foreground";
function ProfilePage() {
	const queryClient = useQueryClient();
	const { data: user, isLoading } = useQuery({
		queryKey: ["me"],
		queryFn: () => api.get("/me"),
		staleTime: 300 * 1e3
	});
	const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm({
		resolver: u(schema),
		defaultValues: {
			name: "",
			email: "",
			address: "",
			city: "",
			concern: ""
		}
	});
	(0, import_react.useEffect)(() => {
		if (user) reset({
			name: user.name ?? "",
			email: user.email ?? "",
			address: user.address ?? "",
			city: user.city ?? "",
			concern: user.concern ?? ""
		});
	}, [user, reset]);
	const saveMutation = useMutation({
		mutationFn: (data) => api.put("/me", data),
		onSuccess: (updated) => {
			queryClient.setQueryData(["me"], updated);
			setAuthUser({
				id: updated.id,
				phone: updated.phone,
				name: updated.name
			});
			reset({
				name: updated.name ?? "",
				email: updated.email ?? "",
				address: updated.address ?? "",
				city: updated.city ?? "",
				concern: updated.concern ?? ""
			});
			toast.success("Profile updated");
		},
		onError: (e) => toast.error(e.message)
	});
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-lg space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-32 animate-pulse rounded-lg bg-muted" }), [
			1,
			2,
			3,
			4
		].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-14 animate-pulse rounded-xl bg-muted" }, i))]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-2xl font-semibold text-foreground sm:text-3xl",
			children: "Profile"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: handleSubmit((d) => saveMutation.mutate(d)),
			className: "max-w-lg space-y-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: labelCls,
						children: "Full name"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inputCls,
						placeholder: "Your full name",
						...register("name")
					}),
					errors.name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 text-xs text-red-500",
						children: errors.name.message
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: labelCls,
					children: "Phone"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1.5 flex items-center rounded-xl border border-border bg-muted px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex-1 text-sm text-foreground",
						children: ["+91 ", user?.phone]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1 text-xs font-medium text-emerald-500",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "✓" }), " Verified"]
					})]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: labelCls,
						children: [
							"Email",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground/60",
								children: "(optional)"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "email",
						className: inputCls,
						placeholder: "you@example.com",
						...register("email")
					}),
					errors.email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 text-xs text-red-500",
						children: errors.email.message
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: labelCls,
					children: "Address"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					rows: 2,
					className: inputCls,
					placeholder: "House / Flat, Street, Sector, Landmark",
					...register("address")
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: labelCls,
					children: "City"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					className: inputCls,
					...register("city"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "Select city"
					}), BRAND.cities.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: c }, c))]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: labelCls,
					children: "Hair concern"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					className: inputCls,
					...register("concern"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "Select concern"
					}), CONCERNS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: c }, c))]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					disabled: !isDirty || saveMutation.isPending,
					className: "btn-lift cursor-pointer rounded-full bg-brass px-6 py-3 text-sm font-semibold text-ink transition hover:bg-brass-soft disabled:opacity-50",
					children: saveMutation.isPending ? "Saving…" : "Save changes"
				})
			]
		})]
	});
}
var Route = createFileRoute("/dashboard/patch")({ component: PatchPage });
var CARE_STEPS = [
	{
		title: "Daily care",
		content: "Use a soft-bristle brush and stroke gently from the hairline back. Avoid pulling at the perimeter. A satin cap at night reduces friction and adds days to your patch."
	},
	{
		title: "Washing",
		content: "Wash twice a week with a mild sulfate-free shampoo and lukewarm water in one direction — never rub in circles. Pat dry gently with a microfiber towel and let air-dry before styling."
	},
	{
		title: "Re-bonding",
		content: "When you feel edges lifting, contact us to schedule a re-bonding visit. Do not attempt to re-apply tape or adhesive yourself — incorrect bonding damages the base material."
	},
	{
		title: "Avoiding damage",
		content: "Keep away from chlorinated water without a silicone cap. Limit salt-water exposure. Remove the patch before extended sun exposure or harsh chemical treatments."
	}
];
function PatchPage() {
	const [openIdx, setOpenIdx] = (0, import_react.useState)(0);
	const { data: patches = [], isLoading } = useQuery({
		queryKey: ["patches"],
		queryFn: () => api.get("/patches")
	});
	const activePatch = patches.find((p) => p.status === "active") ?? null;
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-48 animate-pulse rounded-lg bg-muted" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-32 animate-pulse rounded-2xl bg-muted" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-48 animate-pulse rounded-2xl bg-muted" })
		]
	});
	if (!activePatch) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-semibold text-foreground sm:text-3xl",
				children: "My Patch"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-border bg-card p-8 text-center shadow-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brass/10 font-display text-xl font-bold text-brass",
						children: "PH"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 font-display text-xl font-semibold text-foreground",
						children: "No active patch"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Your patch details will appear here after your first fitting with our expert."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CareGuide, {
				openIdx,
				setOpenIdx
			})
		]
	});
	const daysToService = activePatch.next_maintenance_date ? Math.max(0, differenceInCalendarDays(parseISO(activePatch.next_maintenance_date), /* @__PURE__ */ new Date())) : null;
	const fittedDate = activePatch.fitted_date ? format(parseISO(activePatch.fitted_date), "d MMM yyyy") : "Pending";
	const specs = [
		{
			label: "Type",
			value: activePatch.patch_type
		},
		{
			label: "Base",
			value: activePatch.base_material
		},
		{
			label: "Color",
			value: activePatch.color
		},
		{
			label: "Density",
			value: activePatch.density
		},
		{
			label: "Length",
			value: activePatch.hair_length
		},
		{
			label: "Fitted on",
			value: fittedDate
		}
	];
	const specRows = [
		[specs[0], specs[1]],
		[specs[2], specs[3]],
		[specs[4], specs[5]]
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-semibold text-foreground sm:text-3xl",
				children: "My Patch"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-6 overflow-hidden rounded-2xl bg-brass/[0.07] p-6 sm:p-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-500",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-500" }), "Active System"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-2xl font-semibold text-foreground sm:text-3xl",
							children: activePatch.patch_type
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: [
								activePatch.base_material,
								" · ",
								activePatch.color
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["📅 Fitted ", fittedDate] }), daysToService !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"✦ ",
								daysToService,
								" days to next service"
							] })]
						}),
						activePatch.expert && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-xs text-muted-foreground",
							children: [
								"Expert:",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium text-foreground",
									children: activePatch.expert.name
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-brass font-display text-xl font-bold text-ink",
					children: "PH"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-baseline justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-semibold text-foreground",
					children: "Specifications"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Custom-built for you"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 overflow-hidden rounded-2xl border border-border bg-card shadow-sm",
				children: specRows.map((row, ri) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 divide-x divide-border border-b border-border last:border-b-0",
					children: row.map((spec) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium uppercase tracking-widest text-brass/70",
							children: spec.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm font-medium text-card-foreground",
							children: spec.value
						})]
					}, spec.label))
				}, ri))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CareGuide, {
				openIdx,
				setOpenIdx
			})
		]
	});
}
function CareGuide({ openIdx, setOpenIdx }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-baseline justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-xl font-semibold text-foreground",
			children: "Care guide"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted-foreground",
			children: "Tap to expand"
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-3 overflow-hidden rounded-2xl border border-border bg-card shadow-sm",
		children: CARE_STEPS.map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-b border-border last:border-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => setOpenIdx(openIdx === i ? null : i),
				className: "flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-foreground/[0.03]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium text-card-foreground",
					children: step.title
				}), openIdx === i ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "h-4 w-4 shrink-0 text-muted-foreground" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground" })]
			}), openIdx === i && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-t border-border px-5 py-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-relaxed text-muted-foreground",
					children: step.content
				})
			})]
		}, step.title))
	})] });
}
var TermsRoute = Route$8.update({
	id: "/terms",
	path: "/terms",
	getParentRoute: () => Route$9
});
var PrivacyRoute = Route$7.update({
	id: "/privacy",
	path: "/privacy",
	getParentRoute: () => Route$9
});
var LoginRoute = Route$6.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$9
});
var DashboardRoute = Route$5.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => Route$9
});
var BookRoute = Route$4.update({
	id: "/book",
	path: "/book",
	getParentRoute: () => Route$9
});
var IndexRoute = Route$3.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$9
});
var DashboardIndexRoute = Route$2.update({
	id: "/",
	path: "/",
	getParentRoute: () => DashboardRoute
});
var DashboardProfileRoute = Route$1.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => DashboardRoute
});
var DashboardRouteChildren = {
	DashboardPatchRoute: Route.update({
		id: "/patch",
		path: "/patch",
		getParentRoute: () => DashboardRoute
	}),
	DashboardProfileRoute,
	DashboardIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	BookRoute,
	DashboardRoute: DashboardRoute._addFileChildren(DashboardRouteChildren),
	LoginRoute,
	PrivacyRoute,
	TermsRoute
};
var routeTree = Route$9._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
