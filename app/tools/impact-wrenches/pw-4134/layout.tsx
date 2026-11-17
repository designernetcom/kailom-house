import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'PW-4134 1/2" Impact Wrench | PAT Pneumatic Tools',
  description:
    "Explore the PW-4134 1/2\" Impact Wrench by PAT, featuring a twin hammer mechanism, composite motor housing, variable speed trigger, and detailed technical specifications.",
  alternates: {
    canonical: "/tools/impact-wrenches/pw-4134",
  },
  openGraph: {
    title: 'PW-4134 1/2" Impact Wrench | PAT Pneumatic Tools',
    description:
      "Explore the PW-4134 1/2\" Impact Wrench by PAT, featuring a twin hammer mechanism, composite motor housing, variable speed trigger, and detailed technical specifications.",
    type: "website",
    url: "/tools/impact-wrenches/pw-4134",
    images: [
      {
        url: "/assets/img/products/impact-wrenches/KW-4134.png",
        alt: "PW-4134 1/2 inch Impact Wrench - PAT",
      },
    ],
  },
};

export default function Pw4134Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
