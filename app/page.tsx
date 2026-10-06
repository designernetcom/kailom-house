"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const asset = (name: string) => `/assets/img/all-images/${name}`;
const navItems = [
  ["Home", "#top"],
  ["About", "#about"],
  ["Products", "#products"],
  ["Solutions", "#solutions"],
  ["Clients", "#clients"],
  ["Contact", "#contact"],
];
const categories = [
  {
    title: "Electric Assembly Tools",
    description:
      "Electric screwdrivers for precision screw fastening and assembly applications",
    image: "kailom-electric-assembly-tools.png",
    tag: "Precision fastening",
  },
  {
    title: "Torque Testing",
    description: "Torque testers for checking the output of fastening tools",
    image: "kailom-torque-testing.png",
    tag: "Torque verification",
  },
  {
    title: "Torque Wrenches",
    description:
      "Flexible, industrial and interchangeable torque wrenches for tightening applications",
    image: "kailom-torque-wrenches.png",
    tag: "Reliable assembly",
  },
  {
    title: "Tooling & Accessories",
    description:
      "Bits, sockets and interchangeable inserts for different fastening requirements",
    image: "kailom-tooling-accessories.png",
    tag: "Application-based sourcing",
  },
];
const products = [
  { model: "OBT-50SH", type: "Straight assembly tool" },
  { model: "8KPD Series", type: "Pistol-grip assembly screwdriver" },
  { model: "PSM Series", type: "Pistol-grip fastening tool" },
  { model: "KJ 45 S", type: "Riveting tool" },
  { model: "Firebird FB-68D", type: "Pneumatic impact wrench" },
  { model: "OBT-70PD", type: "Pistol-grip assembly tool" },
];
const values = [
  [
    "Precision",
    "Quality industrial tools and equipment suitable for customer requirements.",
  ],
  [
    "Responsive service",
    "Responsive service supporting customer requirements.",
  ],
  [
    "Application-based sourcing",
    "Products sourced and procured according to requirements, specifications and applications.",
  ],
  [
    "After-sales support",
    "After-sales support, spares and replacement parts as required.",
  ],
];
const applications = [
  ["Precision fastening", "Tools for dependable assembly applications."],
  ["Industrial assembly", "Equipment matched to your requirements."],
  ["Torque verification", "Checking the output of fastening tools."],
  [
    "Component assembly",
    "Products sourced according to requirements, specifications and applications.",
  ],
  [
    "Tooling & accessories",
    "Bits, sockets and interchangeable inserts for different fastening requirements.",
  ],
  [
    "Replacement / support",
    "After-sales support, spares and replacement parts as required.",
  ],
];
const clients = [
  "Escorts",
  "Maruti Suzuki",
  "Fiat",
  "Bajaj",
  "Hero",
  "Honda",
  "Schneider Electric",
  "HAL",
  "BHEL",
  "Tata",
  "Isuzu",
  "JCB",
  "TMTL",
  "Ashok Leyland",
];

function Arrow({ down = false }: { down?: boolean }) {
  return (
    <svg
      className="arrow"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      style={down ? { rotate: "90deg" } : undefined}
    >
      <path d="M4 12h15M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
function Label({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <p className="section-label">
      <span>{number}</span>
      {children}
    </p>
  );
}
function Brand() {
  return (
    <a className="brand" href="#top" aria-label="Kailom House home">
      <span className="brand-art">
        <Image
          src="/assets/img/logo/kailom/kailom-logo-full.png"
          alt="Kailom"
          width={5680}
          height={3264}
          sizes="200px"
          loading="eager"
        />
      </span>
      <span>HOUSE / INDUSTRIAL TOOLS</span>
    </a>
  );
}
function ContactLinks() {
  return (
    <div className="contact-links">
      <div>
        <span className="micro">Call us</span>
        <a href="tel:7457026443">7457026443</a>
        <a href="tel:8860425176">8860425176</a>
      </div>
      <div>
        <span className="micro">Email us</span>
        <a href="mailto:sales.kailomhouse@gmail.com">
          sales.kailomhouse@gmail.com
        </a>
        <a href="mailto:kailom0712@gmail.com">kailom0712@gmail.com</a>
      </div>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [category, setCategory] = useState(0);
  const [product, setProduct] = useState<(typeof products)[number] | null>(
    null,
  );
  const heroRef = useRef<HTMLElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sentinel = document.querySelector(".header-sentinel");
    const headerObserver = new IntersectionObserver(([entry]) =>
      setScrolled(!entry.isIntersecting),
    );
    if (sentinel) headerObserver.observe(sentinel);
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => {
      el.classList.add("will-reveal");
      observer.observe(el);
    });
    return () => {
      observer.disconnect();
      headerObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!menuOpen && !product) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        menuRef.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", close);
    };
  }, [menuOpen, product]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1001px)");
    const close = () => {
      if (media.matches) setMenuOpen(false);
    };
    media.addEventListener("change", close);
    return () => media.removeEventListener("change", close);
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (
      !hero ||
      !window.matchMedia(
        "(pointer: fine) and (prefers-reduced-motion: no-preference)",
      ).matches
    )
      return;
    let frame = 0;
    const move = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bounds = hero.getBoundingClientRect();
        hero.style.setProperty(
          "--pan-x",
          `${(event.clientX / bounds.width - 0.5) * 7}px`,
        );
        hero.style.setProperty(
          "--pan-y",
          `${((event.clientY - bounds.top) / bounds.height - 0.5) * 5}px`,
        );
      });
    };
    const reset = () => {
      cancelAnimationFrame(frame);
      hero.style.setProperty("--pan-x", "0px");
      hero.style.setProperty("--pan-y", "0px");
    };
    hero.addEventListener("pointermove", move);
    hero.addEventListener("pointerleave", reset);
    return () => {
      cancelAnimationFrame(frame);
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("pointerleave", reset);
    };
  }, []);

  function openProduct(item: (typeof products)[number]) {
    setProduct(item);
    dialogRef.current?.showModal();
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div id="top" className="header-sentinel" aria-hidden="true" />
      <header
        className={`site-header ${scrolled ? "is-scrolled" : ""} ${menuOpen ? "menu-open" : ""}`}
      >
        <div className="shell header-inner">
          <Brand />
          <nav
            id="primary-nav"
            className={`nav ${menuOpen ? "is-open" : ""}`}
            aria-label="Primary navigation"
          >
            {navItems.map(([title, href]) => (
              <a key={title} href={href} onClick={() => setMenuOpen(false)}>
                {title}
              </a>
            ))}
            <a
              className="button button-orange mobile-cta"
              href="#contact"
              onClick={() => setMenuOpen(false)}
            >
              Enquire now <Arrow />
            </a>
          </nav>
          <a
            className="header-cta"
            href="#contact"
            onClick={() => setMenuOpen(false)}
          >
            Enquire now <Arrow />
          </a>
          <button
            ref={menuRef}
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="primary-nav"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <main id="main" inert={menuOpen}>
        <section ref={heroRef} className="hero" aria-labelledby="hero-title">
          <div className="hero-scene">
            <Image
              className="hero-photo"
              src={asset("kailom-hero-assembly.png")}
              alt="Industrial assembly workshop with a precision tool in use"
              fill
              sizes="100vw"
              preload
            />
          </div>
          <div className="hero-shade" />
          <div className="hero-guides" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="shell hero-inner">
            <div className="hero-topline">
              <p className="eyebrow">
                <i /> Precision × Engineering × Confidence
              </p>
              <span className="micro">Assembly systems / 01</span>
            </div>
            <h1
              id="hero-title"
              aria-label="Industrial Tools for Confident Assembly."
            >
              <span>Industrial Tools for</span>
              <span className="hero-confident">Confident</span>
              <span className="hero-assembly">
                Assembly<span className="title-period">.</span>
              </span>
            </h1>
            <div className="hero-lower">
              <div className="hero-intro">
                <p>
                  Precision industrial tools, equipment and sourcing solutions
                  for reliable assembly applications across India.
                </p>
                <div className="hero-actions">
                  <a className="button button-orange" href="#products">
                    Explore products <Arrow />
                  </a>
                  <a className="text-link" href="#contact">
                    Contact us <Arrow />
                  </a>
                </div>
              </div>
              <div className="hero-detail" aria-hidden="true">
                <span className="crosshair" />
                <span>
                  Application focused.
                  <br />
                  Precision at every step.
                </span>
              </div>
            </div>
            <div className="hero-bottom">
              <a href="#about">
                Scroll to explore <Arrow down />
              </a>
              <span>
                Kailom House <i /> Industrial tools & supply
              </span>
              <span className="hero-pagination">
                <b>01</b> / 06
              </span>
            </div>
          </div>
        </section>

        <div className="capability-strip" aria-label="Capabilities">
          <div className="shell">
            {[
              "Precision fastening",
              "Torque verification",
              "Reliable assembly",
              "After-sales support",
            ].map((title, index) => (
              <span key={title}>
                <i />
                {title}
                <small>0{index + 1}</small>
              </span>
            ))}
          </div>
        </div>

        <section className="section about-section" id="about">
          <div className="shell">
            <div className="about-introline">
              <Label number="01">About Kailom House</Label>
              <span className="micro">KAILOM / EST. INDUSTRIAL SUPPLY</span>
            </div>
            <div className="about-headline" data-reveal>
              <span className="about-index">01</span>
              <h2>
                Reliable supply
                <br />
                for the work
                <b> behind the work.</b>
              </h2>
              <p>
                Industrial tools, equipment and sourcing support shaped around
                your requirements, specifications and applications.
              </p>
            </div>
            <div className="about-editorial">
              <figure className="about-photo" data-reveal>
                <Image
                  src={asset("kailom-about-precision-workshop.png")}
                  alt="A focused mechanic using industrial assembly tools in a workshop"
                  fill
                  sizes="(max-width: 700px) 90vw, 48vw"
                />
                <figcaption>
                  <span>SUPPLY / SUPPORT / SOURCE</span>
                  <span>KH—01</span>
                </figcaption>
                <span className="about-photo-mark">
                  KAILOM
                  <br />
                  <b>HOUSE</b>
                </span>
              </figure>
              <div className="about-copy" data-reveal>
                <p className="about-copy-label">
                  WHO WE ARE <span>↘</span>
                </p>
                <p>
                  KAILOM HOUSE supplies and trades industrial tools, machinery,
                  equipment, hardware, electrical accessories and consumables
                  for industries and organisations across India.
                </p>
                <p>
                  We source and procure products according to our
                  customers&apos; requirements, specifications and applications.
                  We also provide after-sales support, spares and replacement
                  parts as required.
                </p>
                <a className="text-link" href="#contact">
                  Know more about us <Arrow />
                </a>
              </div>
            </div>
            <div className="about-rail" data-reveal>
              <span>
                <b>01</b> Source
              </span>
              <span>
                <b>02</b> Specify
              </span>
              <span>
                <b>03</b> Support
              </span>
              <span className="about-rail-note">
                Across India <i />
              </span>
            </div>
          </div>
        </section>

        <section className="section categories-section" id="products">
          <div className="shell">
            <Label number="02">The product experience</Label>
            <div className="section-heading" data-reveal>
              <h2>Assembly tools & torque testing.</h2>
              <p>
                Precision fastening.
                <br />
                Torque verification.
                <br />
                Reliable assembly.
              </p>
            </div>
            <div className="category-experience" data-reveal>
              <div
                className="category-visual"
                id="category-preview"
                role="region"
                aria-label={categories[category].title}
              >
                {categories.map((item, index) => (
                  <Image
                    key={item.title}
                    className={index === category ? "is-active" : ""}
                    src={asset(item.image)}
                    alt=""
                    fill
                    sizes="(max-width: 700px) 90vw, 48vw"
                  />
                ))}
                <div className="category-visual-shade" />
                <span className="micro category-image-label">
                  Industrial applications / 0{category + 1}
                </span>
                <div className="category-caption">
                  <span className="micro">{categories[category].tag}</span>
                  <h3>{categories[category].title}</h3>
                  <a className="text-link" href="#showcase">
                    Explore the catalogue <Arrow />
                  </a>
                </div>
                <span className="category-cross" aria-hidden="true">
                  +
                </span>
              </div>
              <div className="category-nav" aria-label="Product categories">
                {categories.map((item, index) => (
                  <button
                    type="button"
                    key={item.title}
                    className={`category-option ${index === category ? "is-active" : ""}`}
                    onMouseEnter={() => setCategory(index)}
                    onFocus={() => setCategory(index)}
                    onClick={() => setCategory(index)}
                    aria-pressed={index === category}
                    aria-controls="category-preview"
                  >
                    <span className="micro">0{index + 1}</span>
                    <span>
                      <strong>{item.title}</strong>
                      <span className="category-description">
                        {item.description}
                      </span>
                    </span>
                    <Arrow />
                  </button>
                ))}
                <p className="category-footnote">
                  Tools matched to your requirements.
                  <a
                    href="#contact"
                    aria-label="Discuss your tooling requirements"
                  >
                    <Arrow />
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section showcase-section" id="showcase">
          <div className="shell">
            <div className="catalogue-heading" data-reveal>
              <div>
                <p className="eyebrow orange-text">Selected from our range</p>
                <h2>Precision, by model.</h2>
              </div>
              <span className="micro">Featured tools / 06</span>
            </div>
            <div className="product-grid">
              {products.map((item, index) => (
                <button
                  type="button"
                  className={`product-entry product-${index + 1}`}
                  key={item.model}
                  onClick={() => openProduct(item)}
                  data-reveal
                  aria-label={`View product ${item.model}`}
                >
                  <span className="product-top">
                    <span className="micro">Assembly catalogue</span>
                    <span className="micro">0{index + 1}</span>
                  </span>
                  <span className="product-typography" aria-hidden="true">
                    {index === 0 ? (
                      <>
                        OBT<span>50SH</span>
                      </>
                    ) : (
                      item.model.split(" ")[0]
                    )}
                  </span>
                  <span className="product-info">
                    <span>
                      <span className="micro">Model</span>
                      <strong>{item.model}</strong>
                      <span className="product-type">{item.type}</span>
                    </span>
                    <span className="product-view">
                      View product <Arrow />
                    </span>
                  </span>
                </button>
              ))}
            </div>
            <p className="catalogue-note">
              Reliable fastening solutions for industrial assembly.
              <a className="text-link" href="#contact">
                Find the right tool <Arrow />
              </a>
            </p>
          </div>
        </section>

        <section className="precision-banner">
          {/* This full-bleed decorative image is intentionally unoptimized so it can paint immediately. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset("about-img4.png")}
            alt="Detail of wiring and components in an industrial assembly"
            className="precision-photo-image"
          />
          <div className="precision-overlay" />
          <div className="shell precision-inner" data-reveal>
            <p className="eyebrow">
              <i /> The Kailom approach
            </p>
            <h2>
              Engineered
              <br />
              for precision.
              <br />
              <span>Built for reliable assembly.</span>
            </h2>
            <div className="precision-bottom">
              <a className="text-link" href="#solutions">
                How we support <Arrow />
              </a>
              <span className="micro">
                Requirements. Specifications. Applications.
              </span>
            </div>
          </div>
          <span className="precision-ring" aria-hidden="true" />
        </section>

        <section className="section value-section" id="solutions">
          <div className="shell value-layout">
            <div className="value-heading" data-reveal>
              <Label number="03">Why Kailom House</Label>
              <h2>
                Supply that
                <br />
                stays close to
                <br />
                the application.
              </h2>
              <p>
                Focused on the requirements, specifications and applications
                that make each assembly job different.
              </p>
              <span className="value-mark" aria-hidden="true">
                KH / +
              </span>
            </div>
            <div className="value-list">
              {values.map(([title, description], index) => (
                <article className="value-row" key={title} data-reveal>
                  <span className="value-number">0{index + 1}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section applications-section">
          <div className="shell">
            <Label number="04">Applications</Label>
            <div className="section-heading" data-reveal>
              <h2>
                Tools matched to your
                <br />
                assembly requirements.
              </h2>
              <p>
                From fastening and torque verification to tooling, accessories
                and replacement requirements, the right supply starts with
                understanding the application.
              </p>
            </div>
            <div className="application-list">
              {applications.map(([title, description], index) => (
                <details className="application" key={title} data-reveal>
                  <summary>
                    <span className="micro">0{index + 1}</span>
                    <h3>{title}</h3>
                    <span className="application-plus" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <div className="application-description">
                    <p>{description}</p>
                    <a className="text-link" href="#contact">
                      Discuss your requirements <Arrow />
                    </a>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* <section className="section clients-section" id="clients">
          <div className="shell">
            <div className="client-heading" data-reveal>
              <Label number="05">Our valued clients</Label>
              <h2>
                Trusted by industry<span className="orange-text">.</span>
              </h2>
              <p>Supporting industrial assembly and fastening requirements.</p>
            </div>
            <div className="client-wall" data-reveal>
              {clients.map((client) => (
                <span key={client}>{client}</span>
              ))}
            </div>
          </div>
        </section> */}

        <section className="vision-section" aria-label="Vision and mission">
          <div className="vision-panel" data-reveal>
            <div className="panel-top">
              <span className="micro">Our vision</span>
              <span>01 /</span>
            </div>
            <h2>
              A trusted partner for industrial tools and supply solutions.
            </h2>
            <p>
              To become a trusted partner for industrial tools and supply
              solutions, helping businesses across India operate efficiently and
              confidently.
            </p>
            <span className="panel-geometry" aria-hidden="true" />
          </div>
          <div className="mission-panel" data-reveal>
            <div className="panel-top">
              <span className="micro">Our mission</span>
              <span>02 /</span>
            </div>
            <h2>
              Quality tools.
              <br />
              Responsive service.
              <br />
              Dependable support.
            </h2>
            <p>
              To source and supply quality industrial tools, equipment and
              accessories that meet customer requirements, backed by responsive
              service and dependable after-sales support.
            </p>
            <span className="panel-geometry" aria-hidden="true" />
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="shell">
            <Label number="06">Start a conversation</Label>
            <h2 data-reveal>
              Let&apos;s build reliable
              <br />
              <span>assembly solutions.</span>
            </h2>
            <div className="contact-bottom" data-reveal>
              <div>
                <p>
                  Connect with Kailom House for industrial tools, equipment,
                  sourcing requirements and support.
                </p>
                <a
                  className="button button-orange"
                  href="mailto:sales.kailomhouse@gmail.com"
                >
                  Contact Kailom House <Arrow />
                </a>
              </div>
              <ContactLinks />
            </div>
            <div className="contact-rule" aria-hidden="true" />
          </div>
        </section>
      </main>
      <footer className="site-footer" inert={menuOpen}>
        <div className="shell">
          <div className="footer-main">
            <Brand />
            <p>
              Industrial Tools for
              <br />
              Confident Assembly
            </p>
            <nav aria-label="Footer navigation">
              {navItems
                .filter(([title]) => title !== "Home")
                .map(([title, href]) => (
                  <a key={title} href={href}>
                    {title}
                  </a>
                ))}
            </nav>
            <a className="back-top" href="#top" aria-label="Back to top">
              <Arrow />
            </a>
          </div>
          <div className="footer-bottom">
            <span>© Kailom House. All rights reserved.</span>
            <span>www.kailomhouse.com</span>
            <span>Precision × Engineering × Confidence</span>
          </div>
        </div>
      </footer>

      <dialog
        ref={dialogRef}
        className="product-dialog"
        onClose={() => setProduct(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current?.close();
        }}
        aria-labelledby="product-dialog-title"
      >
        <div className="dialog-content">
          <button
            className="dialog-close"
            aria-label="Close product details"
            onClick={() => dialogRef.current?.close()}
          >
            ×
          </button>
          <p className="eyebrow orange-text">Kailom House / Featured tools</p>
          <h2 id="product-dialog-title">{product?.model}</h2>
          <p className="lead">{product?.type}</p>
          <p>
            Contact Kailom House to discuss this model and your requirements,
            specifications and application.
          </p>
          <a
            className="button button-orange"
            href={`mailto:sales.kailomhouse@gmail.com?subject=${encodeURIComponent(`Product enquiry: ${product?.model ?? ""}`)}`}
          >
            Enquire about this model <Arrow />
          </a>
          <a className="dialog-phone" href="tel:7457026443">
            Or call 7457026443 <Arrow />
          </a>
        </div>
      </dialog>
    </>
  );
}
