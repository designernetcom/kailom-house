import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Torque Sensors | Mountz Precision Torque Testing | Kailom House",
  description:
    "Explore Mountz torque reaction, rotary torque, angle and sensing screwdriver solutions for calibration, power-tool testing and torque verification.",
};

export default function TorqueSensorsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
