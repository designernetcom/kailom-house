import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetailPage from "../../../components/ProductDetailPage";
import { firebirdProducts, getFirebirdProduct } from "../firebird-products";

export const dynamic = "force-static";

export function generateStaticParams() {
  return firebirdProducts.map((product) => ({ productSlug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ productSlug: string }> }): Promise<Metadata> {
  const { productSlug } = await params;
  const product = getFirebirdProduct(productSlug);
  if (!product) return {};

  return {
    title: `${product.model} ${product.name} | Kailom House`,
    description: `${product.description} Review free speed, maximum torque, air inlet, hose size and weight specifications.`,
    alternates: { canonical: `/tools/firebird/${product.slug}` },
  };
}

export default async function FirebirdProductPage({ params }: { params: Promise<{ productSlug: string }> }) {
  const { productSlug } = await params;
  const product = getFirebirdProduct(productSlug);
  if (!product) notFound();

  return <ProductDetailPage product={product} />;
}
