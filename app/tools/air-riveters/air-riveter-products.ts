import type { ProductDetail } from "../../components/ProductDetailPage";

type AirRiveterProductInput = {
  model: string;
  slug: string;
  name: string;
  rpm: string;
  capacity: string;
  airInlet: string;
  hoseSize: string;
  weight: string;
  image?: string;
  imageAlt?: string;
};

function makeAirRiveterProduct(input: AirRiveterProductInput): ProductDetail {
  const description = `${input.model} ${input.name}. Review the supplied catalogue specifications and send Kailom House your riveting or air hammer requirements for selection support.`;

  return {
    slug: input.slug,
    sharePath: `/tools/air-riveters/${input.slug}`,
    model: input.model,
    name: input.name,
    tagline: "Riveting & air hammer tool",
    brand: "Kailom",
    category: "Air Riveters, Nut Setters & Air Hammers",
    categoryHref: "/tools/air-riveters",
    description,
    images: input.image
      ? [{ src: input.image, alt: input.imageAlt ?? `${input.model} product image` }]
      : [],
    features: [
      input.name,
      `RPM: ${input.rpm}`,
      `Capacity: ${input.capacity}`,
      `Air inlet: ${input.airInlet} NPT`,
    ],
    specifications: [
      { label: "Model", value: input.model },
      { label: "Description", value: input.name },
      { label: "RPM", value: input.rpm },
      { label: "Capacity", value: input.capacity },
      { label: "Air Inlet (NPT)", value: input.airInlet },
      { label: "Hose Size ID (mm)", value: input.hoseSize },
      { label: "Weight (kgs)", value: input.weight },
    ],
    technicalNotes: ["Product information is presented exactly as supplied for catalogue reference."],
  };
}

export const airRiveterProducts: ProductDetail[] = [
  makeAirRiveterProduct({
    model: "KR-8805",
    slug: "kr-8805",
    name: "Pop Riveters",
    rpm: "—",
    capacity: "3/32 to 3/16\"",
    airInlet: "1/4\"",
    hoseSize: "10 mm",
    weight: "1.5",
    image: "/assets/img/products/air-riveters/KR-8805.png",
    imageAlt: "KR-8805 Pop Riveter - Kailom",
  }),
  makeAirRiveterProduct({
    model: "KR-8815",
    slug: "kr-8815",
    name: "Pop Riveters",
    rpm: "—",
    capacity: "3/32 to 3/16\"",
    airInlet: "1/4\"",
    hoseSize: "10 mm",
    weight: "1.8",
    image: "/assets/img/products/air-riveters/KR-8815.png",
    imageAlt: "KR-8815 Pop Riveter - Kailom",
  }),
  makeAirRiveterProduct({
    model: "KH-7126",
    slug: "kh-7126",
    name: "Riveting Hammers",
    rpm: "3200 Bpm",
    capacity: "—",
    airInlet: "1/4\"",
    hoseSize: "10 mm",
    weight: "1.6",
    image: "/assets/img/products/air-riveters/KH-7126.png",
    imageAlt: "KH-7126 Riveting Hammer - Kailom",
  }),
  makeAirRiveterProduct({
    model: "KRH-9505X",
    slug: "krh-9505x",
    name: "Riveting Hammers",
    rpm: "1560 Bpm",
    capacity: "67",
    airInlet: "1/4\"",
    hoseSize: "10 mm",
    weight: "1.7",
    image: "/assets/img/products/air-riveters/KRH-9505X.png",
    imageAlt: "KRH-9505X Riveting Hammer - Kailom",
  }),
  makeAirRiveterProduct({
    model: "CH-892",
    slug: "ch-892",
    name: "Air Chipping Hammer (Round)",
    rpm: "2500 Bpm",
    capacity: "125",
    airInlet: "3/8\"",
    hoseSize: "8 mm",
    weight: "6.5 Kg",
    image: "/assets/img/products/air-riveters/CH-892.png",
    imageAlt: "CH-892 Air Chipping Hammer - Kailom",
  }),
];

export function getAirRiveterProduct(slug: string) {
  return airRiveterProducts.find((product) => product.slug === slug) ?? null;
}
