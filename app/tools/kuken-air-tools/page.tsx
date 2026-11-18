"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import { Arrow } from "../../components/site-shared";
import { kukenAirToolProducts } from "./kuken-air-tool-products";

function Label({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <p className="section-label">
      <span>{number}</span>
      {children}
    </p>
  );
}

export default function KukenAirToolsPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);
  const modelCount = String(kukenAirToolProducts.length).padStart(2, "0");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="catalogue-page kuken-air-tools-page">
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader
        menuOpen={menuOpen}
        scrolled={scrolled}
        menuRef={menuRef}
        onMenuToggle={() => setMenuOpen((open) => !open)}
        onNavigate={() => setMenuOpen(false)}
        solid
      />

      <main id="main" inert={menuOpen}>
        <section className="catalogue-intro" aria-labelledby="kuken-air-tools-title">
          <div className="shell">
            <Link className="catalogue-breadcrumb" href="/#solutions">
              Industry 4.0 <Arrow /> KUKEN Japan <Arrow /> Air Tools
            </Link>
            <div className="catalogue-intro-grid">
              <div>
                <p className="eyebrow orange-text"><i /> KUKEN Japan / product catalogue</p>
                <h1 id="kuken-air-tools-title">KUKEN Japan <span>Air Tools</span></h1>
              </div>
              <p className="catalogue-intro-copy">
                A focused view of the supplied KUKEN PTS air tool assets, arranged by model name so your team can quickly identify the right range to discuss with Kailom House.
              </p>
            </div>
            <div className="catalogue-meta-rail">
              <span><b>{modelCount}</b> models listed</span>
              <span><b>01</b> PTS family</span>
              <span><b>PNG</b> assets supplied</span>
              <span className="micro">Kailom House / 2026 catalogue</span>
            </div>
          </div>
        </section>

        <section className="catalogue-specs section" id="products" aria-labelledby="kuken-air-tools-list-title">
          <div className="shell">
            <div className="catalogue-section-heading">
              <div>
                <Label number="01">KUKEN Japan product list</Label>
                <h2 id="kuken-air-tools-list-title">Find your model <em>by name.</em></h2>
              </div>
              <p>Model names and image filenames are kept aligned with the assets supplied for this KUKEN Japan range. Contact us for current technical data and availability.</p>
            </div>
            <div className="catalogue-table-wrap" tabIndex={0} aria-label="KUKEN Japan air tools product list">
              <table className="catalogue-table catalogue-table--kuken">
                <thead>
                  <tr>
                    <th scope="col">Model No.</th>
                    <th scope="col">Product family</th>
                    <th scope="col">Supplied image</th>
                  </tr>
                </thead>
                <tbody>
                  {kukenAirToolProducts.map((product) => (
                    <tr key={product.model}>
                      <th scope="row">
                        <a className="catalogue-model-link" href={`#product-${product.slug}`}>
                          {product.model}<span aria-hidden="true"> ↗</span>
                        </a>
                      </th>
                      <td>{product.family}</td>
                      <td>{product.assetName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="catalogue-gallery-section" id="models" aria-labelledby="kuken-air-tools-gallery-title">
          <div className="shell">
            <div className="catalogue-section-heading catalogue-gallery-heading">
              <div>
                <Label number="02">Supplied product images</Label>
                <h2 id="kuken-air-tools-gallery-title">The PTS range <em>at a glance.</em></h2>
              </div>
              <p>Every card below uses the matching filename from the uploaded KUKEN air tools folder.</p>
            </div>
            <div className="catalogue-gallery catalogue-gallery--kuken">
              {kukenAirToolProducts.map((product, index) => (
                <article className="catalogue-product-card" id={`product-${product.slug}`} key={product.model}>
                  <div className="catalogue-product-image">
                    <Image
                      src={product.image}
                      alt={product.imageAlt}
                      fill
                      sizes="(max-width: 700px) 50vw, (max-width: 1000px) 50vw, 33vw"
                      className="catalogue-product-image-media"
                    />
                    <span className="catalogue-image-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="catalogue-product-caption">
                    <strong>{product.model}</strong>
                    <span>{product.family}</span>
                    <span>{product.assetName}</span>
                    <a className="catalogue-product-link" href="#enquiry">
                      Request details <Arrow />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="catalogue-enquiry" id="enquiry" aria-labelledby="kuken-air-tools-enquiry-title">
          <div className="shell catalogue-enquiry-inner">
            <div>
              <p className="eyebrow"><i /> Selection support</p>
              <h2 id="kuken-air-tools-enquiry-title">Need the right KUKEN <em>air tool?</em></h2>
            </div>
            <div>
              <p>Share the KUKEN model you are reviewing with Kailom House and we can help with application details, availability and the next step.</p>
              <a className="button button-orange" href="mailto:sales.kailomhouse@gmail.com?subject=KUKEN%20Japan%20air%20tools%20enquiry">
                Start an enquiry <Arrow />
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter menuOpen={menuOpen} />
    </div>
  );
}
