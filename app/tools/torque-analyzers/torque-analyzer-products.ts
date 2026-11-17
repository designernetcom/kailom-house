export type TorqueAnalyzerSpecification = {
  label: string;
  value: string;
};

export type TorqueAnalyzerProduct = {
  slug: string;
  name: string;
  category: string;
  image: string;
  imageAlt: string;
  description: string;
  specifications: readonly TorqueAnalyzerSpecification[];
  highlight: string;
  analyzerType: string;
  torqueRange: string;
  connectivity: string;
  applications: string;
};

export const torqueAnalyzerProducts: readonly TorqueAnalyzerProduct[] = [
  {
    slug: "ez-torq-iii",
    name: "EZ-TORQ III",
    category: "Small Torque Analyzer",
    image: "https://www.paceassemblytools.com/images/mountz/torque-analyzers/eztoriii_01.mainview.jpg",
    imageAlt: "Mountz EZ-TORQ III torque analyzer",
    description:
      "With a built-in transducer, this compact torque analyzer is ideal for small hand screwdrivers, wrenches, and power tools.",
    specifications: [
      { label: "Torque Range", value: "1 - 300 lbf.in" },
      { label: "Metric Range", value: "11.3 - 3390 cN.m" },
      { label: "Transducer", value: "Built-in transducer" },
      { label: "Tool Fit", value: "Small hand screwdrivers, wrenches and power tools" },
    ],
    highlight: "Compact Torque Testing Solution",
    analyzerType: "Small torque analyzer",
    torqueRange: "1 - 300 lbf.in / 11.3 - 3390 cN.m",
    connectivity: "Built-in transducer",
    applications: "Small hand screwdrivers, wrenches and power tools",
  },
  {
    slug: "torquelab-ltt-series",
    name: "TORQUELAB LTT-SERIES",
    category: "Torque Analyzer with Built-in Transducer",
    image: "https://www.paceassemblytools.com/images/mountz/torque-analyzers/lttthumbnail.jpg",
    imageAlt: "Mountz TorqueLab LTT-Series torque analyzer",
    description:
      "Torque analyzers with a built-in transducer, designed for testing wrenches, screwdrivers, and power tools. These analyzers can also connect to external torque sensors.",
    specifications: [
      { label: "Torque Range", value: "1 lbf.in - 250 lbf.ft" },
      { label: "Metric Range", value: "113 cN.m - 339 N.m" },
      { label: "Transducer", value: "Built-in transducer" },
      { label: "Connectivity", value: "External torque sensor connectivity" },
      { label: "Tool Fit", value: "Wrenches, screwdrivers and power tools" },
    ],
    highlight: "Advanced Torque Measurement",
    analyzerType: "Torque analyzer with built-in transducer",
    torqueRange: "1 lbf.in - 250 lbf.ft / 113 cN.m - 339 N.m",
    connectivity: "Built-in transducer + external sensor connectivity",
    applications: "Wrenches, screwdrivers and power tools",
  },
  {
    slug: "torquemate-ptt-series",
    name: "TORQUEMATE PTT-SERIES",
    category: "Portable Hand-Held Torque & Angle Analyzer",
    image: "https://www.paceassemblytools.com/images/mountz/torque-analyzers/pttthumbnail.jpg",
    imageAlt: "Mountz TorqueMate PTT-Series portable torque and angle analyzer",
    description:
      "A portable hand-held torque and angle tester that connects to torque sensors. Designed for testing power tools, screwdrivers, and wrenches.",
    specifications: [
      { label: "Design", value: "Portable hand-held design" },
      { label: "Measurement", value: "Torque and angle measurement" },
      { label: "Connectivity", value: "Connects to external torque sensors" },
      { label: "Tool Fit", value: "Power tools, screwdrivers and wrenches" },
    ],
    highlight: "Portable Torque & Angle Testing",
    analyzerType: "Portable hand-held torque & angle analyzer",
    torqueRange: "Not specified",
    connectivity: "External torque sensor connectivity",
    applications: "Power tools, screwdrivers and wrenches",
  },
  {
    slug: "validator",
    name: "VALIDATOR",
    category: "Torque Wrench Tester",
    image: "https://www.paceassemblytools.com/images/mountz/torque-analyzers/validatorthumbnail.jpg",
    imageAlt: "Mountz Validator torque wrench tester",
    description:
      "A dedicated torque wrench tester designed for calibrating and verifying torque wrenches to help maintain measurement accuracy and quality control.",
    specifications: [
      { label: "Torque Range", value: "40 - 200 lbf.ft" },
      { label: "Metric Range", value: "54.4 - 272 N.m" },
      { label: "Testing", value: "Designed for torque wrench testing" },
      { label: "Purpose", value: "Supports calibration and verification" },
    ],
    highlight: "Torque Wrench Calibration & Verification",
    analyzerType: "Torque wrench tester",
    torqueRange: "40 - 200 lbf.ft / 54.4 - 272 N.m",
    connectivity: "Torque wrench testing",
    applications: "Torque wrench calibration and verification",
  },
  {
    slug: "mts-series",
    name: "MTS-SERIES",
    category: "Mountz Torque Analyzer",
    image: "https://www.paceassemblytools.com/images/mountz/torque-analyzers/mtsthumbnail.jpg",
    imageAlt: "Mountz MTS-Series torque analyzer",
    description:
      "A torque analyzer designed for testing small hand screwdrivers and wrenches.",
    specifications: [
      { label: "Torque Range", value: "10 ozf.in - 220 lbf.in" },
      { label: "Metric Range", value: "26 cN.m - 25 N.m" },
      { label: "Design", value: "Designed for small hand screwdrivers" },
      { label: "Tool Fit", value: "Suitable for wrench testing" },
    ],
    highlight: "Precision Testing for Small Tools",
    analyzerType: "Mountz torque analyzer",
    torqueRange: "10 ozf.in - 220 lbf.in / 26 cN.m - 25 N.m",
    connectivity: "Torque analyzer",
    applications: "Small hand screwdrivers and wrenches",
  },
] as const;
