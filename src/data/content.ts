// All editable site content lives here.

export const BRAND = {
  name: "StrandsAtHome",
  whatsappNumber: "919999999999", // E.164 without '+', placeholder
  whatsappMessage:
    "Hi! I'm interested in a free at-home hair patch consultation. My name is ____ and I'm located in ____ (Delhi NCR). Please share the next available slot.",
  cities: ["Delhi", "Noida", "Greater Noida", "Gurugram", "Ghaziabad", "Faridabad"],
};

export const waLink = (msg = BRAND.whatsappMessage) =>
  `https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent(msg)}`;

export const TRUST = [
  "500+ home fittings",
  "100% private",
  "Same-day service",
  "Trained & verified experts",
];

export const PROBLEMS = [
  { icon: "Camera", line: "Avoiding events and cameras" },
  { icon: "FlaskConical", line: "Trying oils and pills that never work" },
  { icon: "DoorClosed", line: "Too embarrassed to walk into a clinic" },
];

// Before/After pairs — same person, before and after the at-home patch fitting.
// Swap to real client photos later (consented).
import ba1Before from "@/assets/ba-1-before.jpg";
import ba1After from "@/assets/ba-1-after.jpg";
import ba2Before from "@/assets/ba-2-before.jpg";
import ba2After from "@/assets/ba-2-after.jpg";
import ba3Before from "@/assets/ba-3-before.jpg";
import ba3After from "@/assets/ba-3-after.jpg";

export const BEFORE_AFTER = [
  {
    name: "Rohit, 34",
    city: "Gurugram",
    type: "Front + crown patch",
    before: ba1Before,
    after: ba1After,
  },
  {
    name: "Arjun, 41",
    city: "Noida",
    type: "Crown patch",
    before: ba2Before,
    after: ba2After,
  },
  {
    name: "Vikram, 29",
    city: "Delhi",
    type: "Hairline rebuild",
    before: ba3Before,
    after: ba3After,
  },
];

export const STEPS = [
  { n: "01", title: "Book online or on WhatsApp", desc: "Share your details in 2 minutes." },
  { n: "02", title: "Expert visits your home", desc: "Private hair & scalp analysis." },
  { n: "03", title: "Choose your patch", desc: "See options, textures & match your natural hair live." },
  { n: "04", title: "Same-day fitting & styling", desc: "Walk into your next event with confidence." },
];

export const COMPARISON = {
  clinic: [
    "Travel + waiting room",
    "Being seen walking in",
    "Salesy upsells on the spot",
    "Multiple visits before fitting",
  ],
  us: [
    "Expert comes to you",
    "Complete privacy at home",
    "Transparent pricing upfront",
    "One visit, start to finish",
  ],
};

export const PRICING = [
  {
    name: "Trial / Consultation",
    price: "₹0",
    tagline: "Free home analysis & patch demo",
    features: [
      "Private at-home scalp & hair analysis",
      "Live patch sampling on your hair",
      "Honest recommendation, no pressure",
      "No fitting fee, no card details",
    ],
    cta: "Book free visit",
    featured: false,
  },
  {
    name: "Classic Patch",
    price: "From ₹14,999",
    tagline: "Natural synthetic-blend patch",
    features: [
      "Custom-matched synthetic-blend patch",
      "At-home fitting & styling",
      "Daily-wear adhesive starter kit",
      "Aftercare guidance call",
      "30-day comfort check",
    ],
    cta: "Get started",
    featured: false,
  },
  {
    name: "Premium Human Hair",
    price: "From ₹24,999",
    tagline: "100% human-hair patch",
    features: [
      "100% real human hair, custom density",
      "At-home fitting, cut & blend",
      "2 free in-home service visits",
      "Premium hold adhesive system",
      "Priority WhatsApp support",
    ],
    cta: "Choose Premium",
    featured: true,
  },
];

export const TESTIMONIALS = [
  {
    initials: "RK",
    name: "Raj K.",
    age: 36,
    city: "Gurugram",
    quote:
      "No one in my building ever knew. I just looked better at my brother's wedding. The expert was completely professional.",
  },
  {
    initials: "AS",
    name: "Arvind S.",
    age: 42,
    city: "Noida",
    quote:
      "I had been hiding under caps for three years. They came home on a Sunday morning and I had my hairline back by lunch.",
  },
  {
    initials: "MJ",
    name: "Manish J.",
    age: 31,
    city: "Delhi",
    quote:
      "What I valued most was the privacy. No clinic, no receptionist, no awkward stares. Just one calm conversation at home.",
  },
  {
    initials: "DP",
    name: "Deepak P.",
    age: 47,
    city: "Faridabad",
    quote:
      "I almost cancelled twice out of nerves. So glad I didn't. My wife actually noticed I was smiling in photos again.",
  },
];

export const FAQ = [
  {
    q: "Is a hair patch visible or detectable?",
    a: "A correctly matched and fitted patch is undetectable in everyday life. We match density, direction, and color to your existing hair so it blends seamlessly — even close up.",
  },
  {
    q: "How long does a patch last?",
    a: "Our classic patches last 4–6 months with daily wear, and premium human-hair patches last 8–12 months. Care and adhesive choice both extend lifespan.",
  },
  {
    q: "Does it damage existing hair?",
    a: "No. Patches sit on the bald zone and are bonded only to skin or remaining hair edges using skin-safe adhesives. We do not cut, glue into, or pull on healthy hair.",
  },
  {
    q: "What happens during the home visit?",
    a: "Our expert arrives in plain, unbranded attire with a discreet kit. We do a 15-minute analysis, show you matching patches, and — if you choose to proceed — fit and style on the same visit.",
  },
  {
    q: "Which areas do you serve?",
    a: "All of Delhi NCR: Delhi, Noida, Greater Noida, Gurugram, Ghaziabad, and Faridabad. Same-day slots are usually available.",
  },
  {
    q: "Can I swim, exercise, or shower with it?",
    a: "Yes. Showering and gym are fine from day one with the standard adhesive. For regular swimming, we recommend the premium hold system.",
  },
  {
    q: "Is the visit really private?",
    a: "Yes. Unmarked car, no branded uniform, no clinic stationery. Your phone number and address are never shared and never used for marketing.",
  },
];
