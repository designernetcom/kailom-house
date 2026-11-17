"use client";

import type { RefObject } from "react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Arrow, Brand, industryItems, navItems, toolsItems, type ToolNode } from "./site-shared";

type SiteHeaderProps = {
  menuOpen: boolean;
  scrolled: boolean;
  menuRef: RefObject<HTMLButtonElement | null>;
  onMenuToggle: () => void;
  onNavigate: () => void;
  solid?: boolean;
};

export default function SiteHeader({
  menuOpen,
  scrolled,
  menuRef,
  onMenuToggle,
  onNavigate,
  solid = false,
}: SiteHeaderProps) {
  const pathname = usePathname();
  const [toolsOpen, setToolsOpen] = useState(false);
  const [openToolsPath, setOpenToolsPath] = useState<string[]>([]);
  const [industryOpen, setIndustryOpen] = useState(false);
  const [openIndustryItem, setOpenIndustryItem] = useState<string | null>(null);
  const getHref = (href: string) => {
    if (/^https?:\/\//.test(href)) return href;
    if (href.startsWith("/")) return href;
    if (pathname === "/") return href;
    if (href === "#top") return "/";
    if (href === "#about") return "/about";
    return `/${href}`;
  };

  const closeNavigation = () => {
    setToolsOpen(false);
    setOpenToolsPath([]);
    setIndustryOpen(false);
    setOpenIndustryItem(null);
    onNavigate();
  };

  const renderToolsSubmenu = (
    children: readonly (string | ToolNode)[],
    parentLabel: string,
    parentHref: string,
    parentPath: readonly string[],
  ): React.ReactNode => (
    <div className="tools-submenu" aria-label={`${parentLabel} product list`}>
      {children.map((child) => {
        const node = typeof child === "string" ? { label: child } : child;
        const hasChildren = Boolean(node.children?.length);
        const itemHref = node.href ?? parentHref;
        const itemPath = [...parentPath, node.label];
        const itemOpen = hasChildren && itemPath.every((segment, index) => openToolsPath[index] === segment);

        return (
          <div key={node.label} className={`tools-option ${itemOpen ? "is-open" : ""}`}>
            <a
              href={getHref(itemHref)}
              aria-haspopup={hasChildren ? "true" : undefined}
              aria-expanded={hasChildren ? itemOpen : undefined}
              onClick={(event) => {
                if (!hasChildren) {
                  closeNavigation();
                  return;
                }

                event.preventDefault();
                setOpenToolsPath(itemOpen ? [...parentPath] : itemPath);
              }}
            >
              <span>{node.label}</span>
              {hasChildren ? <span className="tools-option-arrow" aria-hidden="true">{"\u203a"}</span> : null}
            </a>
            {hasChildren ? renderToolsSubmenu(node.children!, node.label, itemHref, itemPath) : null}
          </div>
        );
      })}
    </div>
  );

  return (
    <header
      className={`site-header ${scrolled || solid ? "is-scrolled" : ""} ${solid ? "solid" : ""} ${menuOpen ? "menu-open" : ""}`}
    >
      <div className="shell header-inner">
        <Brand />
        <nav
          id="primary-nav"
          className={`nav ${menuOpen ? "is-open" : ""}`}
          aria-label="Primary navigation"
        >
          {navItems.map(([title, href]) =>
            title === "Tools" ? (
              <div className={`nav-tools ${toolsOpen ? "tools-open" : ""}`} key={title}>
                <a
                  href={getHref(href)}
                  aria-haspopup="true"
                  aria-expanded={toolsOpen}
                  onClick={(event) => {
                    event.preventDefault();
                    setToolsOpen((open) => !open);
                    setOpenToolsPath([]);
                    setIndustryOpen(false);
                    setOpenIndustryItem(null);
                  }}
                >
                  {title}
                </a>
                <div className="tools-options" aria-label="Tools product list">
                  {toolsItems.map((item) => {
                    const hasChildren = Boolean(item.children?.length);
                    const itemHref = item.href ?? href;

                    return (
                      <div
                        key={item.label}
                        className={`tools-option ${hasChildren && openToolsPath[0] === item.label ? "is-open" : ""}`}
                      >
                        <a
                          href={getHref(itemHref)}
                          aria-haspopup={hasChildren ? "true" : undefined}
                          aria-expanded={hasChildren ? openToolsPath[0] === item.label : undefined}
                          onClick={(event) => {
                            if (!hasChildren) {
                              closeNavigation();
                              return;
                            }

                            event.preventDefault();
                            setOpenToolsPath((openPath) => openPath[0] === item.label ? [] : [item.label]);
                          }}
                        >
                          <span>{item.label}</span>
                          {item.hasSubmenu ? <span className="tools-option-arrow" aria-hidden="true">{"\u203a"}</span> : null}
                        </a>
                        {hasChildren ? renderToolsSubmenu(item.children!, item.label, itemHref, [item.label]) : null}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : title === "Industry 4.0" ? (
              <div className={`nav-tools ${industryOpen ? "tools-open" : ""}`} key={title}>
                <a
                  href={getHref(href)}
                  aria-haspopup="true"
                  aria-expanded={industryOpen}
                  onClick={(event) => {
                    event.preventDefault();
                    setIndustryOpen((open) => !open);
                    setOpenIndustryItem(null);
                    setToolsOpen(false);
                    setOpenToolsPath([]);
                  }}
                >
                  {title}
                </a>
                <div className="tools-options" aria-label="Industry 4.0 product list">
                  {industryItems.map((item) => {
                    const hasChildren = Boolean(item.children?.length);
                    const itemHref = item.href ?? href;
                    const itemOpen = hasChildren && openIndustryItem === item.label;

                    return (
                      <div key={item.label} className={`tools-option ${itemOpen ? "is-open" : ""}`}>
                        <a
                          href={getHref(itemHref)}
                          aria-haspopup={hasChildren ? "true" : undefined}
                          aria-expanded={hasChildren ? itemOpen : undefined}
                          onClick={(event) => {
                            if (!hasChildren) {
                              closeNavigation();
                              return;
                            }

                            event.preventDefault();
                            setOpenIndustryItem((openItem) => openItem === item.label ? null : item.label);
                          }}
                        >
                          <span>{item.label}</span>
                          {item.hasSubmenu ? <span className="tools-option-arrow" aria-hidden="true">{"\u203a"}</span> : null}
                        </a>
                        {hasChildren ? (
                          <div className="tools-submenu" aria-label={`${item.label} product list`}>
                            {item.children?.map((child) => {
                              const childLabel = typeof child === "string" ? child : child.label;
                              const childHref = typeof child === "string" ? itemHref : child.href ?? itemHref;

                              return (
                                <a key={childLabel} href={getHref(childHref)} onClick={closeNavigation}>
                                  {childLabel}
                                </a>
                              );
                            })}
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <a key={title} href={getHref(href)} onClick={closeNavigation}>{title}</a>
            ),
          )}
          <a className="button button-orange mobile-cta" href="#contact" onClick={closeNavigation}>
            Enquire now <Arrow />
          </a>
        </nav>
        <a className="header-cta" href="#contact" onClick={onNavigate}>
          Enquire now <Arrow />
        </a>
        <button
          ref={menuRef}
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={onMenuToggle}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
