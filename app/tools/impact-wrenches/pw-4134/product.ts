import type { ProductDetail } from "../../../components/ProductDetailPage";

const product: ProductDetail = {
  slug: "pw-4134",
  model: "PW-4134",
  name: "1/2\" Impact Wrench",
  brand: "PAT",
  category: "Impact Wrenches",
  categoryHref: "/tools/impact-wrenches",
  description:
    "The PW-4134 1/2\" Impact Wrench features a composite motor housing, twin hammer, thumb operated forward and reverse switches for one hand operation, and a variable speed trigger.",
  images: [
    {
      src: "/assets/img/products/impact-wrenches/KW-4134.png",
      alt: "PW-4134 1/2 inch Impact Wrench - PAT",
    },
  ],
  features: [
    "Composite Motor Housing",
    "Twin Hammer",
    "Thumb Operated Forward and Reverse Switches Provide One Hand Operation",
    "Variable Speed Trigger",
  ],
  specifications: [
    { label: "Model No.", value: "PW-4134" },
    { label: "Free Speed (RPM)", value: "8,000" },
    { label: "Anvil Size — Inch (mm)", value: "1/2 (13)" },
    { label: "Loosening Torque (Max.) — Ft-lbs (Nm)", value: "1,300 (1,756)" },
    { label: "Maximum Torque — Ft-lbs (Nm)", value: "820 (1,112)" },
    { label: "Working Torque Range — Ft-lbs (Nm)", value: "50-580 (68-786)" },
    { label: "Air Inlet (NPT)", value: "1/4\"" },
    { label: "Hose Size ID — Inch (mm)", value: "3/8 (10)" },
    { label: "Average Air Consumption — CFM (L/Min)", value: "4 (113)" },
    { label: "Length — Inch (mm)", value: "7.4 (187)" },
    { label: "Weight — Lbs (Kg)", value: "4.21 (1.91)" },
  ],
  technicalNotes: [
    "Recommended Air Pressure at 90PSI (6.2 Bar)",
    "Max. Torque and Reverse Torque to be Tested by Removing Damping Material",
  ],
};

export default product;
