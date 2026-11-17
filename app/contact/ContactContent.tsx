"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { Arrow } from "../components/site-shared";

type FormState = {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  message: string;
};

const initialForm: FormState = {
  fullName: "",
  companyName: "",
  email: "",
  phone: "",
  message: "",
};

function Label({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <p className="section-label">
      <span>{number}</span>
      {children}
    </p>
  );
}

function ContactField({
  label,
  name,
  value,
  onChange,
  required = false,
  type = "text",
  textarea = false,
}: {
  label: string;
  name: keyof FormState;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
  textarea?: boolean;
}) {
  const fieldId = `contact-${name}`;

  return (
    <label className={`contact-page-field ${textarea ? "contact-page-field--full" : ""}`} htmlFor={fieldId}>
      <span>{label}{required ? <b aria-hidden="true"> *</b> : null}</span>
      {textarea ? (
        <textarea id={fieldId} name={name} rows={6} value={value} onChange={(event) => onChange(event.target.value)} required={required} />
      ) : (
        <input id={fieldId} name={name} type={type} value={value} onChange={(event) => onChange(event.target.value)} required={required} />
      )}
    </label>
  );
}

export default function ContactContent() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<"idle" | "error" | "ready">("idle");
  const menuRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setStatus("idle");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.fullName.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error");
      return;
    }

    const subject = `Kailom House enquiry from ${form.fullName.trim()}`;
    const body = [
      `Name: ${form.fullName.trim()}`,
      `Company: ${form.companyName.trim() || "Not provided"}`,
      `Email: ${form.email.trim()}`,
      `Phone: ${form.phone.trim() || "Not provided"}`,
      "",
      form.message.trim(),
    ].join("\n");

    setStatus("ready");
    window.location.href = `mailto:sales.kailomhouse@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <div className="contact-page">
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
        <section className="contact-page-hero" aria-labelledby="contact-page-title">
          <div className="shell">
            <div className="contact-page-breadcrumb"><a href="/">Home</a><span>/</span><span>Contact Us</span></div>
            <div className="contact-page-hero-grid">
              <div>
                <p className="eyebrow orange-text"><i /> Kailom House / Contact</p>
                <h1 id="contact-page-title">Let&apos;s build reliable<br /><span>assembly solutions.</span></h1>
                <p className="contact-page-hero-copy">Tell us what the application requires. We can help with industrial tools, torque testing, pneumatic equipment, accessories, sourcing and after-sales support.</p>
              </div>
              <div className="contact-page-hero-mark" aria-hidden="true"><span>KH</span><strong>06</strong><small>Start a conversation</small></div>
            </div>
          </div>
        </section>

        <section className="contact-page-body section" id="contact" aria-labelledby="contact-form-title">
          <div className="shell contact-page-grid">
            <aside className="contact-page-info">
              <Label number="01">Contact details</Label>
              <h2>Keep the requirement<br /><em>in view.</em></h2>
              <p>Share a model number, specification, quantity or application. The more context you provide, the easier it is to identify the right solution.</p>
              <div className="contact-page-methods">
                <div><span className="micro">Call us</span><a href="tel:7457026443">7457026443</a><a href="tel:8860425176">8860425176</a></div>
                <div><span className="micro">Email us</span><a href="mailto:sales.kailomhouse@gmail.com">sales.kailomhouse@gmail.com</a><a href="mailto:kailom0712@gmail.com">kailom0712@gmail.com</a></div>
              </div>
              <a className="contact-page-whatsapp" href="https://wa.me/917457026443" target="_blank" rel="noopener noreferrer">Message on WhatsApp <Arrow /></a>
            </aside>

            <div className="contact-page-form-panel">
              <div className="contact-page-form-heading"><Label number="02">Your requirement</Label><h2 id="contact-form-title">How can we help?</h2><p>Complete the form and your email app will open with the enquiry ready to send to our team.</p></div>
              <form className="contact-page-form" onSubmit={handleSubmit} noValidate>
                <div className="contact-page-form-grid">
                  <ContactField label="Full Name" name="fullName" value={form.fullName} onChange={(value) => updateField("fullName", value)} required />
                  <ContactField label="Company Name" name="companyName" value={form.companyName} onChange={(value) => updateField("companyName", value)} />
                  <ContactField label="Email Address" name="email" type="email" value={form.email} onChange={(value) => updateField("email", value)} required />
                  <ContactField label="Phone Number" name="phone" type="tel" value={form.phone} onChange={(value) => updateField("phone", value)} />
                  <ContactField label="Message / Requirements" name="message" value={form.message} onChange={(value) => updateField("message", value)} required textarea />
                </div>
                {status === "error" ? <p className="contact-page-status contact-page-status--error" role="alert">Please add your name, email address and requirements before sending.</p> : null}
                {status === "ready" ? <p className="contact-page-status" role="status">Your enquiry is ready in your email app.</p> : null}
                <button className="button button-orange" type="submit">Prepare enquiry <Arrow /></button>
              </form>
            </div>
          </div>
        </section>

        <section className="contact-page-footer-band" aria-label="Contact support note"><div className="shell"><span className="micro">Kailom House / Industrial tools for confident assembly</span><p>Requirements. Specifications. Applications.</p><a href="/#products">Explore the product range <Arrow /></a></div></section>
      </main>
      <SiteFooter menuOpen={menuOpen} />
    </div>
  );
}
