import type { Metadata } from "next";
import MountzCategoryPage from "../../components/MountzCategoryPage";

export const metadata: Metadata = {
  title: "Click Wrenches | Mountz Torque Wrenches | Kailom House",
  description: "Explore Mountz click wrench solutions for repeatable manual torque applications.",
};

export default function ClickWrenchesPage() {
  return <MountzCategoryPage title="Click Wrenches" group="Torque Wrenches" description="Mountz click wrench solutions for repeatable manual torque application and dependable operator feedback." />;
}
