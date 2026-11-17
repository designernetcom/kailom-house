"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import { Arrow } from "../../components/site-shared";
import { torqueAnalyzerProducts, type TorqueAnalyzerProduct } from "./torque-analyzer-products";

const benefits = [
  {
    title: "PRECISION MEASUREMENT",
    description: "Reliable torque measurement solutions for industrial applications.",
    icon: "target",
  },
  {
    title: "QUALITY CONTROL",
    description: "Support pass/fail testing and consistent quality inspection.",
    icon: "check",
  },
  {
    title: "FLEXIBLE CONNECTIVITY",
    description: "Selected models support external torque sensor connectivity.",
    icon: "link",
  },
  {
    title: "MULTIPLE APPLICATIONS",
    description: "Solutions for screwdrivers, wrenches, and power tools.",
    icon: "tools",
  },
] as const;

function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <p className="section-label torque-section-label">
      <span>{number}</span>
      {children}
    </p>
  );
}

function BenefitIcon({ name }: { name: (typeof benefits)[number]["icon"] }) {
  if (name === "target") {
    return (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="16" cy="16" r="5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M16 2v5M16 25v5M2 16h5M25 16h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "check") {
    return (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M8 16.5 13.2 22 24.5 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    );
  }

  if (name === "link") {
    return (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="m13.1 19.1-1.9 1.9a4.6 4.6 0 0 1-6.5-6.5l4.1-4.1a4.6 4.6 0 0 1 6.5 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="m18.9 12.9 1.9-1.9a4.6 4.6 0 0 1 6.5 6.5l-4.1 4.1a4.6 4.6 0 0 1-6.5 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="m11.5 16.5 9-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="m19.2 5.3 7.5 7.5-3.3 3.3-7.5-7.5 3.3-3.3Z" stroke="currentColor" strokeWidth="1.4" />
      <path d="m14.8 9.7-9.5 9.5 7.5 7.5 9.5-9.5M8.2 20.3l-3.5 3.5M11.7 23.8l-3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ProductCard({ product, index }: { product: TorqueAnalyzerProduct; index: number }) {
  const animationStyle = { "--delay": `${index * 70}ms` } as CSSProperties;

  return (
    <article className="torque-product-card torque-reveal" id={product.slug} style={animationStyle}>
      <div className="torque-product-image">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(max-width: 700px) 92vw, (max-width: 1100px) 45vw, 31vw"
          className="torque-product-image-media"
          unoptimized
          priority={index === 0}
        />
        <span className="torque-product-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
        <span className="torque-product-brand">Mountz</span>
      </div>
      <div className="torque-product-content">
        <p className="torque-product-category">{product.category}</p>
        <h3>{product.name}</h3>
        <p className="torque-product-description">{product.description}</p>
        <div className="torque-product-highlight">
          <span>Application focus</span>
          <strong>{product.highlight}</strong>
        </div>
        <ul className="torque-product-specs" aria-label={`${product.name} technical specifications`}>
          {product.specifications.map((specification) => (
            <li key={specification.label}>
              <span>{specification.label}</span>
              <strong>{specification.value}</strong>
            </li>
          ))}
        </ul>
        <div className="torque-product-application">
          <span>Key application</span>
          <p>{product.applications}</p>
        </div>
        <a className="torque-product-link" href="#comparison" aria-label={`View ${product.name} comparison details`}>
          View product <Arrow />
        </a>
      </div>
    </article>
  );
}

export default function TorqueAnalyzersPage() {
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
    <div className="torque-page">
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
        <section className="torque-hero" aria-labelledby="torque-hero-title">
          <div className="shell torque-hero-grid">
            <div className="torque-hero-copy torque-reveal">
              <p className="eyebrow orange-text"><i /> Mountz / torque testing</p>
              <h1 id="torque-hero-title">
                TORQUE ANALYZERS
                <span>THE KEY TO QUALITY</span>
              </h1>
              <div className="torque-hero-description">
                <p>By using Mountz torque analyzers to ensure good consistency, you can reduce the possibility of lost product on the line or field failures.</p>
                <p>Our analyzers are designed for effective pass/fail testing, with models featuring internal computers to calculate and display testing outcomes in quality control environments, as well as models that connect to external torque sensors.</p>
                <p>Our torque testers are built to adapt to your processes and manufacturing environment, regardless of the variation you need.</p>
              </div>
              <div className="torque-hero-actions">
                <a className="button button-orange" href="#analyzers">
                  Explore analyzers <Arrow />
                </a>
                <span>Mountz precision measurement / 05 solutions</span>
              </div>
            </div>
            <div className="torque-hero-visual torque-reveal" style={{ "--delay": "140ms" } as CSSProperties}>
              <span className="torque-visual-grid" aria-hidden="true" />
              <span className="torque-visual-ring torque-visual-ring--outer" aria-hidden="true" />
              <span className="torque-visual-ring torque-visual-ring--inner" aria-hidden="true" />
              <div className="torque-hero-product">
                <Image
                  src={torqueAnalyzerProducts[0].image}
                  alt="Mountz EZ-TORQ III torque analyzer"
                  fill
                  priority
                  sizes="(max-width: 700px) 82vw, 42vw"
                  className="torque-hero-product-image"
                  unoptimized
                />
              </div>
              <span className="torque-visual-code">MZ / 05</span>
              <span className="torque-visual-caption">Torque / quality / control</span>
            </div>
          </div>
          <div className="shell torque-hero-rail">
            <span><b>01</b> Pass / fail testing</span>
            <span><b>02</b> Sensor-ready systems</span>
            <span><b>03</b> Quality control</span>
            <span className="micro">Mountz / precision torque testing</span>
          </div>
        </section>

        <section className="torque-catalogue" id="analyzers" aria-labelledby="torque-catalogue-title">
          <div className="shell">
            <div className="torque-section-heading">
              <div>
                <SectionLabel number="01">Product catalogue</SectionLabel>
                <h2 id="torque-catalogue-title">OUR TORQUE ANALYZERS</h2>
              </div>
              <p>Precision Testing Solutions for Every Application</p>
            </div>
            <div className="torque-product-grid">
              {torqueAnalyzerProducts.map((product, index) => (
                <ProductCard key={product.slug} product={product} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section className="torque-comparison" id="comparison" aria-labelledby="torque-comparison-title">
          <div className="shell">
            <div className="torque-section-heading">
              <div>
                <SectionLabel number="02">Technical reference</SectionLabel>
                <h2 id="torque-comparison-title">COMPARE TORQUE ANALYZER SOLUTIONS</h2>
              </div>
              <p>Review the supplied measurement ranges, connectivity, and intended applications before selecting a solution.</p>
            </div>
            <div className="torque-table-wrap" tabIndex={0} aria-label="Torque analyzer comparison table">
              <table className="torque-table">
                <thead>
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Analyzer Type</th>
                    <th scope="col">Torque Range</th>
                    <th scope="col">Transducer / Connectivity</th>
                    <th scope="col">Applications</th>
                  </tr>
                </thead>
                <tbody>
                  {torqueAnalyzerProducts.map((product) => (
                    <tr key={product.slug}>
                      <th scope="row"><a href={`#${product.slug}`}>{product.name}</a></th>
                      <td>{product.analyzerType}</td>
                      <td>{product.torqueRange}</td>
                      <td>{product.connectivity}</td>
                      <td>{product.applications}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="torque-benefits" aria-labelledby="torque-benefits-title">
          <div className="shell">
            <div className="torque-section-heading">
              <div>
                <SectionLabel number="03">Why Mountz</SectionLabel>
                <h2 id="torque-benefits-title">BUILT FOR BETTER CONTROL.</h2>
              </div>
              <p>Measurement should make the next decision clearer. Mountz analyzers support dependable checks across the assembly process.</p>
            </div>
            <div className="torque-benefit-grid">
              {benefits.map((benefit, index) => (
                <article className="torque-benefit" key={benefit.title}>
                  <span className="torque-benefit-number">{String(index + 1).padStart(2, "0")}</span>
                  <span className="torque-benefit-icon"><BenefitIcon name={benefit.icon} /></span>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="torque-enquiry" id="contact" aria-labelledby="torque-enquiry-title">
          <div className="shell torque-enquiry-inner">
            <div>
              <p className="eyebrow"><i /> Selection support</p>
              <h2 id="torque-enquiry-title">FIND THE RIGHT TORQUE ANALYZER FOR YOUR APPLICATION</h2>
            </div>
            <div>
              <p>Looking for the right torque measurement solution? Our team can help you identify the right analyzer for your testing and quality control requirements.</p>
              <a className="button button-orange" href="mailto:sales.kailomhouse@gmail.com?subject=Torque%20analyzer%20enquiry">
                Enquire now <Arrow />
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter menuOpen={menuOpen} />
    </div>
  );
}
