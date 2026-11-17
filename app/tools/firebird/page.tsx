"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import { Arrow } from "../../components/site-shared";
import { firebirdProducts } from "./firebird-products";

function Label({ number, children }: { number: string; children: React.ReactNode }) {
  return <p className="section-label"><span>{number}</span>{children}</p>;
}

export default function FirebirdPage() {
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
    <div className="catalogue-page firebird-catalogue-page">
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader menuOpen={menuOpen} scrolled={scrolled} menuRef={menuRef} onMenuToggle={() => setMenuOpen((open) => !open)} onNavigate={() => setMenuOpen(false)} solid />

      <main id="main" inert={menuOpen}>
        <section className="catalogue-intro" aria-labelledby="firebird-catalogue-title">
          <div className="shell">
            <Link className="catalogue-breadcrumb" href="/#products">Tools <Arrow /> Firebird</Link>
            <div className="catalogue-intro-grid">
              <div><p className="eyebrow orange-text"><i /> Firebird / pneumatic tools</p><h1 id="firebird-catalogue-title">Firebird <span>Impact Wrenches</span></h1></div>
              <p className="catalogue-intro-copy">A complete Firebird pneumatic impact wrench range, organized from compact straight and pistol tools through heavy-duty 1 inch models.</p>
            </div>
            <div className="catalogue-meta-rail"><span><b>{firebirdProducts.length}</b> models listed</span><span><b>149-4068</b> Nm torque</span><span><b>4500-13000</b> RPM</span><span className="micro">Firebird / supplied catalogue reference</span></div>
          </div>
        </section>

        <section className="catalogue-specs section" aria-labelledby="firebird-specs-title">
          <div className="shell">
            <div className="catalogue-section-heading"><div><Label number="01">Product specifications</Label><h2 id="firebird-specs-title">Compare the range <em>at a glance.</em></h2></div><p>Click any model number to open its dedicated product page. Scroll horizontally on smaller screens to view every column.</p></div>
            <div className="catalogue-table-wrap" tabIndex={0} aria-label="Firebird impact wrench specifications table">
              <table className="catalogue-table firebird-table"><thead><tr><th scope="col">Model No.</th><th scope="col">Description</th><th scope="col">Free Speed<br /><span>(RPM)</span></th><th scope="col">Maximum Torque<br /><span>(Nm)</span></th><th scope="col">Air Inlet<br /><span>(NPT)</span></th><th scope="col">Hose Size ID<br /><span>(mm)</span></th><th scope="col">Weight<br /><span>(kg)</span></th></tr></thead><tbody>
                {firebirdProducts.map((product) => <tr key={product.model}><th scope="row"><Link className="catalogue-model-link" href={`/tools/firebird/${product.slug}`}>{product.model}<span aria-hidden="true"> &#8599;</span></Link></th><td>{product.description}</td><td>{product.speed}</td><td>{product.maximumTorque}</td><td>{product.airInlet}</td><td>{product.hoseSize}</td><td>{product.weight}</td></tr>)}
              </tbody></table>
            </div>
          </div>
        </section>

        <section className="catalogue-gallery-section" id="models" aria-labelledby="firebird-gallery-title">
          <div className="shell">
            <div className="catalogue-section-heading catalogue-gallery-heading"><div><Label number="02">Product images</Label><h2 id="firebird-gallery-title">Find the model <em>for the work.</em></h2></div><p>Open any model card for its full product page, technical data and quote request. The cards follow the model order in the supplied Firebird reference sheet.</p></div>
            <div className="catalogue-gallery firebird-gallery">
              {firebirdProducts.map((product, index) => <Link className="catalogue-product-card" href={`/tools/firebird/${product.slug}`} key={product.model} aria-label={`View ${product.model} product page`}>
                <div className="catalogue-product-image"><div className="catalogue-image-placeholder"><span>{product.model}</span><small>{product.description}<br />{product.maximumTorque} Nm / {product.speed} RPM</small></div><span className="catalogue-image-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span></div>
                <div className="catalogue-product-caption"><strong>{product.model}</strong><span>{product.description}</span><span className="catalogue-product-link">View product <Arrow /></span></div>
              </Link>)}
            </div>
          </div>
        </section>

        <section className="catalogue-enquiry" id="contact" aria-labelledby="firebird-enquiry-title"><div className="shell catalogue-enquiry-inner"><div><p className="eyebrow"><i /> Selection support</p><h2 id="firebird-enquiry-title">Need a closer match <em>to the application?</em></h2></div><div><p>Share your required drive size, torque, speed or Firebird model shortlist with Kailom House and we can support the next step.</p><a className="button button-orange" href="mailto:sales.kailomhouse@gmail.com?subject=Firebird%20impact%20wrench%20enquiry">Start an enquiry <Arrow /></a></div></div></section>
      </main>
      <SiteFooter menuOpen={menuOpen} />
    </div>
  );
}
