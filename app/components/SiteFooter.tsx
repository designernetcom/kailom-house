"use client";

import { Arrow, Brand, navItems } from "./site-shared";
import { usePathname } from "next/navigation";

export default function SiteFooter({ menuOpen }: { menuOpen: boolean }) {
  const pathname = usePathname();
  const getHref = (href: string) => {
    if (pathname === "/") return href;
    if (href === "#top") return "/";
    if (href === "#about") return "/about";
    return `/${href}`;
  };

  return (
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
                  <a key={title} href={getHref(href)}>
                  {title}
                </a>
              ))}
          </nav>
          <a className="back-top" href="#top" aria-label="Back to top">
            <Arrow />
          </a>
        </div>
        <div className="footer-bottom">
          <span>
            © Kailom House. All Rights Reserved. Designed &amp; Developed By{" "}
            <a href="https://www.netcom-india.com/index.html">
              Netcom Business Solutions Pvt Ltd
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
