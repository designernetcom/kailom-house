import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetailPage from "../../../components/ProductDetailPage";
import { engravingToolProducts, getEngravingToolProduct } from "../engraving-tool-products";

export const dynamic = "force-static";

export function generateStaticParams() {
  return engravingToolProducts.map((product) => ({ productSlug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ productSlug: string }>;
}): Promise<Metadata> {
  const { productSlug } = await params;
  const product = getEngravingToolProduct(productSlug);
  if (!product) return {};

  return {
    title: `${product.model} ${product.name} | Kailom House`,
    description: `${product.description} Review strokes per minute, stroke length, air inlet, hose size ID and weight specifications.`,
    alternates: { canonical: `/tools/engraving-tools/${product.slug}` },
  };
}

export default async function EngravingToolProductPage({
  params,
}: {
  params: Promise<{ productSlug: string }>;
}) {
  const { productSlug } = await params;
  const product = getEngravingToolProduct(productSlug);
  if (!product) notFound();

  return <ProductDetailPage product={product} />;
}
