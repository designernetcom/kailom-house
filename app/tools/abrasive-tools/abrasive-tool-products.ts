import type { ProductDetail } from "../../components/ProductDetailPage";

type AbrasiveToolProductInput = {
  model: string;
  slug: string;
  name: string;
  freeSpeed: string;
  airInlet: string;
  hoseSize: string;
  weight: string;
  image?: string;
  imageAlt?: string;
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
    images: input.image
      ? [{ src: input.image, alt: input.imageAlt ?? `${input.model} product image` }]
      : [],
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
    image: "/assets/img/products/abrasive-tools/KG-5206M.png",
    imageAlt: "KG-5206M 6 mm Heavy Duty Die Grinder - Kailom",
  }),
  makeAbrasiveToolProduct({
    model: "KG-512",
    slug: "kg-512",
    name: "6 mm Die Grinder",
    freeSpeed: "23000",
    airInlet: "1/4\"",
    hoseSize: "10 mm",
    weight: "0.6",
    image: "/assets/img/products/abrasive-tools/KG-512.png",
    imageAlt: "KG-512 6 mm Die Grinder - Kailom",
  }),
  makeAbrasiveToolProduct({
    model: "KG-5001",
    slug: "kg-5001",
    name: "3 mm Micro Die Grinder",
    freeSpeed: "56000",
    airInlet: "1/4\"",
    hoseSize: "10 mm",
    weight: "0.25",
    image: "/assets/img/products/abrasive-tools/KG-5001.png",
    imageAlt: "KG-5001 3 mm Micro Die Grinder - Kailom",
  }),
  makeAbrasiveToolProduct({
    model: "KG-522",
    slug: "kg-522",
    name: "6 mm Angle Die Grinder",
    freeSpeed: "22000",
    airInlet: "1/4\"",
    hoseSize: "10 mm",
    weight: "0.5",
    image: "/assets/img/products/abrasive-tools/KG-522.png",
    imageAlt: "KG-522 6 mm Angle Die Grinder - Kailom",
  }),
  makeAbrasiveToolProduct({
    model: "KAG-619",
    slug: "kag-619",
    name: "4\" Angle Grinder",
    freeSpeed: "12000",
    airInlet: "1/4\"",
    hoseSize: "10 mm",
    weight: "1.8",
    image: "/assets/img/products/abrasive-tools/KAG-619.png",
    imageAlt: "KAG-619 4 inch Angle Grinder - Kailom",
  }),
  makeAbrasiveToolProduct({
    model: "KAS-6661-SM",
    slug: "kas-6661-sm",
    name: "7\" Angle Sander",
    freeSpeed: "4500",
    airInlet: "1/4\"",
    hoseSize: "10 mm",
    weight: "1.9",
    image: "/assets/img/products/abrasive-tools/KAS-6661-SM.png",
    imageAlt: "KAS-6661-SM 7 inch Angle Sander - Kailom",
  }),
  makeAbrasiveToolProduct({
    model: "KSAN-50VE",
    slug: "ksan-50ve",
    name: "5\" Orbital Sander",
    freeSpeed: "12000",
    airInlet: "1/4\"",
    hoseSize: "10 mm",
    weight: "0.81",
    image: "/assets/img/products/abrasive-tools/KSAN-50VE.png",
    imageAlt: "KSAN-50VE 5 inch Orbital Sander - Kailom",
  }),
  makeAbrasiveToolProduct({
    model: "KBS-4518",
    slug: "kbs-4518",
    name: "10 mm Heavy Duty Belt Sander",
    freeSpeed: "16000",
    airInlet: "1/4\"",
    hoseSize: "10 mm",
    weight: "0.95",
    image: "/assets/img/products/abrasive-tools/KBS-4518.png",
    imageAlt: "KBS-4518 10 mm Heavy Duty Belt Sander - Kailom",
  }),
  makeAbrasiveToolProduct({
    model: "KBS-4517",
    slug: "kbs-4517",
    name: "20 mm Heavy Duty Belt Sander",
    freeSpeed: "16000",
    airInlet: "1/4\"",
    hoseSize: "10 mm",
    weight: "1.4",
    image: "/assets/img/products/abrasive-tools/KBS-4517.png",
    imageAlt: "KBS-4517 20 mm Heavy Duty Belt Sander - Kailom",
  }),
  makeAbrasiveToolProduct({
    model: "MG-120",
    slug: "mg-120",
    name: "3 mm Air Micro Die Grinder",
    freeSpeed: "65000",
    airInlet: "1/4\"",
    hoseSize: "6.4 mm",
    weight: "0.1",
    image: "/assets/img/products/abrasive-tools/MG-120.png",
    imageAlt: "MG-120 3 mm Air Micro Die Grinder - Kailom",
  }),
];

export function getAbrasiveToolProduct(slug: string) {
  return abrasiveToolProducts.find((product) => product.slug === slug) ?? null;
}
