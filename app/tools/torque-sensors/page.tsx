"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import { Arrow } from "../../components/site-shared";
import { torqueSensorProducts, type TorqueSensorProduct } from "./torque-sensor-products";

function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <p className="section-label torque-section-label">
      <span>{number}</span>
      {children}
    </p>
  );
}

function SensorCard({ product, index }: { product: TorqueSensorProduct; index: number }) {
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
        <p className="torque-product-category">{product.sensorType}</p>
        <h3>{product.name}</h3>
        <p className="torque-product-description">{product.description}</p>
        <div className="torque-product-highlight">
          <span>Application focus</span>
          <strong>{product.highlight}</strong>
        </div>
        <ul className="torque-product-specs" aria-label={`${product.name} technical specifications`}>
          <li><span>Model</span><strong>{product.model}</strong></li>
          <li><span>Torque range</span><strong>{product.torqueRange}</strong></li>
          <li><span>Application</span><strong>{product.application}</strong></li>
        </ul>
        <a className="torque-product-link" href="#comparison" aria-label={`View ${product.name} comparison details`}>
          View product <Arrow />
        </a>
      </div>
    </article>
  );
}

export default function TorqueSensorsPage() {
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
    <div className="torque-page torque-sensor-page">
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
        <section className="torque-hero" aria-labelledby="torque-sensor-hero-title">
          <div className="shell torque-hero-grid">
            <div className="torque-hero-copy torque-reveal">
              <p className="eyebrow orange-text"><i /> Mountz / torque testing</p>
              <h1 id="torque-sensor-hero-title">
                TORQUE SENSORS
                <span>KEEP TOOLS IN CALIBRATION</span>
              </h1>
              <div className="torque-hero-description">
                <p>Mountz torque sensors can help you increase product efficiency and reduce product failure. Mountz has the right torque sensor for your use, from laboratory-grade accuracy to the stability needed for repeated pneumatic tool testing.</p>
                <p>In-line rotary torque sensors can calculate the torque applied by a power tool to a real fastener, providing the most precise calculation possible. These tools are designed to be simple to use and plug and play, helping technicians get straight to work.</p>
              </div>
              <div className="torque-hero-actions">
                <a className="button button-orange" href="#sensors">
                  Explore sensors <Arrow />
                </a>
                <span>Mountz precision sensing / 07 solutions</span>
              </div>
            </div>
            <div className="torque-hero-visual torque-reveal" style={{ "--delay": "140ms" } as CSSProperties}>
              <span className="torque-visual-grid" aria-hidden="true" />
              <span className="torque-visual-ring torque-visual-ring--outer" aria-hidden="true" />
              <span className="torque-visual-ring torque-visual-ring--inner" aria-hidden="true" />
              <div className="torque-hero-product">
                <Image
                  src={torqueSensorProducts[0].image}
                  alt={torqueSensorProducts[0].imageAlt}
                  fill
                  priority
                  sizes="(max-width: 700px) 82vw, 42vw"
                  className="torque-hero-product-image"
                  unoptimized
                />
              </div>
              <span className="torque-visual-code">MZ / 07</span>
              <span className="torque-visual-caption">Torque / sensing / control</span>
            </div>
          </div>
          <div className="shell torque-hero-rail">
            <span><b>01</b> Reaction sensing</span>
            <span><b>02</b> Rotary testing</span>
            <span><b>03</b> Tool calibration</span>
            <span className="micro">Mountz / precision torque sensing</span>
          </div>
        </section>

        <section className="torque-catalogue" id="sensors" aria-labelledby="torque-sensor-catalogue-title">
          <div className="shell">
            <div className="torque-section-heading">
              <div>
                <SectionLabel number="01">Product catalogue</SectionLabel>
                <h2 id="torque-sensor-catalogue-title">MOUNTZ TORQUE SENSORS</h2>
              </div>
              <p>Reaction, rotary, angle and screwdriver sensing solutions for calibration and power-tool verification.</p>
            </div>
            <div className="torque-product-grid">
              {torqueSensorProducts.map((product, index) => (
                <SensorCard key={product.slug} product={product} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section className="torque-comparison" id="comparison" aria-labelledby="torque-sensor-comparison-title">
          <div className="shell">
            <div className="torque-section-heading">
              <div>
                <SectionLabel number="02">Technical reference</SectionLabel>
                <h2 id="torque-sensor-comparison-title">COMPARE SENSOR SOLUTIONS</h2>
              </div>
              <p>Review the sensing format, torque range and intended application before selecting a solution.</p>
            </div>
            <div className="torque-table-wrap" tabIndex={0} aria-label="Torque sensor comparison table">
              <table className="torque-table">
                <thead>
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Sensor type</th>
                    <th scope="col">Torque range</th>
                    <th scope="col">Application</th>
                  </tr>
                </thead>
                <tbody>
                  {torqueSensorProducts.map((product) => (
                    <tr key={product.slug}>
                      <th scope="row"><a href={`#${product.slug}`}>{product.model}</a></th>
                      <td>{product.sensorType}</td>
                      <td>{product.torqueRange}</td>
                      <td>{product.application}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="torque-benefits" aria-labelledby="torque-sensor-benefits-title">
          <div className="shell">
            <div className="torque-section-heading">
              <div>
                <SectionLabel number="03">Why Mountz</SectionLabel>
                <h2 id="torque-sensor-benefits-title">BUILT FOR BETTER CONTROL.</h2>
              </div>
              <p>Choose the sensing architecture that makes calibration, auditing and production decisions clearer.</p>
            </div>
            <div className="torque-benefit-grid">
              {[
                ["01", "Calibration confidence", "Maintain accurate tool output with repeatable sensor-based checks."],
                ["02", "Power-tool visibility", "Measure rotary torque, angle and breakaway behavior on real fasteners."],
                ["03", "Plug-and-play testing", "Keep technicians focused on the result with simple, practical test setups."],
                ["04", "Application fit", "Cover small hand tools through high-range pneumatic and power-tool testing."],
              ].map(([number, title, description]) => (
                <article className="torque-benefit" key={number}>
                  <span className="torque-benefit-number">{number}</span>
                  <span className="torque-benefit-icon" aria-hidden="true"><Arrow /></span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="torque-enquiry" id="contact" aria-labelledby="torque-sensor-enquiry-title">
          <div className="shell torque-enquiry-inner">
            <div>
              <p className="eyebrow"><i /> Selection support</p>
              <h2 id="torque-sensor-enquiry-title">FIND THE RIGHT SENSOR FOR YOUR APPLICATION</h2>
            </div>
            <div>
              <p>Share your tool, torque range or calibration requirement and our team can help identify the right Mountz sensor.</p>
              <a className="button button-orange" href="mailto:sales.kailomhouse@gmail.com?subject=Torque%20sensor%20enquiry">
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
