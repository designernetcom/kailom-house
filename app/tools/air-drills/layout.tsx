import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Air Drills | Industrial Pneumatic Tools",
  description:
    "Explore our range of industrial air drills, including straight drills and reversible pistol drills, designed for precision and reliable performance.",
};

export default function AirDrillsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
