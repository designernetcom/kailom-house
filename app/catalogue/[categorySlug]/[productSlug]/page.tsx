import { notFound } from "next/navigation";
import ProductDetailPage, { type ProductDetail } from "../../../components/ProductDetailPage";
import { getAllProducts, getProduct } from "../../../lib/catalogue-api";

export const dynamic = "force-static";

export function generateStaticParams() {
  return getAllProducts().map((product) => ({ categorySlug: product.categorySlug, productSlug: product.slug }));
}

export default async function CatalogueProductPage({ params }: { params: Promise<{ categorySlug: string; productSlug: string }> }) {
  const { categorySlug, productSlug } = await params;
  const product = await getProduct(productSlug);
  if (!product || product.categorySlug !== categorySlug) notFound();

  const detail: ProductDetail = {
    slug: product.slug,
    sharePath: `/catalogue/${product.categorySlug}/${product.slug}`,
    model: product.model,
    name: product.name,
    brand: product.brand,
    category: product.categoryName,
    categoryHref: `/catalogue/${product.categorySlug}`,
    description: product.description,
    images: product.images.length ? product.images.map((image) => ({ src: image.url, alt: image.altText ?? product.name })) : [{ src: "/assets/img/logo/kailom/kailom-logo-full.png", alt: product.name }],
    features: product.features,
    specifications: product.specifications.map((specification) => ({ label: specification.label, value: specification.value })),
    technicalNotes: [],
  };

  return <ProductDetailPage product={detail} />;
}
