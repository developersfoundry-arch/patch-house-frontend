// All editable site content lives here.

export const BRAND = {
  name: "PatchHouse",
  whatsappNumber: "919999999999", // E.164 without '+', placeholder
  whatsappMessage:
    "Hi! I'm interested in a free at-home hair patch consultation. My name is ____ and I'm located in ____ (Delhi NCR). Please share the next available slot.",
  cities: ["Delhi", "Noida", "Greater Noida", "Gurugram", "Ghaziabad", "Faridabad"],
};

export const waLink = (msg = BRAND.whatsappMessage) =>
  `https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent(msg)}`;

export const TRUST = [
  "Home visits across Delhi NCR",
  "Completely private",
  "Same-day fitting",
  "ID-verified experts",
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
  {
    n: "03",
    title: "Choose your patch",
    desc: "See options, textures & match your natural hair live.",
  },
  {
    n: "04",
    title: "Same-day fitting & styling",
    desc: "Walk into your next event with confidence.",
  },
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

export const EXPERTS = {
  kicker: "Who visits you",
  heading: "Who walks through your door.",
  intro:
    "A small, handpicked team — not gig workers. Every PatchHouse expert is someone we would send to our own family.",
  points: [
    {
      title: "ID-verified, every visit",
      desc: "You get your expert's name and photo on WhatsApp before they arrive. No strangers at your door.",
    },
    {
      title: "Years of fitting experience",
      desc: "Each expert fitted patches professionally in salons and studios before joining us. This is their craft, not a side job.",
    },
    {
      title: "Discreet by default",
      desc: "Plain clothes, an unmarked kit, no branding anywhere. To your neighbours, it's just a regular guest.",
    },
    {
      title: "Skin-safe practice",
      desc: "Trained on dermatologically tested adhesives, with hygienic single-use applicators on every visit.",
    },
  ],
};

export const TESTIMONIALS = [
  {
    initials: "RK",
    name: "Raj K.",
    age: 36,
    city: "Gurugram",
    rating: 5,
    quote:
      "No one in my building ever knew. I just looked better at my brother's wedding. The expert was completely professional.",
  },
  {
    initials: "AS",
    name: "Arvind S.",
    age: 42,
    city: "Noida",
    rating: 4,
    quote:
      "Had been hiding under caps for three years. They came on a Sunday morning and I had my hairline back by lunch. Took me a few days to get used to the adhesive, but now I don't even think about it.",
  },
  {
    initials: "MJ",
    name: "Manish J.",
    age: 31,
    city: "Delhi",
    rating: 5,
    quote:
      "What I valued most was the privacy. No clinic, no receptionist, no awkward stares. Just one calm conversation at home.",
  },
  {
    initials: "DP",
    name: "Deepak P.",
    age: 47,
    city: "Faridabad",
    rating: 4,
    quote:
      "I almost cancelled twice out of nerves. So glad I didn't. The first colour match wasn't quite right, but they redid it on the spot. My wife noticed I was smiling in photos again.",
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
    q: "What does maintenance actually cost per month?",
    a: "Plan for roughly ₹600–₹900 a month on adhesive and care products with daily wear. At-home re-taping visits are ₹799, and most clients book one every 3–4 weeks. We walk you through the full cost of ownership at the consultation — before you spend a rupee.",
  },
  {
    q: "How long does the home visit take?",
    a: "The analysis takes about 15 minutes. If you decide to go ahead, fitting, cutting, and styling take another 60–90 minutes — most visits are finished within two hours.",
  },
  {
    q: "What if I change my mind during the visit?",
    a: "Then you pay nothing. The consultation and patch demo are free, and no fitting fee is due unless you approve the final look in the mirror before our expert leaves.",
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
