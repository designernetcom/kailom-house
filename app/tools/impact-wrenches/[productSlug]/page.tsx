import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetailPage from "../../../components/ProductDetailPage";
import { getImpactWrenchProduct, impactWrenchProducts } from "../impact-wrench-products";

export const dynamic = "force-static";

export function generateStaticParams() {
  return impactWrenchProducts.map((product) => ({ productSlug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ productSlug: string }> }): Promise<Metadata> {
  const { productSlug } = await params;
  const product = getImpactWrenchProduct(productSlug);
  if (!product) return {};

  return {
    title: `${product.model} ${product.name} | Kailom House`,
    description: `${product.description} Review torque, speed, drive size, air inlet and weight specifications.`,
    alternates: { canonical: `/tools/impact-wrenches/${product.slug}` },
  };
}

export default async function ImpactWrenchProductPage({ params }: { params: Promise<{ productSlug: string }> }) {
  const { productSlug } = await params;
  const product = getImpactWrenchProduct(productSlug);
  if (!product) notFound();

  return <ProductDetailPage product={product} />;
}
