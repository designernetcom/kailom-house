import Image from "next/image";

export const navItems = [
  ["Home", "#top"],
  ["About", "/about"],
  ["Tools", "#products"],
  ["Solutions", "#solutions"],
  ["Clients", "#clients"],
  ["Contact", "#contact"],
] as const;

type ToolItem = {
  label: string;
  hasSubmenu: boolean;
  href?: string;
  children?: readonly (string | { label: string; href: string })[];
};

export const toolsItems: readonly ToolItem[] = [
  {
    label: "Kailom Tools",
    hasSubmenu: true,
    href: "/tools/impact-wrenches",
    children: [
      "IMPACT WRENCHES / RATCHET WRENCHES",
      { label: "AIR DRILLS", href: "/tools/air-drills" },
      { label: "ABRASIVE TOOLS", href: "/tools/abrasive-tools" },
      { label: "AIR RIVETERS / NUT SETTERS / AIR HAMMERS", href: "/tools/air-riveters" },
      "ENGRAVING TOOL / AIR SAW / FILER",
    ],
  },
  { label: "Airboss (Pneumatic Tools)", hasSubmenu: true },
  { label: "Mountz (Tools & Torque Testers)", hasSubmenu: true },
  { label: "Firebird (Pneumatic Tools)", hasSubmenu: true },
  { label: "TecnoGi (Torque Wrenches)", hasSubmenu: false },
  { label: "FAR (Fastening Tools)", hasSubmenu: false },
  { label: "Bosch (Power Tools)", hasSubmenu: false },
  { label: "Torero (Oil Pulse Tools)", hasSubmenu: false },
] as const;

export function Arrow({ down = false }: { down?: boolean }) {
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

export function Brand() {
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
