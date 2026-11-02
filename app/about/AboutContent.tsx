"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { Arrow } from "../components/site-shared";

const asset = (name: string) => `/assets/img/all-images/${name}`;

const values = [
  ["Precision", "Quality tools and equipment suitable for the application."],
  ["Responsive service", "Clear support for requirements, specifications and supply."],
  ["Application-based sourcing", "Products matched to the work, not simply the catalogue."],
  ["Dependable support", "Spares, replacement parts and after-sales support as required."],
];

const strengths = [
  ["01", "A close understanding of the application", "We begin with the assembly requirement, then match the tool, accessory or supply solution to the work."],
  ["02", "A focused industrial range", "Our range covers assembly tools, torque testing, torque wrenches, tooling and accessories."],
  ["03", "Support that stays responsive", "From first enquiry through sourcing and after-sales requirements, we keep the conversation practical and direct."],
];

function Label({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <p className="section-label">
      <span>{number}</span>
      {children}
    </p>
  );
}

export default function AboutContent() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sentinel = document.querySelector(".header-sentinel");
    const headerObserver = new IntersectionObserver(([entry]) =>
      setScrolled(!entry.isIntersecting),
    );
    if (sentinel) headerObserver.observe(sentinel);

    const revealObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    document.querySelectorAll("[data-reveal]").forEach((element) => {
      element.classList.add("will-reveal");
      revealObserver.observe(element);
    });

    return () => {
      headerObserver.disconnect();
      revealObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuRef.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", close);
    };
  }, [menuOpen]);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <div id="top" className="header-sentinel" aria-hidden="true" />
      <SiteHeader
        menuOpen={menuOpen}
        scrolled={scrolled}
        menuRef={menuRef}
        onMenuToggle={() => setMenuOpen((open) => !open)}
        onNavigate={() => setMenuOpen(false)}
      />

      <main id="main" className="about-page" inert={menuOpen}>
        <section className="about-hero" aria-labelledby="about-hero-title">
          <Image
            className="about-hero-image"
            src={asset("kailom-about-precision-workshop.png")}
            alt="Industrial assembly tools and equipment in a precision workshop"
            fill
            priority
            sizes="100vw"
          />
          <div className="about-hero-shade" />
          <div className="shell about-hero-inner">
            <div className="about-breadcrumb" data-reveal>
              <a href="/">Home</a><span>/</span><span>About us</span>
            </div>
            <div className="about-hero-copy" data-reveal>
              <p className="eyebrow"><i /> Kailom House / About</p>
              <h1 id="about-hero-title">Closer to the<br /><span>application.</span></h1>
              <p>
                Industrial tools, equipment and supply solutions matched to the
                work that needs to be done.
              </p>
            </div>
            <div className="about-hero-bottom">
              <span className="micro">About Kailom House / 01</span>
              <a href="#overview">Discover our approach <Arrow /></a>
            </div>
          </div>
        </section>

        <section className="section about-overview" id="overview">
          <div className="shell">
            <Label number="01">Who we are</Label>
            <div className="about-overview-grid">
              <div className="about-overview-image" data-reveal>
                <Image
                  src={asset("kailom-about-workshop.png")}
                  alt="Technician using a precision tool during industrial assembly"
                  fill
                  sizes="(max-width: 700px) 100vw, 48vw"
                />
                <span className="micro">Industrial assembly / 01</span>
              </div>
              <div className="about-overview-copy" data-reveal>
                <p className="eyebrow orange-text"><i /> Supply with purpose</p>
                <h2>Tools that make the work more dependable.</h2>
                <p>
                  Kailom House supplies industrial tools, machinery, equipment,
                  hardware, electrical accessories and consumables for industries
                  and organisations across India.
                </p>
                <p>
                  We help teams find the right fastening, torque testing,
                  tooling and accessory solutions by staying close to the
                  requirements, specifications and applications behind every job.
                </p>
                <a className="text-link" href="#contact">Talk through your requirement <Arrow /></a>
              </div>
            </div>
          </div>
        </section>

        <section className="about-principle" aria-labelledby="principle-title">
          <div className="shell about-principle-inner">
            <div className="about-principle-mark" aria-hidden="true">KH<br />/+</div>
            <div data-reveal>
              <p className="eyebrow"><i /> The Kailom approach</p>
              <h2 id="principle-title">Requirements.<br />Specifications.<br /><span>Applications.</span></h2>
            </div>
            <p className="about-principle-note" data-reveal>
              The right supply starts with understanding the application. That
              principle shapes what we source, how we respond and how we support
              every customer conversation.
            </p>
          </div>
        </section>

        <section className="section about-values-section">
          <div className="shell">
            <Label number="02">What guides us</Label>
            <div className="about-values-heading" data-reveal>
              <h2>A practical standard<br />for every application.</h2>
              <p>Quality tools matter. So do the clarity, responsiveness and support around them.</p>
            </div>
            <div className="about-values-list">
              {values.map(([title, description], index) => (
                <article className="about-value" key={title} data-reveal>
                  <span className="micro">0{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <span className="about-value-plus" aria-hidden="true">+</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about-mission" aria-label="Our vision and mission">
          <div className="about-panel about-panel-vision" data-reveal>
            <div className="panel-top"><span className="micro">Our vision</span><span>01 /</span></div>
            <h2>A trusted partner for industrial tools and supply solutions.</h2>
            <p>To become a trusted partner for industrial tools and supply solutions, helping businesses across India operate efficiently and confidently.</p>
            <span className="panel-geometry" aria-hidden="true" />
          </div>
          <div className="about-panel about-panel-mission" data-reveal>
            <div className="panel-top"><span className="micro">Our mission</span><span>02 /</span></div>
            <h2>Quality tools.<br />Responsive service.<br />Dependable support.</h2>
            <p>To source and supply quality industrial tools, equipment and accessories that meet customer requirements, backed by responsive service and dependable after-sales support.</p>
            <span className="panel-geometry" aria-hidden="true" />
          </div>
        </section>

        <section className="section about-strengths-section">
          <div className="shell">
            <Label number="03">Why Kailom House</Label>
            <div className="about-strengths-grid">
              <div className="about-strengths-copy" data-reveal>
                <h2>Support that stays close to the work.</h2>
                <p>
                  Our difference is not a long list of claims. It is the way we
                  keep the application in view—from the first question to the
                  supply requirement and beyond.
                </p>
                <a className="text-link" href="/#products">Explore our product range <Arrow /></a>
              </div>
              <div className="about-strengths-list">
                {strengths.map(([number, title, description]) => (
                  <article className="about-strength" key={number} data-reveal>
                    <span className="about-strength-number">{number}</span>
                    <div><h3>{title}</h3><p>{description}</p></div>
                    <Arrow />
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="about-cta" id="contact">
          <div className="shell about-cta-inner" data-reveal>
            <Label number="04">Start a conversation</Label>
            <h2>Let&apos;s build reliable<br /><span>assembly solutions.</span></h2>
            <div className="about-cta-bottom">
              <p>Connect with Kailom House for industrial tools, equipment, sourcing requirements and support.</p>
              <a className="button button-orange" href="mailto:sales.kailomhouse@gmail.com">Contact Kailom House <Arrow /></a>
              <div className="about-cta-contact">
                <span className="micro">Call us</span>
                <a href="tel:7457026443">7457026443</a>
                <a href="tel:8860425176">8860425176</a>
              </div>
            </div>
            <div className="contact-rule" aria-hidden="true" />
          </div>
        </section>
      </main>

      <SiteFooter menuOpen={menuOpen} />
    </>
  );
}
