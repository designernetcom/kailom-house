import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Firebird Impact Wrenches | Kailom House",
  description:
    "Compare Firebird pneumatic impact wrench models by free speed, maximum torque, air inlet, hose size and weight.",
};

export default function FirebirdLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
