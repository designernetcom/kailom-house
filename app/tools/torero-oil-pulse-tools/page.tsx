"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import { Arrow } from "../../components/site-shared";
import {
  oilPulseToolCount,
  oilPulseToolGroups,
  type OilPulseTool,
} from "./torero-oil-pulse-tools-products";

function Label({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <p className="section-label">
      <span>{number}</span>
      {children}
    </p>
  );
}

function OilPulseTable({ products, label }: { products: OilPulseTool[]; label: string }) {
  return (
    <div className="catalogue-table-wrap" tabIndex={0} aria-label={`${label} specifications table`}>
      <table className="catalogue-table torero-table">
        <thead>
          <tr>
            <th scope="col">Model No.</th>
            <th scope="col">Description</th>
            <th scope="col">Free Speed<br /><span>(RPM)</span></th>
            <th scope="col">Maximum Torque<br /><span>(Nm)</span></th>
            <th scope="col">Air Inlet<br /><span>(NPT)</span></th>
            <th scope="col">Weight<br /><span>(kg)</span></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.model}>
              <th scope="row">{product.model}</th>
              <td>{product.description}</td>
              <td>{product.freeSpeed}</td>
              <td>{product.maximumTorque}</td>
              <td>{product.airInlet}</td>
              <td>{product.weight}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ToreroOilPulseToolsPage() {
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
    <div className="catalogue-page torero-page">
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
        <section className="catalogue-intro" aria-labelledby="torero-title">
          <div className="shell">
            <Link className="catalogue-breadcrumb" href="/#products">
              Tools <Arrow /> Torero <Arrow /> Oil Pulse Tools
            </Link>
            <div className="catalogue-intro-grid">
              <div>
                <p className="eyebrow orange-text"><i /> Torero / oil pulse tools</p>
                <h1 id="torero-title">Torero <span>Oil Pulse Tools</span></h1>
              </div>
              <p className="catalogue-intro-copy">
                Shut-off, non-shut-off and specialist oil pulse tools for controlled fastening across a range of drive sizes and torque requirements.
              </p>
            </div>
            <div className="catalogue-meta-rail">
              <span><b>{String(oilPulseToolCount).padStart(2, "0")}</b> models listed</span>
              <span><b>03</b> tool types</span>
              <span><b>Nm</b> torque data</span>
              <span className="micro">Torero / 2026 catalogue</span>
            </div>
          </div>
        </section>

        <section className="catalogue-specs torero-specs section" id="specifications" aria-labelledby="torero-specs-title">
          <div className="shell">
            <div className="catalogue-section-heading">
              <div>
                <Label number="01">Torero oil pulse tools / specifications</Label>
                <h2 id="torero-specs-title">Choose the right pulse <em>format.</em></h2>
              </div>
              <p>Catalogue values are transcribed from the supplied Torero product sheet. Scroll horizontally on smaller screens to view every column.</p>
            </div>

            <div className="torero-table-stack">
              {oilPulseToolGroups.map((group, index) => (
                <section className="torero-table-block" key={group.id} aria-labelledby={`${group.id}-title`}>
                  <div className="torero-table-heading">
                    <div>
                      <Label number={`0${index + 1}`}>{group.label}</Label>
                      <h3 id={`${group.id}-title`}>{group.title}</h3>
                    </div>
                    <p>{group.description}</p>
                  </div>
                  <OilPulseTable products={group.products} label={group.title} />
                </section>
              ))}
            </div>
          </div>
        </section>

        <section className="catalogue-enquiry" id="contact" aria-labelledby="torero-enquiry-title">
          <div className="shell catalogue-enquiry-inner">
            <div>
              <p className="eyebrow"><i /> Selection support</p>
              <h2 id="torero-enquiry-title">Need help matching <em>torque to the joint?</em></h2>
            </div>
            <div>
              <p>Share your fastening requirement, torque range or model shortlist with Kailom House and we can support the next step.</p>
              <a className="button button-orange" href="mailto:sales.kailomhouse@gmail.com?subject=Torero%20oil%20pulse%20tools%20enquiry">
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
