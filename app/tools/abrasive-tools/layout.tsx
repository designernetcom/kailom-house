import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Abrasive Tools | Industrial Pneumatic Tools",
  description:
    "Explore Kailom House abrasive tools including die grinders, angle grinders, sanders and air micro die grinders.",
};

export default function AbrasiveToolsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
