import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kailom House | Industrial Tools for Confident Assembly",
  description:
    "Kailom House supplies industrial tools, machinery, equipment, hardware, electrical accessories and consumables for industries and organisations across India, with sourcing and after-sales support.",
  icons: { icon: "/assets/img/logo/kailom/kailom-logo-orange.png" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
