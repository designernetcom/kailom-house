import Image from "next/image";

export const navItems = [
  ["Home", "https://www.paceassemblytools.com/"],
  ["About us", "/about"],
  ["Tools", "#products"],
  ["Industry 4.0", "#solutions"],
  ["Micro-Machines & Tools", "#products"],
  ["Training & Services", "#contact"],
  ["Contact Us", "https://www.paceassemblytools.com/contact-pat.php"],
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
      { label: "ENGRAVING TOOL / AIR SAW / FILER", href: "/tools/engraving-tools" },
    ],
  },
  {
    label: "Mountz (Tools & Torque Testers)",
    hasSubmenu: true,
    children: [
      { label: "Torque Analyzers & Sensors", href: "/tools/torque-analyzers" },
      "Power Assembly Tools",
      "Torque Wrenches",
    ],
  },
  {
    label: "Firebird (Pneumatic Tools)",
    hasSubmenu: true,
    children: ["Impact Wrenches", "Ratchet Wrenches", "Impact Drivers"],
  },
  { label: "FAR (Fastening Tools)", hasSubmenu: false },
  { label: "Torero (Oil Pulse Tools)", hasSubmenu: false },
] as const;

export const industryItems: readonly ToolItem[] = [
  {
    label: "KUKEN Japan (Nutrunners)",
    hasSubmenu: true,
    children: ["PTS", "KAC"],
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
