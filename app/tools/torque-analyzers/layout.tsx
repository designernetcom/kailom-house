import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Torque Analyzers | Mountz Precision Torque Testing Solutions",
  description:
    "Explore Mountz torque analyzers including EZ-TORQ III, TorqueLab LTT-Series, TorqueMate PTT-Series, Validator and MTS-Series for precision torque measurement and quality control.",
};

export default function TorqueAnalyzersLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
