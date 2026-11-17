import type { ProductDetail } from "../../components/ProductDetailPage";

export type ImpactWrenchProduct = ProductDetail & {
  torque: string;
  speed: string;
  drive: string;
  airInlet: string;
  weight: string;
};

type ProductSeed = {
  model: string;
  name: string;
  tagline?: string;
  slug: string;
  brand: string;
  description: string;
  features: readonly string[];
  specifications: readonly { label: string; value: string }[];
  technicalNotes: readonly string[];
  published: boolean;
  featured: boolean;
  sortOrder: number;
  torque: string;
  speed: string;
  drive: string;
  airInlet: string;
  weight: string;
  image?: string;
  imageAlt?: string;
};

function makeProduct(seed: ProductSeed): ImpactWrenchProduct {
  const { image, imageAlt, ...product } = seed;
  return {
    ...product,
    category: "Impact Wrenches",
    sharePath: `/tools/impact-wrenches/${product.slug}`,
    categoryHref: "/tools/impact-wrenches",
    images: image ? [{ src: image, alt: imageAlt ?? `${product.model} product image` }] : [],
  };
}

const sharedImpactFeatures = [
  "Pneumatic pistol-type tool for fastening applications",
  "Air-driven performance for workshop and production use",
  "Compact format with clear model-specific technical data",
];

const sharedRatchetFeatures = [
  "Pneumatic ratchet format for controlled fastening applications",
  "Compact profile for access around assemblies",
  "Air-driven performance for workshop and production use",
];

export const impactWrenchProducts: ImpactWrenchProduct[] = [
  makeProduct({ model: "KW-4114", name: "1/2\" Mini Impact Wrench", slug: "kw-4114", brand: "PAT", description: "The KW-4114 1/2\" Impact Wrench features a composite motor housing, twin hammer, thumb operated forward and reverse switches for one hand operation, and a variable speed trigger.", torque: "960", speed: "12,000", drive: "1/2 (13)", airInlet: "1/4\"", weight: "1.24", image: "/assets/img/products/impact-wrenches/KW-4114.png", imageAlt: "KW-4114 1/2 inch Mini Impact Wrench - PAT", features: ["Composite Motor Housing", "Twin Hammer", "Thumb Operated Forward and Reverse Switches Provide One Hand Operation", "Variable Speed Trigger"], specifications: [{ label: "Model No.", value: "KW-4114" }, { label: "Free Speed (RPM)", value: "12,000" }, { label: "Anvil Size Inch (mm)", value: "1/2 (13)" }, { label: "Loosening Torque (Max.) Ft-lbs (Nm)", value: "460 (624)" }, { label: "Maximum Torque Ft-lbs (Nm)", value: "960 (1,302)" }, { label: "Working Torque Range Ft-lbs (Nm)", value: "25-250 (34-338)" }, { label: "Air Inlet (NPT)", value: "1/4\"" }, { label: "Hose Size ID Inch (mm)", value: "3/8 (10)" }, { label: "Average Air Consumption CFM (L/Min)", value: "4 (113)" }, { label: "Length Inch (mm)", value: "6.2 (157)" }, { label: "Weight Lbs (Kg)", value: "2.73 (1.24)" }], technicalNotes: ["Recommended Air Pressure at 90PSI (6.2 Bar)", "Max. Torque and Reverse Torque to be Tested by Removing Damping Material"], published: true, featured: false, sortOrder: 1 }),
  makeProduct({ model: "KW-4134", name: "1/2\" Impact Wrench", slug: "kw-4134", brand: "PAT", description: "The KW-4134 1/2\" Impact Wrench features a composite motor housing, twin hammer, thumb operated forward and reverse switches for one hand operation, and a variable speed trigger.", torque: "820", speed: "8,000", drive: "1/2 (13)", airInlet: "1/4\"", weight: "1.91", image: "/assets/img/products/impact-wrenches/KW-4134.png", imageAlt: "KW-4134 1/2 inch Impact Wrench - PAT", features: ["Composite Motor Housing", "Twin Hammer", "Thumb Operated Forward and Reverse Switches Provide One Hand Operation", "Variable Speed Trigger"], specifications: [{ label: "Model No.", value: "KW-4134" }, { label: "Free Speed (RPM)", value: "8,000" }, { label: "Anvil Size Inch (mm)", value: "1/2 (13)" }, { label: "Loosening Torque (Max.) Ft-lbs (Nm)", value: "1,300 (1,756)" }, { label: "Maximum Torque Ft-lbs (Nm)", value: "820 (1,112)" }, { label: "Working Torque Range Ft-lbs (Nm)", value: "50-580 (68-786)" }, { label: "Air Inlet (NPT)", value: "1/4\"" }, { label: "Hose Size ID Inch (mm)", value: "3/8 (10)" }, { label: "Average Air Consumption CFM (L/Min)", value: "4 (113)" }, { label: "Length Inch (mm)", value: "7.4 (187)" }, { label: "Weight Lbs (Kg)", value: "4.21 (1.91)" }], technicalNotes: ["Recommended Air Pressure at 90PSI (6.2 Bar)", "Max. Torque and Reverse Torque to be Tested by Removing Damping Material"], published: true, featured: false, sortOrder: 2 }),
  makeProduct({ model: "KW-2142", name: "PAT MAKE 3/8\" BUTTERFLY", tagline: "3/8\" Butterfly Impact Wrench", slug: "kw-2142", brand: "PAT", description: "A PAT-made 3/8\" butterfly impact wrench with a single hammer, grip and heavy-duty construction.", torque: "75", speed: "10,000", drive: "3/8 (10)", airInlet: "1/4\"", weight: "0.9", image: "/assets/img/products/impact-wrenches/KW-2142.png", imageAlt: "KW-2142 3/8 inch Butterfly Impact Wrench - PAT", features: ["Single Hammer", "With Grip", "Heavy-Duty"], specifications: [{ label: "Model No.", value: "KW-2142" }, { label: "Free Speed (RPM)", value: "10,000" }, { label: "Anvil Size Inch (mm)", value: "3/8 (10)" }, { label: "Maximum Torque Ft-Ibs (Nm)", value: "75 (101)" }, { label: "Working Torque Range Ft-Ibs (Nm)", value: "5~50 (7~68)" }, { label: "Air Inlet (NPT)", value: "1/4\"" }, { label: "Hose Size ID Inch (mm)", value: "3/8 (10)" }, { label: "Air Consumption CFM (L/Min)", value: "3 (85)" }, { label: "Length Inch (mm)", value: "5.9 (150)" }, { label: "Weight Lbs (Kg)", value: "2 (0.9)" }], technicalNotes: [], published: true, featured: false, sortOrder: 3 }),
  makeProduct({
    model: "KW-4114P",
    name: "3/8\" Impact Wrench",
    slug: "kw-4114p",
    brand: "PAT",
    description:
      "The KW-4114P 3/8\" Impact Wrench features a composite motor housing, twin hammer, thumb operated forward and reverse switches for one hand operation, and a variable speed trigger.",
    torque: "430",
    speed: "12,000",
    drive: "3/8 (10)",
    airInlet: "1/4\"",
    weight: "1.24",
    image: "/assets/img/products/impact-wrenches/KW-4114P.png",
    imageAlt: "KW-4114P 3/8 inch Impact Wrench - PAT",
    features: [
      "Composite Motor Housing",
      "Twin Hammer",
      "Thumb Operated Forward and Reverse Switches Provide One Hand Operation",
      "Variable Speed Trigger",
    ],
    specifications: [
      { label: "Model No.", value: "KW-4114P" },
      { label: "Free Speed (RPM)", value: "12,000" },
      { label: "Anvil Size Inch (mm)", value: "3/8 (10)" },
      { label: "Maximum Torque Ft-lbs (Nm)", value: "430 (583)" },
      { label: "Working Torque Range Ft-lbs (Nm)", value: "25-250 (34-338)" },
      { label: "Air Inlet (NPT)", value: "1/4\"" },
      { label: "Hose Size ID Inch (mm)", value: "3/8 (10)" },
      { label: "Average Air Consumption CFM (L/Min)", value: "4 (113)" },
      { label: "Length Inch (mm)", value: "6.2 (157)" },
      { label: "Weight Lbs (Kg)", value: "2.73 (1.24)" },
    ],
    technicalNotes: [
      "Recommended Air Pressure at 90PSI (6.2 Bar)",
      "Max. Torque and Reverse Torque to be Tested by Removing Damping Material",
    ],
    published: true,
    featured: false,
    sortOrder: 4,
  }),
  makeProduct({
    model: "KW-4154",
    name: "3/4\" Impact Wrench",
    slug: "kw-4154",
    brand: "PAT",
    description:
      "The KW-4154 3/4\" Impact Wrench features a composite motor housing, twin hammer, thumb operated forward and reverse switches for one hand operation, and a variable speed trigger.",
    torque: "1,500",
    speed: "5,500",
    drive: "3/4 (19)",
    airInlet: "3/8\"",
    weight: "3.44",
    image: "/assets/img/products/impact-wrenches/KW-4154.png",
    imageAlt: "KW-4154 3/4 inch Impact Wrench - PAT",
    features: [
      "Composite Motor Housing",
      "Twin Hammer",
      "Thumb Operated Forward and Reverse Switches Provide One Hand Operation",
      "Variable Speed Trigger",
    ],
    specifications: [
      { label: "Model No.", value: "KW-4154" },
      { label: "Free Speed (RPM)", value: "5,500" },
      { label: "Anvil Size Inch (mm)", value: "3/4 (19)" },
      { label: "Maximum Torque Ft-lbs (Nm)", value: "1,500 (2,034)" },
      { label: "Working Torque Range Ft-lbs (Nm)", value: "200-1,200 (271-1,627)" },
      { label: "Air Inlet (NPT)", value: "3/8\"" },
      { label: "Hose Size ID Inch (mm)", value: "1/2 (13)" },
      { label: "Average Air Consumption CFM (L/Min)", value: "7 (198)" },
      { label: "Length Inch (mm)", value: "8.7 (220)" },
      { label: "Weight Lbs (Kg)", value: "7.59 (3.44)" },
    ],
    technicalNotes: [
      "Recommended Air Pressure at 90PSI (6.2 Bar)",
      "Max. Torque and Reverse Torque to be Tested by Removing Damping Material",
    ],
    published: true,
    featured: false,
    sortOrder: 5,
  }),
  makeProduct({
    model: "KW-4059P",
    name: "3/4\" Impact Wrench",
    slug: "kw-4059",
    brand: "PAT",
    description:
      "The KW-4059P 3/4\" Impact Wrench features a composite motor housing, twin hammer clutch mechanism, one-hand push-button forward and reverse control, and a 360° swivel air inlet.",
    torque: "1,500",
    speed: "5,500",
    drive: "3/4 (19)",
    airInlet: "3/8\"",
    weight: "3.4",
    image: "/assets/img/products/impact-wrenches/KW-4059.png",
    imageAlt: "KW-4059P 3/4 inch Impact Wrench - PAT",
    features: [
      "Composite Motor Housing",
      "Twin Hammer Clutch Mechanism",
      "Push Button One Hand Forward / Reverse",
      "Available Optional Exhaust Hose Assembly",
      "Handle Exhaust",
      "360° Swivel Air Inlet",
      "Lightweight",
      "Low Noise 90 dB(A)",
    ],
    specifications: [
      { label: "Model No.", value: "KW-4059P" },
      { label: "Free Speed (RPM)", value: "5,500" },
      { label: "Anvil Size Inch (mm)", value: "3/4 (19)" },
      { label: "Maximum Torque Ft-lbs (Nm)", value: "1,500 (2,034)" },
      { label: "Working Torque Range Ft-lbs (Nm)", value: "200-900 (271-1,224)" },
      { label: "Air Inlet (NPT)", value: "3/8\"" },
      { label: "Hose Size ID Inch (mm)", value: "1/2 (13)" },
      { label: "Average Air Consumption CFM (L/Min)", value: "7 (198)" },
      { label: "Length Inch (mm)", value: "8.5 (215)" },
      { label: "Weight Lbs (Kg)", value: "7.5 (3.4)" },
      { label: "Noise Level dB(A)", value: "90" },
    ],
    technicalNotes: [
      "Recommended Air Pressure at 90PSI (6.2 Bar)",
      "Max. Torque and Reverse Torque to be Tested by Removing Damping Material",
    ],
    published: true,
    featured: false,
    sortOrder: 6,
  }),
  makeProduct({
    model: "KW-4073L",
    name: "1\" Light Duty Impact Wrench",
    slug: "kw-4073l",
    brand: "PAT",
    description:
      "The KW-4073L 1\" Light Duty Impact Wrench features a side support handle for better control, a bended handle with inside trigger, twin hammer clutch mechanism, and lightweight construction.",
    torque: "1,800",
    speed: "6,000",
    drive: "1 (25.4)",
    airInlet: "1/2\"",
    weight: "7.3",
    image: "/assets/img/products/impact-wrenches/KW-4073L.png",
    imageAlt: "KW-4073L 1 inch Light Duty Impact Wrench - PAT",
    features: [
      "Side Support Handle for Better Control when Operate",
      "Bended Handle with Inside Trigger",
      "with Steel Ring to Retain the Sockets",
      "Twin Hammer Clutch Mechanism",
      "Lightweight",
    ],
    specifications: [
      { label: "Model No.", value: "KW-4073L" },
      { label: "Free Speed (RPM)", value: "6,000" },
      { label: "Anvil Size Inch (mm)", value: "1 (25.4)" },
      { label: "Maximum Torque Ft-lbs (Nm)", value: "1,800 (2,441)" },
      { label: "Working Torque Range Ft-lbs (Nm)", value: "200~1,500 (271~2,033)" },
      { label: "Air Inlet (NPT)", value: "1/2\"" },
      { label: "Hose Size ID Inch (mm)", value: "1/2 (13)" },
      { label: "Average Air Consumption CFM (L/Min)", value: "10 (282)" },
      { label: "Length Inch (mm)", value: "18.3 (466)" },
      { label: "Weight Lbs (Kg)", value: "16.1 (7.3)" },
      { label: "Noise Level dB(A)", value: "96" },
    ],
    technicalNotes: [
      "Recommended Air Pressure at 90PSI (6.2 Bar)",
      "Max. Torque and Reverse Torque to be Tested by Removing Damping Material",
    ],
    published: true,
    featured: false,
    sortOrder: 7,
  }),
  makeProduct({
    model: "KW-4074",
    name: "1\" Light Duty Impact Wrench",
    slug: "kw-4074",
    brand: "PAT",
    description:
      "The KW-4074 1\" Light Duty Impact Wrench features a twin hammer clutch mechanism, adjustable side handle, three-position power setting in forward and reverse, and handle exhaust.",
    torque: "1,800",
    speed: "6,000",
    drive: "1 (25.4)",
    airInlet: "1/2\"",
    weight: "6.3",
    image: "/assets/img/products/impact-wrenches/KW-4074.png",
    imageAlt: "KW-4074 1 inch Light Duty Impact Wrench - PAT",
    features: [
      "1\" Light Duty Impact Wrench",
      "Twin Hammer Clutch Mechanism",
      "Adjustable Side Handle",
      "3 Position Power Setting in Forward and Reverse",
      "Handle Exhaust",
    ],
    specifications: [
      { label: "Model No.", value: "KW-4074" },
      { label: "Free Speed (RPM)", value: "6,000" },
      { label: "Anvil Size Inch (mm)", value: "1 (25.4)" },
      { label: "Maximum Torque Ft-lbs (Nm)", value: "1,800 (2,441)" },
      { label: "Working Torque Range Ft-lbs (Nm)", value: "220~1,450 (300~1,965)" },
      { label: "Air Inlet (NPT)", value: "1/2\"" },
      { label: "Hose Size ID Inch (mm)", value: "1/2 (13)" },
      { label: "Average Air Consumption CFM (L/Min)", value: "10 (282)" },
      { label: "Length Inch (mm)", value: "9.7 (247)" },
      { label: "Weight Lbs (Kg)", value: "13.9 (6.3)" },
    ],
    technicalNotes: [
      "Recommended Air Pressure at 90PSI (6.2 Bar)",
      "Max. Torque and Reverse Torque to be Tested by Removing Damping Material",
    ],
    published: true,
    featured: false,
    sortOrder: 8,
  }),
  makeProduct({ model: "KRW-1002", name: "3/8\" Ratchet Wrench", slug: "krw-1002", brand: "Kailom", description: "A compact 3/8 inch pneumatic ratchet wrench for controlled fastening in confined spaces.", torque: "240", speed: "41", drive: "1/4\"", airInlet: "10 mm", weight: "0.52", image: "/assets/img/products/impact-wrenches/KRW-1002.png", imageAlt: "KRW-1002 3/8 inch Ratchet Wrench - Kailom", features: sharedRatchetFeatures, specifications: [{ label: "Model No.", value: "KRW-1002" }, { label: "Max Torque (Nm)", value: "240" }, { label: "Free Speed (RPM)", value: "41" }, { label: "Drive Size", value: "1/4\"" }, { label: "Air Inlet", value: "10 mm" }, { label: "Weight (kg)", value: "0.52" }], technicalNotes: [], published: true, featured: false, sortOrder: 9 }),
  makeProduct({
    model: "KRW-1004",
    name: "1/2\" Ratchet Wrench",
    slug: "krw-1004",
    brand: "PAT",
    description:
      "The KRW-1004 1/2\" Super Duty Air Ratchet delivers 90 ft-lb (122 Nm) of maximum torque with a 225 rpm free speed and an ergonomically enhanced composite handle grip.",
    torque: "90",
    speed: "225",
    drive: "1/2\"",
    airInlet: "1/4\" NPT (PT)",
    weight: "1.6",
    image: "/assets/img/products/impact-wrenches/KRW-1004.png",
    imageAlt: "KRW-1004 1/2 inch Ratchet Wrench - PAT",
    features: [
      "1/2\" Super Duty Air Ratchet",
      "The ergonomically enhanced composite handle grip with professional and super touch",
      "Dust-free designs of ratchet housing keeps away the dirt and other objects",
      "Prevents deforming life cycle",
      "360 degree exhaust rotation direct air away from working area",
      "360 degree rotate air inlet allow air hose rotate freely",
      "Built-in power regular for adjusting required motor speed and torque output",
      "Excellent for body shop use, radiator removal, spark plug replacement, water pump work and dashboard work",
    ],
    specifications: [
      { label: "Model No.", value: "KRW-1004" },
      { label: "Maximum Torque Ft-lb (Nm)", value: "90 (122)" },
      { label: "Free Speed (RPM)", value: "225" },
      { label: "Anvil Size Inch (mm)", value: "1/2\"" },
      { label: "Weight Lbs (Kg)", value: "3.52 (1.6)" },
      { label: "Length Inch (mm)", value: "12-21/64 (313)" },
      { label: "Air Pressure PSI (Bar)", value: "90 (6.3)" },
      { label: "Air Inlet (NPT)", value: "1/4\" NPT (PT)" },
      { label: "Sound dBA (Pressure/Power)", value: "95/105" },
    ],
    technicalNotes: [],
    published: true,
    featured: false,
    sortOrder: 10,
  }),
];

export function getImpactWrenchProduct(slug: string) {
  return impactWrenchProducts.find((product) => product.slug === slug) ?? null;
}
