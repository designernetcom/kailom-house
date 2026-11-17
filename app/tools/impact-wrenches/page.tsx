"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import { Arrow } from "../../components/site-shared";
import { impactWrenchProducts } from "./impact-wrench-products";

function Label({ number, children }: { number: string; children: React.ReactNode }) {
  return <p className="section-label"><span>{number}</span>{children}</p>;
}

export default function ImpactWrenchesPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="catalogue-page">
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader menuOpen={menuOpen} scrolled={scrolled} menuRef={menuRef} onMenuToggle={() => setMenuOpen((open) => !open)} onNavigate={() => setMenuOpen(false)} solid />

      <main id="main" inert={menuOpen}>
        <section className="catalogue-intro" aria-labelledby="catalogue-title">
          <div className="shell">
            <Link className="catalogue-breadcrumb" href="/#products">Tools <Arrow /> Kailom Tools</Link>
            <div className="catalogue-intro-grid">
              <div><p className="eyebrow orange-text"><i /> Kailom tools / product catalogue</p><h1 id="catalogue-title">Impact Wrenches <span>/ Ratchet Wrenches</span></h1></div>
              <p className="catalogue-intro-copy">Pneumatic impact and ratchet wrench models for fastening applications where torque, speed and fit need to be clear before selection.</p>
            </div>
            <div className="catalogue-meta-rail"><span><b>{impactWrenchProducts.length}</b> models listed</span><span><b>02</b> tool families</span><span><b>Nm / RPM</b> performance data</span><span className="micro">Kailom House / 2026 catalogue</span></div>
          </div>
        </section>

        <section className="catalogue-specs section" aria-labelledby="catalogue-specs-title">
          <div className="shell">
            <div className="catalogue-section-heading"><div><Label number="01">Product specifications</Label><h2 id="catalogue-specs-title">Compare the range <em>at a glance.</em></h2></div><p>Click any model number to open its full static product page. Scroll horizontally on smaller screens to view every column.</p></div>
            <div className="catalogue-table-wrap" tabIndex={0} aria-label="Impact and ratchet wrench specifications table">
              <table className="catalogue-table"><thead><tr><th scope="col">Model No.</th><th scope="col">Description</th><th scope="col">Max Torque<br /><span>(Nm)</span></th><th scope="col">Free Speed<br /><span>(RPM)</span></th><th scope="col">Drive Size</th><th scope="col">Air Inlet</th><th scope="col">Weight<br /><span>(kg)</span></th></tr></thead><tbody>
                {impactWrenchProducts.map((product) => <tr key={product.model}><th scope="row"><Link className="catalogue-model-link" href={`/tools/impact-wrenches/${product.slug}`}>{product.model}<span aria-hidden="true"> ↗</span></Link></th><td>{product.description}</td><td>{product.torque}</td><td>{product.speed}</td><td>{product.drive}</td><td>{product.airInlet}</td><td>{product.weight}</td></tr>)}
              </tbody></table>
            </div>
          </div>
        </section>

        <section className="catalogue-gallery-section" id="models" aria-labelledby="catalogue-gallery-title">
          <div className="shell">
            <div className="catalogue-section-heading catalogue-gallery-heading"><div><Label number="02">Product images</Label><h2 id="catalogue-gallery-title">Find the model <em>for the work.</em></h2></div><p>Open any card to review the model specifications and request a quote. Each card uses the supplied model photography.</p></div>
            <div className="catalogue-gallery">
              {impactWrenchProducts.map((product, index) => <Link className="catalogue-product-card" href={`/tools/impact-wrenches/${product.slug}`} key={product.model} aria-label={`View ${product.model} product page`}>
                <div className="catalogue-product-image">{product.images[0] ? <Image src={product.images[0].src} alt={product.images[0].alt} fill sizes="(max-width: 700px) 50vw, (max-width: 1000px) 33vw, 20vw" className="catalogue-product-image-media" /> : <div className="catalogue-image-placeholder"><span>Image pending</span><small>Model-specific asset not supplied</small></div>}<span className="catalogue-image-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span></div>
                <div className="catalogue-product-caption"><strong>{product.model}</strong><span>{product.description}</span><span className="catalogue-product-link">View product <Arrow /></span></div>
              </Link>)}
            </div>
          </div>
        </section>

        <section className="catalogue-enquiry" id="contact" aria-labelledby="catalogue-enquiry-title"><div className="shell catalogue-enquiry-inner"><div><p className="eyebrow"><i /> Selection support</p><h2 id="catalogue-enquiry-title">Need a closer match <em>to the application?</em></h2></div><div><p>Share your requirement, specification or model shortlist with Kailom House and we can support the next step.</p><a className="button button-orange" href="mailto:sales.kailomhouse@gmail.com?subject=Impact%20and%20ratchet%20wrench%20enquiry">Start an enquiry <Arrow /></a></div></div></section>
      </main>
      <SiteFooter menuOpen={menuOpen} />
    </div>
  );
}
