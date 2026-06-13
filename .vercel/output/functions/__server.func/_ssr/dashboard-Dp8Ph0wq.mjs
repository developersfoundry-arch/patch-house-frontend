import { i as __toESM } from "../_runtime.mjs";
import { t as api } from "./api-DU9Ccmp7.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { m as Slot, v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { g as ChevronDown, h as ChevronLeft, m as ChevronRight, t as X } from "../_libs/lucide-react.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { k as differenceInCalendarDays, r as parseISO, u as format } from "../_libs/date-fns.mjs";
import { n as getDefaultClassNames, t as DayPicker } from "../_libs/react-day-picker.mjs";
import { a as Portal, i as Overlay, n as Content, o as Root, r as Description, s as Title, t as Close } from "../_libs/@radix-ui/react-dialog+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-Dp8Ph0wq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
function Calendar({ className, classNames, showOutsideDays = true, captionLayout = "label", buttonVariant = "ghost", formatters, components, ...props }) {
	const defaultClassNames = getDefaultClassNames();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DayPicker, {
		showOutsideDays,
		className: cn("bg-background group/calendar p-3 [--cell-size:2rem] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent", String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`, String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`, className),
		captionLayout,
		formatters: {
			formatMonthDropdown: (date) => date.toLocaleString("default", { month: "short" }),
			...formatters
		},
		classNames: {
			root: cn("w-fit", defaultClassNames.root),
			months: cn("relative flex flex-col gap-4 md:flex-row", defaultClassNames.months),
			month: cn("flex w-full flex-col gap-4", defaultClassNames.month),
			nav: cn("absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1", defaultClassNames.nav),
			button_previous: cn(buttonVariants({ variant: buttonVariant }), "h-(--cell-size) w-(--cell-size) select-none p-0 aria-disabled:opacity-50", defaultClassNames.button_previous),
			button_next: cn(buttonVariants({ variant: buttonVariant }), "h-(--cell-size) w-(--cell-size) select-none p-0 aria-disabled:opacity-50", defaultClassNames.button_next),
			month_caption: cn("flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)", defaultClassNames.month_caption),
			dropdowns: cn("flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium", defaultClassNames.dropdowns),
			dropdown_root: cn("has-focus:border-ring border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] relative rounded-md border", defaultClassNames.dropdown_root),
			dropdown: cn("bg-popover absolute inset-0 opacity-0", defaultClassNames.dropdown),
			caption_label: cn("select-none font-medium", captionLayout === "label" ? "text-sm" : "[&>svg]:text-muted-foreground flex h-8 items-center gap-1 rounded-md pl-2 pr-1 text-sm [&>svg]:size-3.5", defaultClassNames.caption_label),
			table: "w-full border-collapse",
			weekdays: cn("flex", defaultClassNames.weekdays),
			weekday: cn("text-muted-foreground flex-1 select-none rounded-md text-[0.8rem] font-normal", defaultClassNames.weekday),
			week: cn("mt-2 flex w-full", defaultClassNames.week),
			week_number_header: cn("w-(--cell-size) select-none", defaultClassNames.week_number_header),
			week_number: cn("text-muted-foreground select-none text-[0.8rem]", defaultClassNames.week_number),
			day: cn("group/day relative aspect-square h-full w-full select-none p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md", defaultClassNames.day),
			range_start: cn("bg-accent rounded-l-md", defaultClassNames.range_start),
			range_middle: cn("rounded-none", defaultClassNames.range_middle),
			range_end: cn("bg-accent rounded-r-md", defaultClassNames.range_end),
			today: cn("bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none", defaultClassNames.today),
			outside: cn("text-muted-foreground aria-selected:text-muted-foreground", defaultClassNames.outside),
			disabled: cn("text-muted-foreground opacity-50", defaultClassNames.disabled),
			hidden: cn("invisible", defaultClassNames.hidden),
			...classNames
		},
		components: {
			Root: ({ className, rootRef, ...props }) => {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-slot": "calendar",
					ref: rootRef,
					className: cn(className),
					...props
				});
			},
			Chevron: ({ className, orientation, ...props }) => {
				if (orientation === "left") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
					className: cn("size-4", className),
					...props
				});
				if (orientation === "right") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
					className: cn("size-4", className),
					...props
				});
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
					className: cn("size-4", className),
					...props
				});
			},
			DayButton: CalendarDayButton,
			WeekNumber: ({ children, ...props }) => {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					...props,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex size-(--cell-size) items-center justify-center text-center",
						children
					})
				});
			},
			...components
		},
		...props
	});
}
function CalendarDayButton({ className, day, modifiers, ...props }) {
	const defaultClassNames = getDefaultClassNames();
	const ref = import_react.useRef(null);
	import_react.useEffect(() => {
		if (modifiers.focused) ref.current?.focus();
	}, [modifiers.focused]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		ref,
		variant: "ghost",
		size: "icon",
		"data-day": day.date.toLocaleDateString(),
		"data-selected-single": modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle,
		"data-range-start": modifiers.range_start,
		"data-range-end": modifiers.range_end,
		"data-range-middle": modifiers.range_middle,
		className: cn("data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 flex aspect-square h-auto w-full min-w-(--cell-size) flex-col gap-1 font-normal leading-none data-[range-end=true]:rounded-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] [&>span]:text-xs [&>span]:opacity-70", defaultClassNames.day, className),
		...props
	});
}
var Dialog = Root;
var DialogPortal = Portal;
var DialogClose = Close;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = Overlay.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Content, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Close, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = Content.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = Title.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = Description.displayName;
var TIME_SLOTS = [
	{
		label: "Morning",
		sub: "9 AM – 12 PM",
		value: "morning"
	},
	{
		label: "Afternoon",
		sub: "12 PM – 4 PM",
		value: "afternoon"
	},
	{
		label: "Evening",
		sub: "4 PM – 8 PM",
		value: "evening"
	}
];
var SLOT_LABEL = {
	morning: "9 AM – 12 PM",
	afternoon: "12 PM – 4 PM",
	evening: "4 PM – 8 PM"
};
function formatApptDateLabel(appt) {
	return `${format(parseISO(appt.preferred_date), "EEE d MMM")} · ${SLOT_LABEL[appt.time_slot] ?? appt.time_slot}`;
}
function CircularRing({ daysLeft, totalDays }) {
	const r = 40;
	const size = 110;
	const circumference = 2 * Math.PI * r;
	const filled = circumference * Math.min(daysLeft / Math.max(totalDays, 1), 1);
	const gap = circumference - filled;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex h-[110px] w-[110px] shrink-0 items-center justify-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			width: size,
			height: size,
			viewBox: `0 0 ${size} ${size}`,
			className: "absolute inset-0 -rotate-90",
			"aria-hidden": "true",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: 55,
				cy: 55,
				r,
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "9",
				className: "text-border"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: 55,
				cy: 55,
				r,
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "9",
				strokeLinecap: "round",
				strokeDasharray: `${filled} ${gap}`,
				className: "text-brass"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-3xl font-bold leading-none text-foreground",
				children: daysLeft
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-0.5 text-[10px] uppercase tracking-wide text-muted-foreground",
				children: "days left"
			})]
		})]
	});
}
function DashboardOverview() {
	const queryClient = useQueryClient();
	const { data: upcomingAppts = [], isLoading: loadingAppts } = useQuery({
		queryKey: ["appointments", "upcoming"],
		queryFn: () => api.get("/appointments?status=upcoming")
	});
	const { data: patches = [] } = useQuery({
		queryKey: ["patches"],
		queryFn: () => api.get("/patches")
	});
	const { data: user } = useQuery({
		queryKey: ["me"],
		staleTime: 300 * 1e3
	});
	const [rescheduleOpen, setRescheduleOpen] = (0, import_react.useState)(false);
	const [cancelOpen, setCancelOpen] = (0, import_react.useState)(false);
	const [historyOpen, setHistoryOpen] = (0, import_react.useState)(false);
	const [selectedDate, setSelectedDate] = (0, import_react.useState)(void 0);
	const [selectedTime, setSelectedTime] = (0, import_react.useState)(null);
	const { data: pastAppts = [], isLoading: loadingPast } = useQuery({
		queryKey: ["appointments", "past"],
		queryFn: () => api.get("/appointments?status=past"),
		enabled: historyOpen
	});
	const upcomingAppt = upcomingAppts[0] ?? null;
	const activePatch = patches.find((p) => p.status === "active") ?? null;
	const daysUntil = upcomingAppt ? Math.max(0, differenceInCalendarDays(parseISO(upcomingAppt.preferred_date), /* @__PURE__ */ new Date())) : null;
	const patchDaysLeft = activePatch?.next_maintenance_date ? Math.max(0, differenceInCalendarDays(parseISO(activePatch.next_maintenance_date), /* @__PURE__ */ new Date())) : 0;
	const patchTotalDays = activePatch?.fitted_date && activePatch?.next_maintenance_date ? differenceInCalendarDays(parseISO(activePatch.next_maintenance_date), parseISO(activePatch.fitted_date)) : 42;
	const serviceDue = activePatch?.next_maintenance_date ? format(parseISO(activePatch.next_maintenance_date), "d MMM yyyy") : "Not scheduled";
	const rescheduleMutation = useMutation({
		mutationFn: ({ preferred_date, time_slot }) => api.put(`/appointments/${upcomingAppt.id}/reschedule`, {
			preferred_date,
			time_slot
		}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["appointments"] });
			setRescheduleOpen(false);
			setSelectedDate(void 0);
			setSelectedTime(null);
			toast.success("Appointment rescheduled");
		},
		onError: (e) => toast.error(e.message)
	});
	const cancelMutation = useMutation({
		mutationFn: () => api.del(`/appointments/${upcomingAppt.id}`),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["appointments"] });
			setCancelOpen(false);
			toast.success("Appointment cancelled");
		},
		onError: (e) => toast.error(e.message)
	});
	const confirmReschedule = () => {
		if (!selectedDate || !selectedTime || !upcomingAppt) return;
		rescheduleMutation.mutate({
			preferred_date: format(selectedDate, "yyyy-MM-dd"),
			time_slot: selectedTime
		});
	};
	const firstName = user?.name?.split(" ")[0] ?? "there";
	const historyItems = pastAppts.map((a) => ({
		label: a.service_type,
		date: format(parseISO(a.preferred_date), "d MMM yyyy"),
		status: a.status
	}));
	const shortHistory = historyItems.slice(0, 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "font-display text-3xl font-semibold text-foreground sm:text-4xl",
				children: ["Welcome back, ", firstName]
			}),
			loadingAppts ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-36 animate-pulse rounded-2xl bg-muted" }) : !upcomingAppt ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between overflow-hidden rounded-2xl border border-border bg-card px-6 py-5 shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "No upcoming appointments."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "/book",
					className: "text-xs font-medium text-brass hover:underline",
					children: "Book now"
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex overflow-hidden rounded-2xl bg-brass/[0.07]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-1 shrink-0 bg-brass" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-1 flex-wrap items-center justify-between gap-4 p-6 sm:p-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display font-bold leading-none text-foreground",
						style: { fontSize: "clamp(3.5rem, 8vw, 5rem)" },
						children: daysUntil
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "days until your next visit"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-right",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium uppercase tracking-widest text-muted-foreground",
								children: "With"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-display text-2xl font-semibold text-foreground",
								children: upcomingAppt.expert?.name ?? "Expert TBD"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: formatApptDateLabel(upcomingAppt)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex items-center justify-end gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setRescheduleOpen(true),
										className: "cursor-pointer text-xs font-medium text-brass hover:underline",
										children: "Reschedule"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-muted-foreground/40",
										children: "·"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setCancelOpen(true),
										className: "cursor-pointer text-xs font-medium text-red-400 hover:text-red-500",
										children: "Cancel"
									})
								]
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border bg-card p-6 shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-widest text-muted-foreground",
						children: "Patch Health"
					}), !activePatch ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-muted-foreground",
						children: "Your patch details will appear here after your first fitting."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex items-center gap-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircularRing, {
							daysLeft: patchDaysLeft,
							totalDays: patchTotalDays
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-base font-semibold text-foreground",
							children: "Maintenance cycle"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: ["Service due ", serviceDue]
						})] })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border bg-card p-6 shadow-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium uppercase tracking-widest text-muted-foreground",
								children: "Service History"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setHistoryOpen(true),
								className: "cursor-pointer text-xs font-medium text-brass hover:underline",
								children: "View all ↗"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 font-display text-lg font-semibold text-foreground",
							children: "Your visits"
						}),
						shortHistory.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted-foreground",
							children: "No past visits yet."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 space-y-3",
							children: shortHistory.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-2 h-2 w-2 shrink-0 rounded-full bg-brass" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium text-foreground",
									children: s.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: s.date
								})] })]
							}, i))
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: rescheduleOpen,
				onOpenChange: (o) => {
					setRescheduleOpen(o);
					if (!o) {
						setSelectedDate(void 0);
						setSelectedTime(null);
					}
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Reschedule appointment" }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, {
								mode: "single",
								selected: selectedDate,
								onSelect: setSelectedDate,
								disabled: { before: /* @__PURE__ */ new Date() },
								className: "rounded-xl border border-border",
								classNames: { today: "text-brass font-semibold rounded-md" }
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "w-full",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground",
									children: "Select time slot"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-3 gap-2",
									children: TIME_SLOTS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setSelectedTime(t.value),
										className: cn("cursor-pointer rounded-xl border px-3 py-3 text-left transition", selectedTime === t.value ? "border-brass bg-brass/10" : "border-border bg-background hover:border-brass/50"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: cn("text-xs font-semibold", selectedTime === t.value ? "text-brass" : "text-foreground"),
											children: t.label
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-0.5 text-[10px] text-muted-foreground",
											children: t.sub
										})]
									}, t.value))
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2 pt-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "flex-1 cursor-pointer rounded-full border border-border py-2.5 text-sm font-medium text-foreground transition hover:bg-muted",
									children: "Cancel"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: confirmReschedule,
								disabled: !selectedDate || !selectedTime || rescheduleMutation.isPending,
								className: "flex-1 cursor-pointer rounded-full bg-brass py-2.5 text-sm font-semibold text-ink transition hover:bg-brass-soft disabled:opacity-40",
								children: rescheduleMutation.isPending ? "Saving…" : "Confirm"
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: cancelOpen,
				onOpenChange: setCancelOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Cancel appointment?" }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted-foreground",
							children: [
								"This will cancel your visit with",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium text-foreground",
									children: upcomingAppt?.expert?.name ?? "your expert"
								}),
								" ",
								"on",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium text-foreground",
									children: upcomingAppt ? formatApptDateLabel(upcomingAppt) : ""
								}),
								". You can book again anytime."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2 pt-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "flex-1 cursor-pointer rounded-full border border-border py-2.5 text-sm font-medium text-foreground transition hover:bg-muted",
									children: "Keep it"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => cancelMutation.mutate(),
								disabled: cancelMutation.isPending,
								className: "flex-1 cursor-pointer rounded-full bg-red-500 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600 disabled:opacity-60",
								children: cancelMutation.isPending ? "Cancelling…" : "Yes, cancel"
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: historyOpen,
				onOpenChange: setHistoryOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Service history" }) }), loadingPast ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3",
						children: [
							1,
							2,
							3
						].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-10 animate-pulse rounded-lg bg-muted" }, i))
					}) : historyItems.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "No past visits yet."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-4",
						children: historyItems.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-start gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brass" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium text-foreground",
										children: s.label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: s.date
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-600",
									children: s.status
								})
							]
						}, i))
					})]
				})
			})
		]
	});
}
//#endregion
export { DashboardOverview as component };
