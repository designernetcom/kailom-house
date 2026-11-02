import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About Kailom House | Industrial Tools & Assembly Solutions",
  description:
    "Learn how Kailom House supports industrial assembly with quality tools, application-based sourcing, responsive service and dependable after-sales support.",
};

export default function AboutPage() {
  return <AboutContent />;
}
