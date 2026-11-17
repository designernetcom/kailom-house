import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategories, getCategory, getProductsForCategory } from "../../lib/catalogue-api";
import styles from "../catalogue.module.css";

export const dynamic = "force-static";

export function generateStaticParams() {
  return getCategories().map((category) => ({ categorySlug: category.slug }));
}

export default async function CategoryCataloguePage({ params }: { params: Promise<{ categorySlug: string }> }) {
  const { categorySlug } = await params;
  const category = getCategory(categorySlug);
  if (!category) notFound();
  const products = getProductsForCategory(categorySlug);

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <Link className={styles.back} href="/catalogue">← All categories</Link>
        <div className={styles.heading}>
          <div><p className={styles.eyebrow}>Catalogue / {category.name}</p><h1>Models for the application.</h1></div>
          <p>{products.length} published model{products.length === 1 ? "" : "s"} in this category.</p>
        </div>
        {products.length ? <div className={styles.grid}>{products.map((product) => <Link className={styles.productCard} href={`/catalogue/${categorySlug}/${product.slug}`} key={product.id}><small>{product.brand} / {product.model}</small><h2>{product.name}</h2><p>{product.description}</p><span className={styles.arrow}>↗</span></Link>)}</div> : <p className={styles.empty}>No published products in this category yet.</p>}
      </div>
    </main>
  );
}
