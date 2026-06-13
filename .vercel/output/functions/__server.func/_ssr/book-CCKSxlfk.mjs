import { i as __toESM } from "../_runtime.mjs";
import { n as BRAND } from "./content-CrqpDPtY.mjs";
import { t as api } from "./api-DU9Ccmp7.mjs";
import { r as setAuthUser } from "./auth-DCHKPFMY.mjs";
import { r as signInWithPhoneNumber, t as RecaptchaVerifier } from "../_libs/firebase__auth.mjs";
import "../_libs/firebase.mjs";
import { t as auth } from "./firebase-Bx8lgN4r.mjs";
import { n as useForm, r as require_react, t as u } from "../_libs/@hookform/resolvers+[...].mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { i as stringType, r as objectType, t as enumType } from "../_libs/zod.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { y as ArrowRight } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/book-CCKSxlfk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SLOTS = [
	{
		label: "Morning (9 AM – 12 PM)",
		value: "morning"
	},
	{
		label: "Afternoon (12 PM – 4 PM)",
		value: "afternoon"
	},
	{
		label: "Evening (4 PM – 8 PM)",
		value: "evening"
	}
];
var CONCERNS = [
	"Receding hairline",
	"Crown thinning",
	"Full top baldness",
	"Patchy loss",
	"Not sure"
];
var schema = objectType({
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
var fieldCls = "mt-2 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-brass";
var labelCls = "text-xs font-medium uppercase tracking-widest text-slate-muted";
function BookPage() {
	const navigate = useNavigate();
	const [step, setStep] = (0, import_react.useState)("form");
	const [bookingData, setBookingData] = (0, import_react.useState)(null);
	const [otp, setOtp] = (0, import_react.useState)("");
	const [otpErr, setOtpErr] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
	const verifierRef = (0, import_react.useRef)(null);
	const confirmationRef = (0, import_react.useRef)(null);
	const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: u(schema) });
	(0, import_react.useEffect)(() => {
		verifierRef.current = new RecaptchaVerifier(auth, "recaptcha-container", { size: "invisible" });
		return () => {
			verifierRef.current?.clear();
			verifierRef.current = null;
		};
	}, []);
	const onSubmit = async (data) => {
		setBookingData(data);
		try {
			if (!verifierRef.current) verifierRef.current = new RecaptchaVerifier(auth, "recaptcha-container", { size: "invisible" });
			await signInWithPhoneNumber(auth, `+91${data.phone}`, verifierRef.current).then((conf) => {
				confirmationRef.current = conf;
			});
			setStep("otp");
			window.scrollTo({
				top: 0,
				behavior: "smooth"
			});
		} catch {
			toast.error("Failed to send OTP. Please try again.");
			verifierRef.current?.clear();
			verifierRef.current = new RecaptchaVerifier(auth, "recaptcha-container", { size: "invisible" });
		}
	};
	const submitOtp = async (e) => {
		e.preventDefault();
		if (!/^\d{6}$/.test(otp)) {
			setOtpErr("Enter the 6-digit OTP");
			return;
		}
		if (!bookingData) return;
		setOtpErr(null);
		setLoading(true);
		try {
			const idToken = await (await confirmationRef.current.confirm(otp)).user.getIdToken();
			const user = await api.post("/auth/firebase", { id_token: idToken });
			await api.put("/me", {
				name: bookingData.name,
				address: bookingData.address,
				city: bookingData.city,
				concern: bookingData.concern
			});
			const appt = await api.post("/appointments", {
				service_type: "Hair Patch Fitting",
				preferred_date: bookingData.date,
				time_slot: bookingData.slot,
				address: bookingData.address,
				city: bookingData.city,
				notes: bookingData.notes ?? ""
			});
			setAuthUser({
				id: user.id,
				phone: user.phone,
				name: bookingData.name
			});
			toast.success(`Booking confirmed! Ref: ${appt.booking_ref}`);
			navigate({
				to: "/dashboard",
				replace: true
			});
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Something went wrong";
			setOtpErr(msg.includes("invalid") || msg.includes("OTP") ? "Incorrect OTP. Please try again." : msg);
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "section-dark grain min-h-screen px-5 py-14 sm:py-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { id: "recaptcha-container" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "mb-8 block text-center font-display text-xl font-semibold text-cream",
				children: [BRAND.name.replace("House", ""), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-brass",
					children: "House"
				})]
			}), step === "otp" && bookingData ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur sm:p-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium uppercase tracking-[0.25em] text-brass",
							children: "One last step"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-3 font-display text-3xl font-semibold text-cream",
							children: "Verify your number"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-sm text-cream/70",
							children: ["OTP sent to +91 ", bookingData.phone]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submitOtp,
					className: "mt-8 space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-medium uppercase tracking-widest text-cream/60",
								children: "Enter 6-digit OTP"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								inputMode: "numeric",
								maxLength: 6,
								value: otp,
								onChange: (e) => setOtp(e.target.value.replace(/\D/g, "")),
								placeholder: "••••••",
								className: "mt-2 w-full rounded-xl border border-white/15 bg-ink/40 px-4 py-3 text-center text-2xl tracking-[0.5em] text-cream outline-none placeholder:text-cream/20 focus:border-brass"
							}),
							otpErr && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs text-red-400",
								children: otpErr
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: loading,
							className: "btn-lift flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-brass py-3.5 text-sm font-semibold text-ink hover:bg-brass-soft disabled:opacity-60",
							children: loading ? "Confirming…" : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Confirm my visit ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								setStep("form");
								setOtp("");
								setOtpErr(null);
							},
							className: "block w-full cursor-pointer text-center text-xs text-cream/60 hover:text-brass",
							children: "← Edit booking details"
						})
					]
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium uppercase tracking-[0.25em] text-brass",
							children: "Free Home Consultation"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-3 font-display text-3xl font-semibold text-cream sm:text-4xl",
							children: "Book your home visit"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-cream/70",
							children: "Takes under 2 minutes. We'll WhatsApp you to confirm."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSubmit(onSubmit),
					className: "mt-8 space-y-5 rounded-3xl bg-white p-6 shadow-2xl sm:p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Full name",
							error: errors.name?.message,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: fieldCls,
								placeholder: "Your name",
								...register("name")
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Phone number",
							error: errors.phone?.message,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex items-center gap-2 rounded-xl border border-ink/15 bg-white px-4 py-3 focus-within:border-brass",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-ink/70",
									children: "+91"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									inputMode: "numeric",
									maxLength: 10,
									placeholder: "98XXXXXXXX",
									className: "flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink/30",
									...register("phone")
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "City",
							error: errors.city?.message,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								className: fieldCls,
								defaultValue: "",
								...register("city"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									disabled: true,
									children: "Select your city"
								}), BRAND.cities.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: c }, c))]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Full address",
							error: errors.address?.message,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								rows: 3,
								className: fieldCls,
								placeholder: "House / Flat, Street, Sector, Landmark",
								...register("address")
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-5 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Preferred date",
								error: errors.date?.message,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "date",
									min: today,
									className: fieldCls,
									...register("date")
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Time slot",
								error: errors.slot?.message,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									className: fieldCls,
									defaultValue: "",
									...register("slot"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										disabled: true,
										children: "Pick a slot"
									}), SLOTS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: s.value,
										children: s.label
									}, s.value))]
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Hair concern",
							error: errors.concern?.message,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								className: fieldCls,
								defaultValue: "",
								...register("concern"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									disabled: true,
									children: "What brings you here?"
								}), CONCERNS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: c }, c))]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Notes (optional)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								rows: 2,
								className: fieldCls,
								placeholder: "Anything we should know?",
								...register("notes")
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: isSubmitting,
							className: "btn-lift mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-brass py-4 text-sm font-semibold text-ink hover:bg-brass-soft disabled:opacity-60",
							children: isSubmitting ? "Sending OTP…" : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Continue to verify ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })] })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-center text-xs text-cream/55",
					children: "Our expert arrives in plain, unbranded attire. Your privacy is guaranteed."
				})
			] })]
		})]
	});
}
function Field({ label, error, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
			className: labelCls,
			children: label
		}),
		children,
		error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1.5 text-xs text-red-600",
			children: error
		})
	] });
}
//#endregion
export { BookPage as component };
