import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Air Riveters, Nut Setters & Air Hammers | Kailom House",
  description:
    "Explore Kailom House air riveters, riveting hammers and air chipping hammers with exact product specifications.",
};

export default function AirRivetersLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
