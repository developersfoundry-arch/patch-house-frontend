import { n as BRAND } from "./content-CrqpDPtY.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/privacy-DolCpKfh.js
var import_jsx_runtime = require_jsx_runtime();
var SECTIONS = [
	{
		h: "What we collect",
		p: "When you book a visit or message us on WhatsApp, we collect your name, phone number, city, address, and your preferred visit slot. During the consultation, our expert may note basic details about your hair and scalp to recommend the right patch."
	},
	{
		h: "How we use it",
		p: "Only to schedule and deliver your home visit, follow up on your fitting, and provide aftercare support. We do not run marketing campaigns on your number, and we never add you to promotional broadcast lists without your explicit consent."
	},
	{
		h: "What we never do",
		p: "We never sell, rent, or share your personal information with third parties. Your address is shared only with the expert assigned to your visit, and only for that visit. No photos of you are ever taken or kept without your written consent."
	},
	{
		h: "Data retention & deletion",
		p: "We keep your booking details only as long as needed to serve you. Message us on WhatsApp at any time to have your information deleted from our records — we confirm deletion within 7 days."
	},
	{
		h: "Contact",
		p: "For any privacy question or request, reach us on WhatsApp at the number listed on this site. We respond within one business day."
	}
];
function PrivacyPage() {
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
					children: "Privacy Policy"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted-foreground",
					children: "Privacy isn't a page on our site — it's the reason we exist. Here's exactly how we handle your information."
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
export { PrivacyPage as component };
