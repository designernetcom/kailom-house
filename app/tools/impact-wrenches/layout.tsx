import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impact Wrenches & Ratchet Wrenches | Kailom House",
  description:
    "Compare Kailom impact wrench and ratchet wrench models by torque, speed, drive size, air inlet and weight.",
};

export default function PneumaticToolsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
