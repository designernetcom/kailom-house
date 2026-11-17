import type { ProductDetail } from "../../components/ProductDetailPage";

type AbrasiveToolProductInput = {
  model: string;
  slug: string;
  name: string;
  freeSpeed: string;
  airInlet: string;
  hoseSize: string;
  weight: string;
};

function makeAbrasiveToolProduct(input: AbrasiveToolProductInput): ProductDetail {
  const description = `${input.model} ${input.name}. Review the supplied catalogue specifications and send Kailom House your finishing, grinding or sanding requirements for selection support.`;

  return {
    slug: input.slug,
    sharePath: `/tools/abrasive-tools/${input.slug}`,
    model: input.model,
    name: input.name,
    tagline: "Abrasive pneumatic tool",
    brand: "Kailom",
    category: "Abrasive Tools",
    categoryHref: "/tools/abrasive-tools",
    description,
    images: [],
    features: [
      input.name,
      `Free speed: ${input.freeSpeed} RPM`,
      `Air inlet: ${input.airInlet} NPT`,
      `Hose size ID: ${input.hoseSize}`,
    ],
    specifications: [
      { label: "Model No.", value: input.model },
      { label: "Description", value: input.name },
      { label: "Free Speed (RPM)", value: input.freeSpeed },
      { label: "Air Inlet (NPT)", value: input.airInlet },
      { label: "Hose Size ID (mm)", value: input.hoseSize },
      { label: "Weight (kgs)", value: input.weight },
    ],
    technicalNotes: ["Product information is presented exactly as supplied for catalogue reference."],
  };
}

export const abrasiveToolProducts: ProductDetail[] = [
  makeAbrasiveToolProduct({
    model: "KG-5206M",
    slug: "kg-5206m",
    name: "6 mm Heavy Duty Die Grinder",
    freeSpeed: "32000",
    airInlet: "1/4\"",
    hoseSize: "10 mm",
    weight: "0.73",
  }),
  makeAbrasiveToolProduct({
    model: "KG-512",
    slug: "kg-512",
    name: "6 mm Die Grinder",
    freeSpeed: "23000",
    airInlet: "1/4\"",
    hoseSize: "10 mm",
    weight: "0.6",
  }),
  makeAbrasiveToolProduct({
    model: "KG-5001",
    slug: "kg-5001",
    name: "3 mm Micro Die Grinder",
    freeSpeed: "56000",
    airInlet: "1/4\"",
    hoseSize: "10 mm",
    weight: "0.25",
  }),
  makeAbrasiveToolProduct({
    model: "KG-522",
    slug: "kg-522",
    name: "6 mm Angle Die Grinder",
    freeSpeed: "22000",
    airInlet: "1/4\"",
    hoseSize: "10 mm",
    weight: "0.5",
  }),
  makeAbrasiveToolProduct({
    model: "KAG-619",
    slug: "kag-619",
    name: "4\" Angle Grinder",
    freeSpeed: "12000",
    airInlet: "1/4\"",
    hoseSize: "10 mm",
    weight: "1.8",
  }),
  makeAbrasiveToolProduct({
    model: "KAS-6661-SM",
    slug: "kas-6661-sm",
    name: "7\" Angle Sander",
    freeSpeed: "4500",
    airInlet: "1/4\"",
    hoseSize: "10 mm",
    weight: "1.9",
  }),
  makeAbrasiveToolProduct({
    model: "KSAN-50VE",
    slug: "ksan-50ve",
    name: "5\" Orbital Sander",
    freeSpeed: "12000",
    airInlet: "1/4\"",
    hoseSize: "10 mm",
    weight: "0.81",
  }),
  makeAbrasiveToolProduct({
    model: "KBS-4518",
    slug: "kbs-4518",
    name: "10 mm Heavy Duty Belt Sander",
    freeSpeed: "16000",
    airInlet: "1/4\"",
    hoseSize: "10 mm",
    weight: "0.95",
  }),
  makeAbrasiveToolProduct({
    model: "KBS-4517",
    slug: "kbs-4517",
    name: "20 mm Heavy Duty Belt Sander",
    freeSpeed: "16000",
    airInlet: "1/4\"",
    hoseSize: "10 mm",
    weight: "1.4",
  }),
  makeAbrasiveToolProduct({
    model: "MG-120",
    slug: "mg-120",
    name: "3 mm Air Micro Die Grinder",
    freeSpeed: "65000",
    airInlet: "1/4\"",
    hoseSize: "6.4 mm",
    weight: "0.1",
  }),
];

export function getAbrasiveToolProduct(slug: string) {
  return abrasiveToolProducts.find((product) => product.slug === slug) ?? null;
}
