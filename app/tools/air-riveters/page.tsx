"use client";

import { useEffect, useRef, useState } from "react";
import AirRivetersSection from "../../components/AirRivetersSection";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";

export default function AirRivetersPage() {
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
    <div className="catalogue-page air-riveters-page">
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
        <AirRivetersSection />
      </main>

      <SiteFooter menuOpen={menuOpen} />
    </div>
  );
}
