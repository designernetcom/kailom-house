import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetailPage from "../../../components/ProductDetailPage";
import { abrasiveToolProducts, getAbrasiveToolProduct } from "../abrasive-tool-products";

export const dynamic = "force-static";

export function generateStaticParams() {
  return abrasiveToolProducts.map((product) => ({ productSlug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ productSlug: string }>;
}): Promise<Metadata> {
  const { productSlug } = await params;
  const product = getAbrasiveToolProduct(productSlug);
  if (!product) return {};

  return {
    title: `${product.model} ${product.name} | Kailom House`,
    description: `${product.description} Review free speed, air inlet, hose size ID and weight specifications.`,
    alternates: { canonical: `/tools/abrasive-tools/${product.slug}` },
  };
}

export default async function AbrasiveToolProductPage({
  params,
}: {
  params: Promise<{ productSlug: string }>;
}) {
  const { productSlug } = await params;
  const product = getAbrasiveToolProduct(productSlug);
  if (!product) notFound();

  return <ProductDetailPage product={product} />;
}
