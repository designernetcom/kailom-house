import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KUKEN Japan Air Tools | PTS Series | Kailom House",
  description:
    "Explore the supplied KUKEN Japan PTS air tool product range, including PTS-450EX, PTS-600EX and PTS-800EX models with L variants.",
};

export default function KukenAirToolsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
