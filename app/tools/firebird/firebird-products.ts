import type { ProductDetail } from "../../components/ProductDetailPage";

export type FirebirdProduct = ProductDetail & {
  speed: string;
  maximumTorque: string;
  airInlet: string;
  hoseSize: string;
  weight: string;
};

type FirebirdSeed = {
  model: string;
  slug: string;
  description: string;
  speed: string;
  maximumTorque: string;
  airInlet: string;
  hoseSize: string;
  weight: string;
};

function makeProduct(seed: FirebirdSeed): FirebirdProduct {
  return {
    ...seed,
    name: seed.description,
    tagline: "Firebird / pneumatic impact tools",
    brand: "Firebird",
    category: "Firebird Impact Wrenches",
    categoryHref: "/tools/firebird",
    sharePath: `/tools/firebird/${seed.slug}`,
    description: `The Firebird ${seed.model} is a ${seed.description.toLowerCase()} for dependable pneumatic fastening work. Review its speed, torque, air connection and weight before selecting the right model for the application.`,
    images: [],
    features: [
      seed.description,
      `Free speed: ${seed.speed} RPM`,
      `Maximum torque: ${seed.maximumTorque} Nm`,
      `Air inlet: ${seed.airInlet} with ${seed.hoseSize} hose size`,
    ],
    specifications: [
      { label: "Model No.", value: seed.model },
      { label: "Description", value: seed.description },
      { label: "Free Speed (RPM)", value: seed.speed },
      { label: "Maximum Torque (Nm)", value: seed.maximumTorque },
      { label: "Air Inlet (NPT)", value: seed.airInlet },
      { label: "Hose Size ID (mm)", value: seed.hoseSize },
      { label: "Weight (kg)", value: seed.weight },
    ],
    technicalNotes: [
      "Specifications transcribed from the supplied Firebird catalogue image.",
      "Confirm application fit, air requirements and availability with Kailom House before ordering.",
    ],
  };
}

export const firebirdProducts: FirebirdProduct[] = [
  makeProduct({ model: "FB-6H", slug: "fb-6h", description: '1/4" Hex Straight Impact Wrench', speed: "10000", maximumTorque: "149", airInlet: '1/4"', hoseSize: '3/8"', weight: "0.93" }),
  makeProduct({ model: "FB-8DA", slug: "fb-8da", description: '3/8" Straight Impact Wrench', speed: "9500", maximumTorque: "183", airInlet: '1/4"', hoseSize: '3/8"', weight: "1.28" }),
  makeProduct({ model: "FB-68D", slug: "fb-68d", description: '3/8" Impact Wrench', speed: "9000", maximumTorque: "149", airInlet: '1/4"', hoseSize: '3/8"', weight: "1.21" }),
  makeProduct({ model: "FB-68H", slug: "fb-68h", description: '1/4" Hex Straight Impact Driver', speed: "9000", maximumTorque: "149", airInlet: '1/4"', hoseSize: '3/8"', weight: "1.21" }),
  makeProduct({ model: "FB-1310T", slug: "fb-1310t", description: '3/8" Pistol Impact Wrench', speed: "9300", maximumTorque: "298", airInlet: '1/4"', hoseSize: '3/8"', weight: "3.52" }),
  makeProduct({ model: "FB-1310T4", slug: "fb-1310t4", description: '1/2" Mini Pistol Impact Wrench', speed: "13000", maximumTorque: "298", airInlet: '1/4"', hoseSize: '3/8"', weight: "1.6" }),
  makeProduct({ model: "FB-1312T", slug: "fb-1312t", description: '3/8" Pistol Impact Wrench', speed: "12500", maximumTorque: "339", airInlet: '1/4"', hoseSize: '3/8"', weight: "1.68" }),
  makeProduct({ model: "FB-1384", slug: "fb-1384", description: '3/8" Twin Hammer Air Impact Wrench', speed: "9300", maximumTorque: "339", airInlet: '1/4"', hoseSize: '3/8"', weight: "1.25" }),
  makeProduct({ model: "FB-1434", slug: "fb-1434", description: '1/2" Mini Pistol Impact Wrench', speed: "10000", maximumTorque: "570", airInlet: '1/4"', hoseSize: '3/8"', weight: "1.62" }),
  makeProduct({ model: "FB-1451", slug: "fb-1451", description: '1/2" Pistol Impact Wrench', speed: "8000", maximumTorque: "949", airInlet: '1/4"', hoseSize: '3/8"', weight: "2" }),
  makeProduct({ model: "FB-1484", slug: "fb-1484", description: '1/2" Twin Hammer Air Impact Wrench', speed: "7500", maximumTorque: "814", airInlet: '1/4"', hoseSize: '3/8"', weight: "2.25" }),
  makeProduct({ model: "FB-2655", slug: "fb-2655", description: '3/4" Pistol Impact Wrench', speed: "5400", maximumTorque: "1449", airInlet: '3/8"', hoseSize: '3/8"', weight: "3.47" }),
  makeProduct({ model: "FB-3330G", slug: "fb-3330g", description: '3/4" Pistol Impact Wrench', speed: "4500", maximumTorque: "1763", airInlet: '3/8"', hoseSize: '1/2"', weight: "7.35" }),
  makeProduct({ model: "FB-3812", slug: "fb-3812", description: '1" Impact Wrench', speed: "4500", maximumTorque: "4068", airInlet: '1/2"', hoseSize: '1/2"', weight: "12" }),
];

export function getFirebirdProduct(slug: string) {
  return firebirdProducts.find((product) => product.slug === slug);
}
