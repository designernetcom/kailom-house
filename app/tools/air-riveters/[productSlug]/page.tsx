import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetailPage from "../../../components/ProductDetailPage";
import { airRiveterProducts, getAirRiveterProduct } from "../air-riveter-products";

export const dynamic = "force-static";

export function generateStaticParams() {
  return airRiveterProducts.map((product) => ({ productSlug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ productSlug: string }>;
}): Promise<Metadata> {
  const { productSlug } = await params;
  const product = getAirRiveterProduct(productSlug);
  if (!product) return {};

  return {
    title: `${product.model} ${product.name} | Kailom House`,
    description: `${product.description} Review RPM, capacity, air inlet, hose size ID and weight specifications.`,
    alternates: { canonical: `/tools/air-riveters/${product.slug}` },
  };
}

export default async function AirRiveterProductPage({
  params,
}: {
  params: Promise<{ productSlug: string }>;
}) {
  const { productSlug } = await params;
  const product = getAirRiveterProduct(productSlug);
  if (!product) notFound();

  return <ProductDetailPage product={product} />;
}
