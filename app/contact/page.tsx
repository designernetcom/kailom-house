import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact Kailom House | Industrial Tools & Assembly Solutions",
  description:
    "Contact Kailom House for industrial tools, torque testing, pneumatic tools, sourcing requirements and after-sales support.",
};

export default function ContactPage() {
  return <ContactContent />;
}
