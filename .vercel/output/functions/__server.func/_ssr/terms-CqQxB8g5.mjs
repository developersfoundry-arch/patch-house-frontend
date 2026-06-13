import { n as BRAND } from "./content-CrqpDPtY.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/terms-CqQxB8g5.js
var import_jsx_runtime = require_jsx_runtime();
var SECTIONS = [
	{
		h: "Consultations",
		p: "The at-home consultation and patch demo are free of charge and carry no obligation. You may end the visit at any point without paying anything."
	},
	{
		h: "Pricing & payment",
		p: "Indicative prices are listed on this site; your final price is confirmed at home after the scalp and hair analysis, before any fitting begins. No fitting fee is due unless you approve the final look in the mirror. Payment is accepted by UPI, card, or cash after the fitting."
	},
	{
		h: "Service area & scheduling",
		p: "We currently serve Delhi, Noida, Greater Noida, Gurugram, Ghaziabad, and Faridabad. Same-day slots are subject to availability. If we need to reschedule, we will inform you on WhatsApp as early as possible — and we ask the same courtesy of you."
	},
	{
		h: "Aftercare & service visits",
		p: "Patch lifespan estimates (4–6 months classic, 8–12 months premium) assume the recommended care routine. Re-taping and maintenance visits are chargeable at the rates communicated during your consultation. Plan-specific inclusions, such as free service visits, are honoured as listed at the time of purchase."
	},
	{
		h: "Your responsibility",
		p: "Please tell our expert about any scalp conditions, allergies, or sensitivities before fitting. Adhesives are dermatologically tested, but we will recommend a patch test if you have a history of skin reactions."
	}
];
function TermsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-screen bg-background px-5 py-16 sm:px-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "font-display text-2xl font-semibold text-foreground transition hover:text-brass",
					children: [BRAND.name.replace("House", ""), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-brass",
						children: "House"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-10 font-display text-4xl font-semibold text-foreground",
					children: "Terms of Service"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted-foreground",
					children: "Plain language, no fine print. These terms apply to every PatchHouse visit."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 space-y-8",
					children: SECTIONS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-semibold text-foreground",
						children: s.h
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 leading-relaxed text-muted-foreground",
						children: s.p
					})] }, s.h))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "mt-12 inline-flex items-center rounded-full border border-foreground/20 px-5 py-2.5 text-sm font-medium text-foreground transition hover:border-brass hover:text-brass",
					children: "← Back to home"
				})
			]
		})
	});
}
//#endregion
export { TermsPage as component };
