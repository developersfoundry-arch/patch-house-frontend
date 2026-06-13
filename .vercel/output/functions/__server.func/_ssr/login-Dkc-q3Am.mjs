import { i as __toESM } from "../_runtime.mjs";
import { n as BRAND } from "./content-CrqpDPtY.mjs";
import { t as api } from "./api-DU9Ccmp7.mjs";
import { n as isAuthenticated, r as setAuthUser } from "./auth-DCHKPFMY.mjs";
import { r as signInWithPhoneNumber, t as RecaptchaVerifier } from "../_libs/firebase__auth.mjs";
import "../_libs/firebase.mjs";
import { t as auth } from "./firebase-Bx8lgN4r.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { y as ArrowRight } from "../_libs/lucide-react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-Dkc-q3Am.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	const navigate = useNavigate();
	const [step, setStep] = (0, import_react.useState)("phone");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [otp, setOtp] = (0, import_react.useState)("");
	const [err, setErr] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const verifierRef = (0, import_react.useRef)(null);
	const confirmationRef = (0, import_react.useRef)(null);
	const { data: existingUser } = useQuery({
		queryKey: ["me"],
		queryFn: () => api.get("/me"),
		retry: false,
		enabled: isAuthenticated()
	});
	(0, import_react.useEffect)(() => {
		if (existingUser) navigate({
			to: "/dashboard",
			replace: true
		});
	}, [existingUser, navigate]);
	(0, import_react.useEffect)(() => {
		verifierRef.current = new RecaptchaVerifier(auth, "recaptcha-container", { size: "invisible" });
		return () => {
			verifierRef.current?.clear();
			verifierRef.current = null;
		};
	}, []);
	const submitPhone = async (e) => {
		e.preventDefault();
		if (!/^\d{10}$/.test(phone)) {
			setErr("Please enter a 10-digit mobile number");
			return;
		}
		setErr(null);
		setLoading(true);
		try {
			if (!verifierRef.current) verifierRef.current = new RecaptchaVerifier(auth, "recaptcha-container", { size: "invisible" });
			confirmationRef.current = await signInWithPhoneNumber(auth, `+91${phone}`, verifierRef.current);
			setStep("otp");
		} catch {
			setErr("Failed to send OTP. Please check the number and try again.");
			verifierRef.current?.clear();
			verifierRef.current = new RecaptchaVerifier(auth, "recaptcha-container", { size: "invisible" });
		} finally {
			setLoading(false);
		}
	};
	const submitOtp = async (e) => {
		e.preventDefault();
		if (!/^\d{6}$/.test(otp)) {
			setErr("Enter the 6-digit OTP");
			return;
		}
		setErr(null);
		setLoading(true);
		try {
			const idToken = await (await confirmationRef.current.confirm(otp)).user.getIdToken();
			const user = await api.post("/auth/firebase", { id_token: idToken });
			setAuthUser({
				id: user.id,
				phone: user.phone,
				name: user.name
			});
			navigate({
				to: "/dashboard",
				replace: true
			});
		} catch {
			setErr("Incorrect OTP. Please try again.");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "section-dark grain flex min-h-screen items-center justify-center px-5 py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { id: "recaptcha-container" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "mb-10 block text-center font-display text-2xl font-semibold text-cream",
					children: [BRAND.name.replace("House", ""), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-brass",
						children: "House"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-3xl font-semibold text-cream",
							children: "Welcome back"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-cream/70",
							children: step === "phone" ? "Log in with your phone number." : `OTP sent to +91 ${phone}`
						}),
						step === "phone" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: submitPhone,
							className: "mt-8 space-y-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-medium uppercase tracking-widest text-cream/60",
									children: "Mobile number"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 flex items-center gap-2 rounded-xl border border-white/15 bg-ink/40 px-4 py-3 focus-within:border-brass",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-cream/70",
										children: "+91"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										inputMode: "numeric",
										maxLength: 10,
										value: phone,
										onChange: (e) => setPhone(e.target.value.replace(/\D/g, "")),
										placeholder: "98XXXXXXXX",
										className: "flex-1 bg-transparent text-cream outline-none placeholder:text-cream/30"
									})]
								}),
								err && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-xs text-red-400",
									children: err
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								disabled: loading,
								className: "btn-lift flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-brass py-3.5 text-sm font-semibold text-ink hover:bg-brass-soft disabled:opacity-60",
								children: loading ? "Sending…" : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Send OTP ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })] })
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
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
									err && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-xs text-red-400",
										children: err
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									disabled: loading,
									className: "btn-lift flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-brass py-3.5 text-sm font-semibold text-ink hover:bg-brass-soft disabled:opacity-60",
									children: loading ? "Verifying…" : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Verify & continue ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })] })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										setStep("phone");
										setOtp("");
										setErr(null);
									},
									className: "block w-full cursor-pointer text-center text-xs text-cream/60 hover:text-brass",
									children: "Use a different number"
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-center text-xs text-cream/50",
					children: "By continuing you agree to our private & confidential service terms."
				})
			]
		})]
	});
}
//#endregion
export { LoginPage as component };
