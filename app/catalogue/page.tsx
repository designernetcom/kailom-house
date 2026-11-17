import Link from "next/link";
import { getCategories } from "../lib/catalogue-api";
import styles from "./catalogue.module.css";

export const dynamic = "force-static";

export default function CataloguePage() {
  const categories = getCategories();

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <Link className={styles.back} href="/">← Kailom House</Link>
        <div className={styles.heading}>
          <div><p className={styles.eyebrow}>Kailom House / Catalogue</p><h1>Find the right tool for the work.</h1></div>
          <p>Browse the static Kailom House catalogue while we shape the product experience.</p>
        </div>
        {categories.length ? <div className={styles.grid}>{categories.map((category) => <Link className={styles.categoryCard} href={`/catalogue/${category.slug}`} key={category.id}><div><strong>{category.name}</strong><span>{category.description ?? "Explore this product category."}</span></div><span className={styles.arrow}>↗</span></Link>)}</div> : <p className={styles.empty}>The static catalogue is being prepared.</p>}
      </div>
    </main>
  );
}
