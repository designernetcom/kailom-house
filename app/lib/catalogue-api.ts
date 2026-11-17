// Static catalogue data for the frontend-first product-page phase.
// The public catalogue can be switched back to the Java API later by
// restoring the three accessor functions to fetch from the backend.

export type CatalogueCategory = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  sortOrder: number;
  published: boolean;
};

export type CatalogueProduct = {
  id: string;
  categoryId: string;
  categoryName: string;
  categorySlug: string;
  subcategoryId?: string;
  subcategoryName?: string;
  name: string;
  model: string;
  slug: string;
  brand: string;
  description: string;
  published: boolean;
  featured: boolean;
  sortOrder: number;
  seoTitle?: string;
  seoDescription?: string;
  images: { id: string; url: string; altText?: string; sortOrder: number }[];
  features: string[];
  specifications: { id: string; label: string; value: string; sortOrder: number }[];
};

const categories: CatalogueCategory[] = [
  { id: "static-impact-wrenches", name: "Impact Wrenches", slug: "impact-wrenches", description: "Pneumatic impact and ratchet wrench models for dependable fastening applications.", sortOrder: 1, published: true },
  { id: "static-air-drills", name: "Air Drills", slug: "air-drills", description: "Pneumatic air drill models for industrial drilling applications.", sortOrder: 2, published: true },
  { id: "static-air-riveters", name: "Air Riveters", slug: "air-riveters", description: "Air riveters, riveting hammers and chipping hammers for production assembly work.", sortOrder: 3, published: true },
  { id: "static-abrasive-tools", name: "Abrasive Tools", slug: "abrasive-tools", description: "Grinding, finishing and abrasive tools for workshop applications.", sortOrder: 4, published: true },
];

const impactCategory = categories[0];
const airDrillCategory = categories[1];
const airRiveterCategory = categories[2];
const abrasiveCategory = categories[3];

type ProductSeed = Omit<CatalogueProduct, "id" | "images" | "features" | "specifications" | "categoryId" | "categoryName" | "categorySlug"> & {
  category: CatalogueCategory;
  image?: string;
  imageAlt?: string;
  features?: string[];
  specifications?: { label: string; value: string }[];
};

function makeProduct(seed: ProductSeed): CatalogueProduct {
  const { category, image, imageAlt, features = [], specifications = [], ...product } = seed;
  const imageRecord = image ? [{ id: `${product.slug}-image-1`, url: image, altText: imageAlt ?? `${product.name} product image`, sortOrder: 1 }] : [];
  return {
    ...product,
    id: `static-product-${product.slug}`,
    categoryId: category.id,
    categoryName: category.name,
    categorySlug: category.slug,
    images: imageRecord,
    features,
    specifications: specifications.map((specification, index) => ({ ...specification, id: `${product.slug}-spec-${index + 1}`, sortOrder: index + 1 })),
  };
}

const products: CatalogueProduct[] = [
  makeProduct({
    category: impactCategory,
    slug: "pw-4114",
    model: "PW-4114",
    name: "1/2\" Mini Impact Wrench",
    brand: "PAT",
    description: "The PW-4114 is a compact pneumatic mini impact wrench featuring a composite motor housing, twin hammer mechanism, convenient one-hand forward and reverse operation, and a variable speed trigger.",
    published: true,
    featured: true,
    sortOrder: 1,
    image: "/assets/img/products/pneumatic-impact-tool.jpeg",
    imageAlt: "PW-4114 1/2 inch Mini Impact Wrench",
    features: ["Composite Motor Housing", "Twin Hammer", "Thumb Operated Forward and Reverse Switches Provide One Hand Operation", "Variable Speed Trigger"],
    specifications: [
      { label: "Model No.", value: "PW-4114" }, { label: "Free Speed (RPM)", value: "12,000" }, { label: "Anvil Size — Inch (mm)", value: "1/2 (13)" },
      { label: "Loosening Torque (Max.) — Ft-lbs (Nm)", value: "460 (624)" }, { label: "Maximum Torque — Ft-lbs (Nm)", value: "960 (1,302)" }, { label: "Working Torque Range — Ft-lbs (Nm)", value: "25-250 (34-338)" },
      { label: "Air Inlet (NPT)", value: "1/4\"" }, { label: "Hose Size ID — Inch (mm)", value: "3/8 (10)" }, { label: "Average Air Consumption — CFM (L/Min)", value: "4 (113)" },
      { label: "Length — Inch (mm)", value: "6.2 (157)" }, { label: "Weight — Lbs (Kg)", value: "2.73 (1.24)" },
    ],
  }),
  makeProduct({
    category: impactCategory,
    slug: "pw-4134",
    model: "PW-4134",
    name: "1/2\" Impact Wrench",
    brand: "PAT",
    description: "The PW-4134 1/2\" Impact Wrench features a composite motor housing, twin hammer, thumb operated forward and reverse switches for one hand operation, and a variable speed trigger.",
    published: true,
    featured: true,
    sortOrder: 2,
    image: "/assets/img/products/pneumatic-impact-wrench.jpeg",
    imageAlt: "PW-4134 1/2 inch Impact Wrench - PAT",
    features: ["Composite Motor Housing", "Twin Hammer", "Thumb Operated Forward and Reverse Switches Provide One Hand Operation", "Variable Speed Trigger"],
    specifications: [
      { label: "Model No.", value: "PW-4134" }, { label: "Free Speed (RPM)", value: "8,000" }, { label: "Anvil Size — Inch (mm)", value: "1/2 (13)" },
      { label: "Loosening Torque (Max.) — Ft-lbs (Nm)", value: "1,300 (1,756)" }, { label: "Maximum Torque — Ft-lbs (Nm)", value: "820 (1,112)" }, { label: "Working Torque Range — Ft-lbs (Nm)", value: "50-580 (68-786)" },
      { label: "Air Inlet (NPT)", value: "1/4\"" }, { label: "Hose Size ID — Inch (mm)", value: "3/8 (10)" }, { label: "Average Air Consumption — CFM (L/Min)", value: "4 (113)" },
      { label: "Length — Inch (mm)", value: "7.4 (187)" }, { label: "Weight — Lbs (Kg)", value: "4.21 (1.91)" },
    ],
  }),
  makeProduct({ category: airDrillCategory, slug: "kd-6c", model: "KD-6C", name: "3/8\" Straight Drill", brand: "Kailom", description: "A straight pneumatic drill for controlled drilling applications where speed, fit and handling need to be clear before selection.", published: true, featured: false, sortOrder: 1, image: "/assets/img/products/pneumatic-drill.jpeg", specifications: [{ label: "Free Speed (RPM)", value: "2,500" }, { label: "Chuck Size", value: "10 mm" }, { label: "Air Inlet", value: "1/4\"" }, { label: "Hose Size", value: "10 mm" }, { label: "Weight (kg)", value: "0.91" }] }),
  makeProduct({ category: airDrillCategory, slug: "kd-6102", model: "KD-6102", name: "3/8\" Reversible Pistol Drill", brand: "Kailom", description: "A reversible pneumatic pistol drill for workshop and assembly applications.", published: true, featured: false, sortOrder: 2, specifications: [{ label: "Free Speed (RPM)", value: "1,800" }, { label: "Chuck Size", value: "10 mm" }, { label: "Air Inlet", value: "1/4\"" }, { label: "Hose Size", value: "10 mm" }, { label: "Weight (kg)", value: "1.1" }] }),
  makeProduct({ category: airDrillCategory, slug: "kd-6117", model: "KD-6117", name: "1/2\" Reversible Pistol Drill", brand: "Kailom", description: "A reversible 1/2 inch pneumatic pistol drill for heavier drilling applications.", published: true, featured: false, sortOrder: 3, specifications: [{ label: "Free Speed (RPM)", value: "800" }, { label: "Chuck Size", value: "13 mm" }, { label: "Air Inlet", value: "1/4\"" }, { label: "Hose Size", value: "10 mm" }, { label: "Weight (kg)", value: "1.4" }] }),
  makeProduct({ category: airDrillCategory, slug: "kd-6130", model: "KD-6130", name: "1/2\" Reversible Pistol Drill", brand: "Kailom", description: "A controlled reversible pneumatic drill with a 1/2 inch chuck for production work.", published: true, featured: false, sortOrder: 4, specifications: [{ label: "Free Speed (RPM)", value: "800" }, { label: "Chuck Size", value: "13 mm" }, { label: "Air Inlet", value: "1/4\"" }, { label: "Hose Size", value: "10 mm" }, { label: "Weight (kg)", value: "1.4" }] }),
  makeProduct({ category: airRiveterCategory, slug: "kr-8805", model: "KR-8805", name: "Pop Riveter Kit", brand: "Kailom", description: "A pneumatic pop riveter kit for repeatable assembly work.", published: true, featured: false, sortOrder: 1, specifications: [{ label: "Capacity", value: "3/32 to 3/16\"" }, { label: "Air Inlet", value: "1/4\"" }, { label: "Hose Size", value: "10 mm" }, { label: "Weight (kg)", value: "1.5" }] }),
  makeProduct({ category: airRiveterCategory, slug: "kr-8815", model: "KR-8815", name: "Pop Riveter", brand: "Kailom", description: "A pneumatic pop riveter for dependable production assembly.", published: true, featured: false, sortOrder: 2, specifications: [{ label: "Capacity", value: "3/32 to 3/16\"" }, { label: "Air Inlet", value: "1/4\"" }, { label: "Hose Size", value: "10 mm" }, { label: "Weight (kg)", value: "1.8" }] }),
  makeProduct({ category: airRiveterCategory, slug: "kh-7126", model: "KH-7126", name: "Riveting Hammer", brand: "Kailom", description: "A pneumatic riveting hammer for controlled assembly applications.", published: true, featured: false, sortOrder: 3, specifications: [{ label: "Speed", value: "3,200 Bpm" }, { label: "Air Inlet", value: "1/4\"" }, { label: "Hose Size", value: "10 mm" }, { label: "Weight (kg)", value: "1.6" }] }),
  makeProduct({ category: airRiveterCategory, slug: "krh-9505x", model: "KRH-9505X", name: "Riveting Hammer", brand: "Kailom", description: "A compact riveting hammer for repeatable production work.", published: true, featured: false, sortOrder: 4, specifications: [{ label: "Speed", value: "1,560 Bpm" }, { label: "Capacity", value: "67" }, { label: "Air Inlet", value: "1/4\"" }, { label: "Weight (kg)", value: "1.7" }] }),
  makeProduct({ category: airRiveterCategory, slug: "ch-892", model: "CH-892", name: "Air Chipping Hammer", brand: "Kailom", description: "A round air chipping hammer for heavy-duty workshop applications.", published: true, featured: false, sortOrder: 5, specifications: [{ label: "Speed", value: "2,500 Bpm" }, { label: "Capacity", value: "125" }, { label: "Air Inlet", value: "3/8\"" }, { label: "Weight", value: "6.5 kg" }] }),
  makeProduct({ category: abrasiveCategory, slug: "kg-5206m", model: "KG-5206M", name: "6 mm Heavy Duty Die Grinder", brand: "Kailom", description: "A heavy-duty die grinder for controlled grinding and finishing work.", published: true, featured: false, sortOrder: 1, specifications: [{ label: "Free Speed (RPM)", value: "32,000" }, { label: "Air Inlet", value: "1/4\"" }, { label: "Hose Size", value: "10 mm" }, { label: "Weight (kg)", value: "0.73" }] }),
  makeProduct({ category: abrasiveCategory, slug: "kg-512", model: "KG-512", name: "6 mm Die Grinder", brand: "Kailom", description: "A compact 6 mm die grinder for everyday workshop finishing.", published: true, featured: false, sortOrder: 2, specifications: [{ label: "Free Speed (RPM)", value: "23,000" }, { label: "Air Inlet", value: "1/4\"" }, { label: "Hose Size", value: "10 mm" }, { label: "Weight (kg)", value: "0.6" }] }),
  makeProduct({ category: abrasiveCategory, slug: "kg-5001", model: "KG-5001", name: "3 mm Micro Die Grinder", brand: "Kailom", description: "A high-speed micro die grinder for precise finishing applications.", published: true, featured: false, sortOrder: 3, specifications: [{ label: "Free Speed (RPM)", value: "56,000" }, { label: "Air Inlet", value: "1/4\"" }, { label: "Hose Size", value: "10 mm" }, { label: "Weight (kg)", value: "0.25" }] }),
  makeProduct({ category: abrasiveCategory, slug: "kg-522", model: "KG-522", name: "6 mm Angle Die Grinder", brand: "Kailom", description: "An angle die grinder for accessible grinding and deburring work.", published: true, featured: false, sortOrder: 4, specifications: [{ label: "Free Speed (RPM)", value: "22,000" }, { label: "Air Inlet", value: "1/4\"" }, { label: "Hose Size", value: "10 mm" }, { label: "Weight (kg)", value: "0.5" }] }),
  makeProduct({ category: abrasiveCategory, slug: "kag-619", model: "KAG-619", name: "4\" Angle Grinder", brand: "Kailom", description: "A 4 inch angle grinder for workshop cutting and finishing applications.", published: true, featured: false, sortOrder: 5, specifications: [{ label: "Free Speed (RPM)", value: "12,000" }, { label: "Air Inlet", value: "1/4\"" }, { label: "Hose Size", value: "10 mm" }, { label: "Weight (kg)", value: "1.8" }] }),
  makeProduct({ category: abrasiveCategory, slug: "kas-6661-sm", model: "KAS-6661-SM", name: "7\" Angle Sander", brand: "Kailom", description: "A 7 inch angle sander for broad surface preparation and finishing.", published: true, featured: false, sortOrder: 6, specifications: [{ label: "Free Speed (RPM)", value: "4,500" }, { label: "Air Inlet", value: "1/4\"" }, { label: "Hose Size", value: "10 mm" }, { label: "Weight (kg)", value: "1.9" }] }),
  makeProduct({ category: abrasiveCategory, slug: "ksan-50ve", model: "KSAN-50VE", name: "5\" Orbital Sander", brand: "Kailom", description: "A 5 inch orbital sander for smooth, controlled surface finishing.", published: true, featured: false, sortOrder: 7, specifications: [{ label: "Free Speed (RPM)", value: "12,000" }, { label: "Air Inlet", value: "1/4\"" }, { label: "Hose Size", value: "10 mm" }, { label: "Weight (kg)", value: "0.81" }] }),
  makeProduct({ category: abrasiveCategory, slug: "kbs-4518", model: "KBS-4518", name: "10 mm Heavy Duty Belt Sander", brand: "Kailom", description: "A heavy-duty belt sander for controlled material removal and finishing.", published: true, featured: false, sortOrder: 8, specifications: [{ label: "Free Speed (RPM)", value: "16,000" }, { label: "Air Inlet", value: "1/4\"" }, { label: "Hose Size", value: "10 mm" }, { label: "Weight (kg)", value: "0.95" }] }),
  makeProduct({ category: abrasiveCategory, slug: "kbs-4517", model: "KBS-4517", name: "20 mm Heavy Duty Belt Sander", brand: "Kailom", description: "A wider belt sander for heavier workshop surface preparation.", published: true, featured: false, sortOrder: 9, specifications: [{ label: "Free Speed (RPM)", value: "16,000" }, { label: "Air Inlet", value: "1/4\"" }, { label: "Hose Size", value: "10 mm" }, { label: "Weight (kg)", value: "1.4" }] }),
  makeProduct({ category: abrasiveCategory, slug: "mg-120", model: "MG-120", name: "3 mm Air Micro Die Grinder", brand: "Kailom", description: "A lightweight micro die grinder for detailed finishing work.", published: true, featured: false, sortOrder: 10, specifications: [{ label: "Free Speed (RPM)", value: "65,000" }, { label: "Air Inlet", value: "1/4\"" }, { label: "Hose Size", value: "6.4 mm" }, { label: "Weight (kg)", value: "0.1" }] }),
];

export function getCategories() {
  return categories.filter((category) => category.published).sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getCategory(categorySlug: string) {
  return categories.find((category) => category.slug === categorySlug && category.published) ?? null;
}

export function getProductsForCategory(categorySlug: string) {
  return products.filter((product) => product.categorySlug === categorySlug && product.published).sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getAllProducts() {
  return products.filter((product) => product.published);
}

export function getProduct(productSlug: string) {
  return products.find((product) => product.slug === productSlug && product.published) ?? null;
}
