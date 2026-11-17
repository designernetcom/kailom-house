"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import { Arrow } from "./site-shared";

export type ProductImage = {
  src: string;
  alt: string;
};

export type ProductSpecification = {
  label: string;
  value: string;
};

export type ProductDetail = {
  slug: string;
  sharePath?: string;
  model: string;
  name: string;
  tagline?: string;
  brand: string;
  category: string;
  categoryHref: string;
  description: string;
  images: readonly ProductImage[];
  features: readonly string[];
  specifications: readonly ProductSpecification[];
  technicalNotes: readonly string[];
};

type ShareChannel = "whatsapp" | "facebook" | "x" | "email" | "pinterest";

function FeatureIcon() {
  return (
    <svg className="product-feature-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m5 12.5 4.2 4.2L19 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg className="product-info-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 10.6v5.1M12 7.4v.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ShareGlyph({ channel }: { channel: ShareChannel }) {
  const glyphs: Record<ShareChannel, string> = {
    whatsapp: "WA",
    facebook: "f",
    x: "𝕏",
    email: "@",
    pinterest: "P",
  };

  return <span className={`product-share-glyph product-share-glyph--${channel}`} aria-hidden="true">{glyphs[channel]}</span>;
}

function ProductBreadcrumb({ product }: { product: ProductDetail }) {
  return (
    <nav className="product-breadcrumb" aria-label="Breadcrumb">
      <Link href="/">Home</Link>
      <span aria-hidden="true">/</span>
      <Link href="/#products">Products</Link>
      <span aria-hidden="true">/</span>
      <span>{product.brand}</span>
      <span aria-hidden="true">/</span>
      <Link href={product.categoryHref}>{product.category}</Link>
      <span aria-hidden="true">/</span>
      <span aria-current="page">{product.model}</span>
    </nav>
  );
}

function ProductImageGallery({ product }: { product: ProductDetail }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const image = product.images[selectedImage] ?? product.images[0];

  return (
    <div className="product-detail-gallery">
      <div className="product-detail-image-frame">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 48vw"
            className="product-detail-image"
          />
        ) : (
          <div className="product-detail-image-placeholder">
            <span>Product image pending</span>
            <small>Model-specific asset not supplied</small>
          </div>
        )}
        <span className="product-detail-image-index" aria-hidden="true">{String(selectedImage + 1).padStart(2, "0")}</span>
      </div>

      {product.images.length > 1 ? (
        <div className="product-detail-thumbnails" aria-label="Product image thumbnails">
          {product.images.map((thumbnail, index) => (
            <button
              className={`product-detail-thumbnail ${selectedImage === index ? "is-selected" : ""}`}
              type="button"
              key={thumbnail.src}
              aria-label={`View product image ${index + 1}`}
              aria-pressed={selectedImage === index}
              onClick={() => setSelectedImage(index)}
            >
              <Image src={thumbnail.src} alt="" fill sizes="88px" className="product-detail-thumbnail-image" />
            </button>
          ))}
        </div>
      ) : null}

      <p className="product-detail-image-caption">Kailom House / {product.model} product image</p>
    </div>
  );
}

function ProductShare({ product }: { product: ProductDetail }) {
  const shareUrl = product.sharePath ?? `/tools/impact-wrenches/${product.slug}`;
  const shareText = `${product.name} (${product.model})`;
  const shareLinks: { channel: ShareChannel; label: string; href: string; external: boolean }[] = [
    {
      channel: "whatsapp",
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`,
      external: true,
    },
    {
      channel: "facebook",
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      external: true,
    },
    {
      channel: "x",
      label: "X",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      external: true,
    },
    {
      channel: "email",
      label: "Email",
      href: `mailto:?subject=${encodeURIComponent(`${shareText} | Kailom House`)}&body=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`,
      external: false,
    },
    {
      channel: "pinterest",
      label: "Pinterest",
      href: `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&description=${encodeURIComponent(shareText)}`,
      external: true,
    },
  ];

  return (
    <div className="product-share" aria-label="Share this product">
      <span className="product-share-label">Share:</span>
      <div className="product-share-links">
        {shareLinks.map((share) => (
          <a
            href={share.href}
            key={share.channel}
            target={share.external ? "_blank" : undefined}
            rel={share.external ? "noopener noreferrer" : undefined}
            aria-label={`Share ${product.name} on ${share.label}`}
          >
            <ShareGlyph channel={share.channel} />
            <span>{share.label}</span>
          </a>
        ))}
        <button type="button" onClick={() => window.print()} aria-label="Print this product page">
          <span className="product-share-glyph" aria-hidden="true">↗</span>
          <span>Print</span>
        </button>
      </div>
    </div>
  );
}

function ProductFeatures({ features }: { features: readonly string[] }) {
  return (
    <ul className="product-feature-list">
      {features.map((feature) => (
        <li key={feature}>
          <FeatureIcon />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );
}

function ProductOverview({ product }: { product: ProductDetail }) {
  return (
    <section className="product-detail-overview" aria-labelledby="product-title">
      <div className="shell product-overview-grid">
        <ProductImageGallery product={product} />
        <div className="product-overview-info">
          <p className="product-category-label"><i /> {product.brand} {product.category}</p>
          <h1 id="product-title">{product.name}</h1>
          <p className="product-model">Model No. <span>—</span> <strong>{product.model}</strong></p>
          <span className="product-name-tag">{product.tagline ?? product.name}</span>
          <p className="product-introduction">{product.description}</p>

          <div className="product-overview-block">
            <p className="product-overview-label">Product features</p>
            <ProductFeatures features={product.features} />
          </div>

          <a className="button button-orange product-quote-button" href="#request-quote">
            Request a Quote <Arrow />
          </a>
          <ProductShare product={product} />
        </div>
      </div>
    </section>
  );
}

function ProductDescription({ product }: { product: ProductDetail }) {
  return (
    <section className="product-description-section" aria-labelledby="product-description-title">
      <div className="shell product-description-inner">
        <div className="product-section-heading">
          <p className="section-label"><span>01</span> Product overview</p>
          <h2 id="product-description-title">Product Description</h2>
        </div>
        <div className="product-description-copy">
          <p>{product.description}</p>
          <ProductFeatures features={product.features} />
        </div>
      </div>
    </section>
  );
}

function ProductSpecifications({ product }: { product: ProductDetail }) {
  return (
    <section className="product-specifications-section" aria-labelledby="technical-specifications-title">
      <div className="shell">
        <div className="product-section-heading product-specifications-heading">
          <p className="section-label"><span>02</span> Product data</p>
          <h2 id="technical-specifications-title">Technical Specifications</h2>
          <p className="product-specification-subheading">{product.model} — {product.name}</p>
        </div>
        <div className="product-specifications-table-wrap">
          <table className="product-specifications-table">
            <thead>
              <tr>
                <th scope="col">Specification</th>
                <th scope="col">Value</th>
              </tr>
            </thead>
            <tbody>
              {product.specifications.map((specification) => (
                <tr key={specification.label}>
                  <th scope="row">{specification.label}</th>
                  <td>{specification.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="product-technical-notes" aria-label="Technical notes">
          {product.technicalNotes.map((note) => (
            <p key={note}><InfoIcon /> <em>{note}</em></p>
          ))}
        </div>
      </div>
    </section>
  );
}

type QuoteField = "fullName" | "companyName" | "email" | "phone" | "quantity" | "message";
type FieldErrors = Partial<Record<QuoteField, string>>;
type FormStatus = "idle" | "submitting" | "success" | "error";

function getFormValue(formData: FormData, field: QuoteField) {
  const value = formData.get(field);
  return typeof value === "string" ? value.trim() : "";
}

function validateQuoteForm(formData: FormData): FieldErrors {
  const errors: FieldErrors = {};
  const fullName = getFormValue(formData, "fullName");
  const email = getFormValue(formData, "email");
  const phone = getFormValue(formData, "phone");
  const message = getFormValue(formData, "message");

  if (!fullName) errors.fullName = "Please enter your full name.";
  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!phone) {
    errors.phone = "Please enter your phone number.";
  } else if (!/^[+()\d\s-]{7,20}$/.test(phone)) {
    errors.phone = "Enter a valid phone number.";
  }
  if (!message) errors.message = "Please tell us what you need.";

  return errors;
}

function ProductQuoteForm({ product }: { product: ProductDetail }) {
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const errors = validateQuoteForm(formData);
    setFieldErrors(errors);
    setStatusMessage("");

    if (Object.keys(errors).length > 0) {
      setStatus("error");
      return;
    }

    setStatus("submitting");

    // Product pages are intentionally frontend-only during the static catalogue phase.
    // The validated form state is kept ready for the future enquiry API integration.
    setStatus("success");
    setStatusMessage("Your enquiry is ready. Online delivery will be connected in the next phase.");
    form.reset();
  }

  return (
    <section className="product-quote-section" id="request-quote" aria-labelledby="request-quote-title">
      <div className="shell product-quote-grid">
        <div className="product-quote-context">
          <p className="section-label"><span>03</span> Enquiry</p>
          <h2 id="request-quote-title">Request a Quote</h2>
          <p>Interested in the {product.name}? Send us your requirements and our team will get in touch with you.</p>
          <div className="product-quote-product">
            <div className="product-quote-thumbnail">
              {product.images[0] ? <Image src={product.images[0].src} alt="" fill sizes="128px" className="product-quote-thumbnail-image" /> : <span className="product-quote-thumbnail-placeholder">Image pending</span>}
            </div>
            <div>
              <strong>{product.name}</strong>
              <span>Model No. {product.model}</span>
              <span>{product.brand} {product.category}</span>
            </div>
          </div>
          <p className="product-quote-instruction">Tell us about your quantity, delivery requirements or technical questions and we will take it from there.</p>
        </div>

        <form className="product-quote-form" onSubmit={handleSubmit} noValidate>
          <div className="product-form-grid">
            <FormField label="Full Name" name="fullName" required error={fieldErrors.fullName} />
            <FormField label="Company Name" name="companyName" error={fieldErrors.companyName} />
            <FormField label="Email Address" name="email" type="email" required error={fieldErrors.email} />
            <FormField label="Phone Number" name="phone" type="tel" required error={fieldErrors.phone} />
            <FormField label="Quantity Required" name="quantity" type="number" min="1" error={fieldErrors.quantity} />
            <FormField label="Message / Requirements" name="message" required error={fieldErrors.message} textarea />
          </div>
          <p className="product-form-note">Product details are attached automatically: {product.brand} / {product.model} / {product.category}.</p>
          {statusMessage ? (
            <p className={`product-form-status product-form-status--${status}`} role={status === "error" ? "alert" : "status"} aria-live="polite">
              {statusMessage}
            </p>
          ) : null}
          <button className="button button-orange product-form-submit" type="submit" disabled={status === "submitting"}>
            {status === "submitting" ? "Sending..." : "Send Enquiry"}
            <Arrow />
          </button>
        </form>
      </div>
    </section>
  );
}

function FormField({
  label,
  name,
  type = "text",
  required = false,
  error,
  textarea = false,
  min,
}: {
  label: string;
  name: QuoteField;
  type?: string;
  required?: boolean;
  error?: string;
  textarea?: boolean;
  min?: string;
}) {
  const errorId = `${name}-error`;
  const fieldProps = {
    id: name,
    name,
    required,
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? errorId : undefined,
  };

  return (
    <label className={`product-form-field ${textarea ? "product-form-field--full" : ""}`} htmlFor={name}>
      <span>{label}{required ? <b aria-hidden="true"> *</b> : null}</span>
      {textarea ? (
        <textarea {...fieldProps} rows={5} />
      ) : (
        <input {...fieldProps} type={type} min={min} />
      )}
      {error ? <small id={errorId}>{error}</small> : null}
    </label>
  );
}

export default function ProductDetailPage({ product }: { product: ProductDetail }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    mpn: product.model,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    category: product.category,
    description: product.description,
    image: product.images.map((image) => image.src),
    url: product.sharePath ?? `/tools/impact-wrenches/${product.slug}`,
  };
  const productPath = product.sharePath ?? `/tools/impact-wrenches/${product.slug}`;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Products", item: "/#products" },
      { "@type": "ListItem", position: 3, name: product.brand, item: product.categoryHref },
      { "@type": "ListItem", position: 4, name: product.category, item: product.categoryHref },
      { "@type": "ListItem", position: 5, name: product.model, item: productPath },
    ],
  };

  return (
    <div className="product-detail-page">
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
        <div className="shell product-detail-breadcrumb-wrap">
          <ProductBreadcrumb product={product} />
        </div>
        <ProductOverview product={product} />
        <ProductDescription product={product} />
        <ProductSpecifications product={product} />
        <ProductQuoteForm product={product} />
        <div className="shell product-back-link-wrap">
          <Link className="product-back-link" href={product.categoryHref}>
            <Arrow down /> Back to {product.category}
          </Link>
        </div>
      </main>

      <SiteFooter menuOpen={menuOpen} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </div>
  );
}
