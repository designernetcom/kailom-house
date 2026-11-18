"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import { Arrow } from "../../components/site-shared";

const farProductImage = "/assets/img/products/far/far-product-range.png";
const farCatalogue = "/assets/catalogues/far-fastening-tools-catalogue.pptx";

function Label({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <p className="section-label">
      <span>{number}</span>
      {children}
    </p>
  );
}

const productAreas = [
  ["01", "Blind rivets", "Reliable rivet formats for permanent fastening across industrial assemblies."],
  ["02", "Rivet nuts", "Threaded inserts and blind rivet nuts for applications that need a serviceable joint."],
  ["03", "Riveting tools", "Hand tools and powered equipment matched to the fastener and the production requirement."],
  ["04", "Control systems", "Equipment and accessories that help teams keep fastening work consistent."],
];

export default function FarToolsPage() {
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
    <div className="far-page">
      <a className="skip-link" href="#main">Skip to content</a>
      <div id="top" className="header-sentinel" aria-hidden="true" />
      <SiteHeader
        menuOpen={menuOpen}
        scrolled={scrolled}
        menuRef={menuRef}
        onMenuToggle={() => setMenuOpen((open) => !open)}
        onNavigate={() => setMenuOpen(false)}
        solid
      />

      <main id="main" inert={menuOpen}>
        <section className="far-hero" aria-labelledby="far-title">
          <div className="shell">
            <Link className="far-breadcrumb" href="/#products">Tools <Arrow /> FAR Fastening Tools</Link>
            <div className="far-hero-grid">
              <div>
                <p className="eyebrow orange-text"><i /> FAR / fastening tools</p>
                <h1 id="far-title">FAR <span>Fastening Tools</span></h1>
                <p className="far-hero-copy">High-performance blind rivets, rivet nuts and riveting tools for teams that need consistent fastening quality and dependable operation.</p>
                <div className="far-hero-actions">
                  <a className="button button-orange" href={farCatalogue} download>Download catalogue <Arrow /></a>
                  <a className="text-link" href="/#contact">Talk through your requirement <Arrow /></a>
                </div>
              </div>
              <div className="far-hero-note"><span className="micro">FAR / Since 1957</span><strong>Fastening<br />with purpose.</strong><span>FAR, Bologna / Italy</span></div>
            </div>
            <div className="far-hero-rail"><span><b>01</b> Blind rivets</span><span><b>02</b> Rivet nuts</span><span><b>03</b> Riveting tools</span><span className="micro">Kailom House / FAR India</span></div>
          </div>
        </section>

        <section className="far-visual-section" aria-label="FAR product range">
          <Image src={farProductImage} alt="FAR blind rivets, rivet nuts and riveting tools product range" width={650} height={437} priority sizes="100vw" className="far-product-image" />
        </section>

        <section className="section far-overview" aria-labelledby="far-overview-title">
          <div className="shell">
            <Label number="01">FAR fastening tools</Label>
            <div className="far-overview-grid">
              <div>
                <h2 id="far-overview-title">Built around reliable fastening <em>performance.</em></h2>
              </div>
              <div className="far-overview-copy">
                <p>Since 1957, FAR has manufactured high-tech fasteners and associated tooling with a focus on efficient operation and consistent product quality. Its established distribution network supports companies that need dependable fastening results.</p>
                <p>Kailom House is pleased to represent FAR fastening tools in India, connecting customers with blind rivets, metric kits, blind rivet nuts, riveting tools and control systems that fit the application.</p>
                <p>We work with the requirement first, then help identify the right fastener, tool and support around it.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="far-range-section" aria-labelledby="far-range-title">
          <div className="shell">
            <div className="far-section-heading"><div><Label number="02">Product range</Label><h2 id="far-range-title">One fastening partner <em>for the application.</em></h2></div><p>Explore the main FAR product areas available through Kailom House.</p></div>
            <div className="far-range-list">
              {productAreas.map(([number, title, description]) => <article className="far-range-item" key={number}><span className="far-range-number">{number}</span><h3>{title}</h3><p>{description}</p><Arrow /></article>)}
            </div>
          </div>
        </section>

        <section className="far-download-section" aria-labelledby="far-download-title">
          <div className="shell far-download-inner"><div><p className="eyebrow"><i /> FAR catalogue</p><h2 id="far-download-title">Review the complete<br /><span>fastening range.</span></h2></div><div><p>Download the supplied FAR catalogue for additional fastener, tool and application information.</p><a className="button button-orange" href={farCatalogue} download>Download FAR catalogue <Arrow /></a></div></div>
        </section>
      </main>

      <SiteFooter menuOpen={menuOpen} />
    </div>
  );
}
