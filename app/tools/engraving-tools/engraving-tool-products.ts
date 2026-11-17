import type { ProductDetail } from "../../components/ProductDetailPage";

type EngravingToolProductInput = {
  model: string;
  slug: string;
  name: string;
  blowOrStrokes: string;
  strokeLength: string;
  airInlet: string;
  hoseSize: string;
  weight: string;
  image?: string;
  imageAlt?: string;
};

function makeEngravingToolProduct(input: EngravingToolProductInput): ProductDetail {
  const description = `${input.model} ${input.name}. Review the supplied catalogue specifications and send Kailom House your engraving, sawing or filing requirements for selection support.`;

  return {
    slug: input.slug,
    sharePath: `/tools/engraving-tools/${input.slug}`,
    model: input.model,
    name: input.name,
    tagline: "Engraving, air saw & filer tool",
    brand: "Kailom",
    category: "Engraving Tool / Air Saw / Filer",
    categoryHref: "/tools/engraving-tools",
    description,
    images: input.image
      ? [{ src: input.image, alt: input.imageAlt ?? `${input.model} product image` }]
      : [],
    features: [
      input.name,
      `Blow / strokes per minute: ${input.blowOrStrokes}`,
      `Stroke length: ${input.strokeLength} mm`,
      `Air inlet: ${input.airInlet} NPT`,
    ],
    specifications: [
      { label: "Model", value: input.model },
      { label: "Description", value: input.name },
      { label: "Blow / Strokes Per Minute", value: input.blowOrStrokes },
      { label: "Stroke Length (mm)", value: input.strokeLength },
      { label: "Air Inlet (NPT)", value: input.airInlet },
      { label: "Hose Size ID (mm)", value: input.hoseSize },
      { label: "Weight (kg)", value: input.weight },
    ],
    technicalNotes: ["Product information is presented exactly as supplied for catalogue reference."],
  };
}

export const engravingToolProducts: ProductDetail[] = [
  makeEngravingToolProduct({
    model: "KET-0573",
    slug: "ket-0573",
    name: "Engraver Tool",
    blowOrStrokes: "—",
    strokeLength: "3800",
    airInlet: "1/4\"",
    hoseSize: "10 mm",
    weight: "0.2 kg",
    image: "/assets/img/products/engraving-tools/KET-0573.png",
    imageAlt: "KET-0573 Engraver Tool - Kailom",
  }),
  makeEngravingToolProduct({
    model: "KS-CSS311",
    slug: "ks-css311",
    name: "Air Saw",
    blowOrStrokes: "9500 Spm",
    strokeLength: "10",
    airInlet: "1/4\"",
    hoseSize: "10 mm",
    weight: "0.5",
    image: "/assets/img/products/engraving-tools/KS-CSS311.png",
    imageAlt: "KS-CSS311 Air Saw - Kailom",
  }),
  makeEngravingToolProduct({
    model: "KAF-0825",
    slug: "kaf-0825",
    name: "Air Filer",
    blowOrStrokes: "3700 Spm",
    strokeLength: "9",
    airInlet: "-",
    hoseSize: "10 mm",
    weight: "1",
    image: "/assets/img/products/engraving-tools/KAF-0825.png",
    imageAlt: "KAF-0825 Air Filer - Kailom",
  }),
];

export function getEngravingToolProduct(slug: string) {
  return engravingToolProducts.find((product) => product.slug === slug) ?? null;
}
