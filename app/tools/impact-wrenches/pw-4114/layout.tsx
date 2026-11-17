import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'PW-4114 1/2" Mini Impact Wrench | Industrial Pneumatic Tools',
  description:
    "Explore the PW-4114 1/2\" Mini Impact Wrench with twin hammer mechanism, composite motor housing, variable speed trigger, and detailed technical specifications.",
  alternates: {
    canonical: "/tools/impact-wrenches/pw-4114",
  },
  openGraph: {
    title: 'PW-4114 1/2" Mini Impact Wrench | Industrial Pneumatic Tools',
    description:
      "Explore the PW-4114 1/2\" Mini Impact Wrench with twin hammer mechanism, composite motor housing, variable speed trigger, and detailed technical specifications.",
    type: "website",
    url: "/tools/impact-wrenches/pw-4114",
    images: [
      {
        url: "/assets/img/products/impact-wrenches/KW-4114.png",
        alt: "PW-4114 1/2 inch Mini Impact Wrench",
      },
    ],
  },
};

export default function Pw4114Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
