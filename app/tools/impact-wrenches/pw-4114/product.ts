import type { ProductDetail } from "../../../components/ProductDetailPage";

const product: ProductDetail = {
  slug: "pw-4114",
  model: "PW-4114",
  name: "1/2\" Mini Impact Wrench",
  brand: "PAT",
  category: "Impact Wrenches",
  categoryHref: "/tools/impact-wrenches",
  description:
    "The PW-4114 is a compact pneumatic mini impact wrench featuring a composite motor housing, twin hammer mechanism, convenient one-hand forward and reverse operation, and a variable speed trigger.",
  images: [
    {
      src: "/assets/img/products/impact-wrenches/KW-4114.png",
      alt: "PW-4114 1/2 inch Mini Impact Wrench",
    },
  ],
  features: [
    "Composite Motor Housing",
    "Twin Hammer",
    "Thumb Operated Forward and Reverse Switches Provide One Hand Operation",
    "Variable Speed Trigger",
  ],
  specifications: [
    { label: "Model No.", value: "PW-4114" },
    { label: "Free Speed (RPM)", value: "12,000" },
    { label: "Anvil Size — Inch (mm)", value: "1/2 (13)" },
    { label: "Loosening Torque (Max.) — Ft-lbs (Nm)", value: "460 (624)" },
    { label: "Maximum Torque — Ft-lbs (Nm)", value: "960 (1,302)" },
    { label: "Working Torque Range — Ft-lbs (Nm)", value: "25-250 (34-338)" },
    { label: "Air Inlet (NPT)", value: "1/4\"" },
    { label: "Hose Size ID — Inch (mm)", value: "3/8 (10)" },
    { label: "Average Air Consumption — CFM (L/Min)", value: "4 (113)" },
    { label: "Length — Inch (mm)", value: "6.2 (157)" },
    { label: "Weight — Lbs (Kg)", value: "2.73 (1.24)" },
  ],
  technicalNotes: [
    "Recommended Air Pressure at 90PSI (6.2 Bar)",
    "Max. Torque and Reverse Torque to be Tested by Removing Damping Material",
  ],
};

export default product;
