import type { Metadata } from "next";
import MountzCategoryPage from "../../components/MountzCategoryPage";

export const metadata: Metadata = {
  title: "Cam-Over Wrenches | Mountz Torque Wrenches | Kailom House",
  description: "Explore Mountz cam-over wrench solutions for controlled torque applications.",
};

export default function CamOverWrenchesPage() {
  return <MountzCategoryPage title="Cam-Over Wrenches" group="Torque Wrenches" description="Mountz cam-over wrench solutions for reliable torque control and repeatable manual fastening." />;
}
