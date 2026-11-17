import type { Metadata } from "next";
import MountzCategoryPage from "../../components/MountzCategoryPage";

export const metadata: Metadata = {
  title: "Electric Screwdrivers | Mountz Power Assembly Tools | Kailom House",
  description: "Explore Mountz electric screwdriver solutions for controlled power assembly applications.",
};

export default function ElectricScrewdriversPage() {
  return <MountzCategoryPage title="Electric Screwdrivers" group="Power Assembly Tools" description="Mountz electric screwdriver solutions for repeatable fastening, torque control and dependable power assembly." />;
}
