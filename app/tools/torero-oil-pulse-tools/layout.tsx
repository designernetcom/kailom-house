import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Torero Oil Pulse Tools | Kailom House",
  description:
    "Explore Torero shut-off, non-shut-off and special oil pulse tools with catalogue specifications for torque, speed, air inlet and weight.",
};

export default function ToreroOilPulseToolsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
