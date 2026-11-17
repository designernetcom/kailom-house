import type { ProductDetail } from "../../components/ProductDetailPage";

type AirDrillProductInput = {
  model: string;
  slug: string;
  name: string;
  freeSpeed: string;
  maximumTorque: string;
  airInlet: string;
  hoseSize: string;
  weight: string;
  image?: string;
  imageAlt?: string;
};

function makeAirDrillProduct(input: AirDrillProductInput): ProductDetail {
  const description = `${input.model} ${input.name}. Review the supplied catalogue specifications and send Kailom House your drilling requirements for selection support.`;

  return {
    slug: input.slug,
    sharePath: `/tools/air-drills/${input.slug}`,
    model: input.model,
    name: input.name,
    tagline: "Pneumatic air drill",
    brand: "Kailom",
    category: "Air Drills",
    categoryHref: "/tools/air-drills",
    description,
    images: input.image
      ? [{
          src: input.image,
          alt: input.imageAlt ?? `Representative Kailom air drill image for ${input.model}`,
        }]
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
      { label: "Maximum Torque (Nm)", value: input.maximumTorque },
      { label: "Air Inlet (NPT)", value: input.airInlet },
      { label: "Hose Size ID (mm)", value: input.hoseSize },
      { label: "Weight (kg)", value: input.weight },
    ],
    technicalNotes: ["Product information is presented exactly as supplied for catalogue reference."],
  };
}

export const airDrillProducts: ProductDetail[] = [
  makeAirDrillProduct({
    model: "KD-6C",
    slug: "kd-6c",
    name: "3/8\" Straight Drill",
    freeSpeed: "2500",
    maximumTorque: "10 mm",
    airInlet: "1/4\"",
    hoseSize: "10 mm",
    weight: "0.91",
    image: "/assets/img/products/air-drills/KD-6C.png",
    imageAlt: "KD-6C 3/8 inch Straight Drill - Kailom",
  }),
  makeAirDrillProduct({
    model: "KD-6102",
    slug: "kd-6102",
    name: "3/8\" Reversible Pistol Drill",
    freeSpeed: "1800",
    maximumTorque: "10 mm",
    airInlet: "1/4\"",
    hoseSize: "10 mm",
    weight: "1.1",
    image: "/assets/img/products/air-drills/KD-6102.png",
    imageAlt: "KD-6102 3/8 inch Reversible Pistol Drill - Kailom",
  }),
  makeAirDrillProduct({
    model: "KD-6117",
    slug: "kd-6117",
    name: "1/2\" Reversible Pistol Drill",
    freeSpeed: "800",
    maximumTorque: "13 mm",
    airInlet: "1/4\"",
    hoseSize: "10 mm",
    weight: "1.4",
    image: "/assets/img/products/air-drills/KD-6117.png",
    imageAlt: "KD-6117 1/2 inch Reversible Pistol Drill - Kailom",
  }),
  makeAirDrillProduct({
    model: "KD-6130",
    slug: "kd-6130",
    name: "1/2\" Reversible Pistol Drill",
    freeSpeed: "800",
    maximumTorque: "13 mm",
    airInlet: "1/4\"",
    hoseSize: "10 mm",
    weight: "1.4",
    image: "/assets/img/products/air-drills/KD-6130.png",
    imageAlt: "KD-6130 1/2 inch Reversible Pistol Drill - Kailom",
  }),
];

export function getAirDrillProduct(slug: string) {
  return airDrillProducts.find((product) => product.slug === slug) ?? null;
}
