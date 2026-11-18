import Image from "next/image";

export const navItems = [
  ["Home", "/"],
  ["About us", "/about"],
  ["Tools", "#products"],
  ["Industry 4.0", "#solutions"],
  ["Micro-Machines & Tools", "#products"],
  ["Training & Services", "#contact"],
  ["Contact Us", "/contact"],
] as const;

type ToolItem = {
  label: string;
  hasSubmenu: boolean;
  href?: string;
  children?: readonly (string | ToolNode)[];
};

export type ToolNode = {
  label: string;
  href?: string;
  children?: readonly (string | ToolNode)[];
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
      { label: "ENGRAVING TOOL / AIR SAW / FILER", href: "/tools/engraving-tools" },
    ],
  },
  {
    label: "Mountz (Tools & Torque Testers)",
    hasSubmenu: true,
    children: [
      {
        label: "Torque Analyzers & Sensors",
        children: [
          { label: "Torque Analyzers", href: "/tools/torque-analyzers" },
          { label: "Torque Sensors", href: "/tools/torque-sensors" },
        ],
      },
      {
        label: "Power Assembly Tools",
        children: [
          { label: "Electric Screwdrivers", href: "/tools/electric-screwdrivers" },
          { label: "DC Control Tools", href: "/tools/dc-control-tools" },
        ],
      },
      {
        label: "Torque Wrenches",
        children: [
          { label: "Cam-Over Wrenches", href: "/tools/cam-over-wrenches" },
          { label: "Break-Over Wrenches", href: "/tools/break-over-wrenches" },
          { label: "Click Wrenches", href: "/tools/click-wrenches" },
        ],
      },
    ],
  },
  {
    label: "Firebird (Pneumatic Tools)",
    hasSubmenu: false,
    href: "/tools/firebird",
  },
  { label: "FAR (Fastening Tools)", hasSubmenu: false, href: "/tools/far-tools" },
  { label: "Torero (Oil Pulse Tools)", hasSubmenu: false, href: "/tools/torero-oil-pulse-tools" },
] as const;

export const industryItems: readonly ToolItem[] = [
  {
    label: "KUKEN Japan",
    hasSubmenu: false,
    href: "/tools/kuken-air-tools",
  },
  {
    label: "Nucmo Tools",
    hasSubmenu: true,
    children: ["Intelligent Tightening Control System", "Intelligent Counting Screwdriver"],
  },
  {
    label: "Torero Battery Tools",
    hasSubmenu: true,
    children: ["Clutch type screwdriver", "Electric Oil Pulse Tools"],
  },
  { label: "Conos", hasSubmenu: false },
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
