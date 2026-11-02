"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import { Arrow } from "../../components/site-shared";

type AbrasiveToolProduct = {
  model: string;
  description: string;
  freeSpeed: string;
  airInlet: string;
  hoseSize: string;
  weight: string;
};

const products: AbrasiveToolProduct[] = [
  {
    model: "KG-5206M",
    description: "6 mm Heavy Duty Die Grinder",
    freeSpeed: "32000",
    airInlet: "1/4\"",
    hoseSize: "10 mm",
    weight: "0.73",
  },
  {
    model: "KG-512",
    description: "6 mm Die Grinder",
    freeSpeed: "23000",
    airInlet: "1/4\"",
    hoseSize: "10 mm",
    weight: "0.6",
  },
  {
    model: "KG-5001",
    description: "3 mm Micro Die Grinder",
    freeSpeed: "56000",
    airInlet: "1/4\"",
    hoseSize: "10 mm",
    weight: "0.25",
  },
  {
    model: "KG-522",
    description: "6 mm Angle Die Grinder",
    freeSpeed: "22000",
    airInlet: "1/4\"",
    hoseSize: "10 mm",
    weight: "0.5",
  },
  {
    model: "KAG-619",
    description: "4\" Angle Grinder",
    freeSpeed: "12000",
    airInlet: "1/4\"",
    hoseSize: "10 mm",
    weight: "1.8",
  },
  {
    model: "KAS-6661-SM",
    description: "7\" Angle Sander",
    freeSpeed: "4500",
    airInlet: "1/4\"",
    hoseSize: "10 mm",
    weight: "1.9",
  },
  {
    model: "KSAN-50VE",
    description: "5\" Orbital Sander",
    freeSpeed: "12000",
    airInlet: "1/4\"",
    hoseSize: "10 mm",
    weight: "0.81",
  },
  {
    model: "KBS-4518",
    description: "10 mm Heavy Duty Belt Sander",
    freeSpeed: "16000",
    airInlet: "1/4\"",
    hoseSize: "10 mm",
    weight: "0.95",
  },
  {
    model: "KBS-4517",
    description: "20 mm Heavy Duty Belt Sander",
    freeSpeed: "16000",
    airInlet: "1/4\"",
    hoseSize: "10 mm",
    weight: "1.4",
  },
  {
    model: "MG-120",
    description: "3 mm Air Micro Die Grinder",
    freeSpeed: "65000",
    airInlet: "1/4\"",
    hoseSize: "6.4 mm",
    weight: "0.1",
  },
];

function Label({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <p className="section-label">
      <span>{number}</span>
      {children}
    </p>
  );
}

export default function AbrasiveToolsPage() {
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
      <SiteHeader
        menuOpen={menuOpen}
        scrolled={scrolled}
        menuRef={menuRef}
        onMenuToggle={() => setMenuOpen((open) => !open)}
        onNavigate={() => setMenuOpen(false)}
        solid
      />

      <main id="main" inert={menuOpen}>
        <section className="catalogue-intro" aria-labelledby="abrasive-tools-title">
          <div className="shell">
            <Link className="catalogue-breadcrumb" href="/tools/impact-wrenches">
              Kailom Tools <Arrow /> Abrasive Tools
            </Link>
            <div className="catalogue-intro-grid">
              <div>
                <p className="eyebrow orange-text"><i /> Kailom tools / product catalogue</p>
                <h1 id="abrasive-tools-title">ABRASIVE TOOLS</h1>
              </div>
              <p className="catalogue-intro-copy">
                Die grinders, angle tools and sanders for controlled material removal, finishing and surface preparation across demanding applications.
              </p>
            </div>
            <div className="catalogue-meta-rail">
              <span><b>10</b> models listed</span>
              <span><b>01</b> tool family</span>
              <span><b>RPM</b> performance data</span>
              <span className="micro">Kailom House / 2026 catalogue</span>
            </div>
          </div>
        </section>

        <section className="catalogue-specs section" aria-labelledby="abrasive-tools-specs-title">
          <div className="shell">
            <div className="catalogue-section-heading">
              <div>
                <Label number="01">Abrasive tools specifications</Label>
                <h2 id="abrasive-tools-specs-title">Compare the range <em>at a glance.</em></h2>
              </div>
              <p>Values are shown exactly as supplied. Scroll horizontally on smaller screens to view every column.</p>
            </div>
            <div className="catalogue-table-wrap" tabIndex={0} aria-label="Abrasive tools specifications table">
              <table className="catalogue-table">
                <thead>
                  <tr>
                    <th scope="col">Model No.</th>
                    <th scope="col">Description</th>
                    <th scope="col">Free Speed<br /><span>(RPM)</span></th>
                    <th scope="col">Air Inlet<br /><span>(NPT)</span></th>
                    <th scope="col">Hose Size ID<br /><span>(mm)</span></th>
                    <th scope="col">Weight<br /><span>(kgs)</span></th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.model}>
                      <th scope="row">{product.model}</th>
                      <td>{product.description}</td>
                      <td>{product.freeSpeed}</td>
                      <td>{product.airInlet}</td>
                      <td>{product.hoseSize}</td>
                      <td>{product.weight}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="catalogue-gallery-section" id="models" aria-labelledby="abrasive-tools-gallery-title">
          <div className="shell">
            <div className="catalogue-section-heading catalogue-gallery-heading">
              <div>
                <Label number="02">Abrasive tools product images</Label>
                <h2 id="abrasive-tools-gallery-title">See every model <em>in sequence.</em></h2>
              </div>
              <p>Model-specific abrasive tool photography is not yet available in the project assets, so each card is clearly marked until the correct image is supplied.</p>
            </div>
            <div className="catalogue-gallery catalogue-gallery--abrasive-tools">
              {products.map((product, index) => (
                <article className="catalogue-product-card" key={product.model}>
                  <div className="catalogue-product-image">
                    <div className="catalogue-image-placeholder" aria-label={`${product.model} product image pending`}>
                      <span>Image pending</span>
                      <small>Model-specific asset not supplied</small>
                    </div>
                    <span className="catalogue-image-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="catalogue-product-caption">
                    <strong>{product.model}</strong>
                    <span>{product.description}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="catalogue-enquiry" id="contact" aria-labelledby="abrasive-tools-enquiry-title">
          <div className="shell catalogue-enquiry-inner">
            <div>
              <p className="eyebrow"><i /> Selection support</p>
              <h2 id="abrasive-tools-enquiry-title">Need a closer match <em>to the application?</em></h2>
            </div>
            <div>
              <p>Share your finishing requirement, specification or model shortlist with Kailom House and we can support the next step.</p>
              <a className="button button-orange" href="mailto:sales.kailomhouse@gmail.com?subject=Abrasive%20tools%20enquiry">
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
