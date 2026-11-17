import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetailPage from "../../../components/ProductDetailPage";
import { airDrillProducts, getAirDrillProduct } from "../air-drill-products";

export const dynamic = "force-static";

export function generateStaticParams() {
  return airDrillProducts.map((product) => ({ productSlug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ productSlug: string }>;
}): Promise<Metadata> {
  const { productSlug } = await params;
  const product = getAirDrillProduct(productSlug);
  if (!product) return {};

  return {
    title: `${product.model} ${product.name} | Kailom House`,
    description: `${product.description} Review free speed, maximum torque, air inlet, hose size ID and weight specifications.`,
    alternates: { canonical: `/tools/air-drills/${product.slug}` },
  };
}

export default async function AirDrillProductPage({
  params,
}: {
  params: Promise<{ productSlug: string }>;
}) {
  const { productSlug } = await params;
  const product = getAirDrillProduct(productSlug);
  if (!product) notFound();

  return <ProductDetailPage product={product} />;
}
