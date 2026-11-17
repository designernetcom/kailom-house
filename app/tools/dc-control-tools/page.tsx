import type { Metadata } from "next";
import MountzCategoryPage from "../../components/MountzCategoryPage";

export const metadata: Metadata = {
  title: "DC Control Tools | Mountz Power Assembly Tools | Kailom House",
  description: "Explore Mountz DC control tools for controlled and traceable power assembly applications.",
};

export default function DcControlToolsPage() {
  return <MountzCategoryPage title="DC Control Tools" group="Power Assembly Tools" description="Mountz DC control tools for accurate, repeatable fastening and connected power assembly workflows." />;
}
