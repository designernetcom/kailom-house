import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAR Fastening Tools | Kailom House",
  description:
    "Explore FAR blind rivets, rivet nuts, riveting tools and control systems supplied by Kailom House.",
};

export default function FarToolsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
