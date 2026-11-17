"use client";

import { useEffect, useRef, useState } from "react";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import { Arrow } from "./site-shared";

type MountzCategoryPageProps = {
  title: string;
  group: string;
  description: string;
};

function Label({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <p className="section-label">
      <span>{number}</span>
      {children}
    </p>
  );
}

export default function MountzCategoryPage({ title, group, description }: MountzCategoryPageProps) {
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
    <div className="catalogue-page mountz-category-page">
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
        <section className="catalogue-intro" aria-labelledby="mountz-category-title">
          <div className="shell">
            <a className="catalogue-breadcrumb" href="/tools/torque-analyzers">
              Tools <Arrow /> Mountz <Arrow /> {group} <Arrow /> {title}
            </a>
            <div className="catalogue-intro-grid">
              <div>
                <p className="eyebrow orange-text"><i /> Mountz / product catalogue</p>
                <h1 id="mountz-category-title">{title}</h1>
              </div>
              <p className="catalogue-intro-copy">{description}</p>
            </div>
            <div className="catalogue-meta-rail">
              <span><b>Mountz</b> category</span>
              <span><b>{group}</b> range</span>
              <span><b>01</b> product family</span>
              <span className="micro">Kailom House / Mountz catalogue</span>
            </div>
          </div>
        </section>

        <section className="catalogue-specs section" aria-labelledby="mountz-category-content-title">
          <div className="shell">
            <div className="catalogue-section-heading">
              <div>
                <Label number="01">Mountz product category</Label>
                <h2 id="mountz-category-content-title">Built for the <em>application.</em></h2>
              </div>
              <p>Product specifications and model photography for this Mountz range are being prepared. Contact Kailom House for selection support.</p>
            </div>
            <div className="mountz-category-note">
              <span className="mountz-category-note-index">MZ / {group.slice(0, 2).toUpperCase()}</span>
              <div>
                <strong>{title} catalogue coming next.</strong>
                <p>Share your tool type, torque range or production requirement and our team can help identify the right Mountz solution while this catalogue section is completed.</p>
              </div>
              <a className="button button-orange" href="mailto:sales.kailomhouse@gmail.com?subject=Mountz%20product%20enquiry">Start an enquiry <Arrow /></a>
            </div>
          </div>
        </section>

        <section className="catalogue-enquiry" id="contact" aria-labelledby="mountz-category-enquiry-title">
          <div className="shell catalogue-enquiry-inner">
            <div>
              <p className="eyebrow"><i /> Mountz selection support</p>
              <h2 id="mountz-category-enquiry-title">Need a closer match <em>to the application?</em></h2>
            </div>
            <div>
              <p>Explore the available torque-analyzer and torque-sensor information, or send us your Mountz requirement.</p>
              <a className="button button-orange" href="/tools/torque-sensors">Explore torque sensors <Arrow /></a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter menuOpen={menuOpen} />
    </div>
  );
}
