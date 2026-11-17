import type { Metadata } from "next";
import MountzCategoryPage from "../../components/MountzCategoryPage";

export const metadata: Metadata = {
  title: "Break-Over Wrenches | Mountz Torque Wrenches | Kailom House",
  description: "Explore Mountz break-over wrench solutions for controlled torque applications.",
};

export default function BreakOverWrenchesPage() {
  return <MountzCategoryPage title="Break-Over Wrenches" group="Torque Wrenches" description="Mountz break-over wrench solutions designed to provide clear visual and tactile indication when the target torque is reached." />;
}
