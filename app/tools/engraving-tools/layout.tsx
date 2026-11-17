import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engraving Tool, Air Saw & Filer | Kailom House",
  description:
    "Explore Kailom House engraving tools, air saws and air filers with exact product specifications.",
};

export default function EngravingToolsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
