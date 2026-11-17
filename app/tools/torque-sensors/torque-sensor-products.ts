export type TorqueSensorProduct = {
  slug: string;
  model: string;
  name: string;
  image: string;
  imageAlt: string;
  description: string;
  sensorType: string;
  torqueRange: string;
  application: string;
  highlight: string;
};

const imageBase = "https://www.paceassemblytools.com/images/mountz/torque-sensors";

export const torqueSensorProducts: readonly TorqueSensorProduct[] = [
  {
    slug: "mtx",
    model: "MTX",
    name: "MTX Low Torque Reaction Sensors",
    image: `${imageBase}/mtxthumbnail.jpg`,
    imageAlt: "Mountz MTX low torque reaction sensor",
    description:
      "For calibrating and measuring small hand screwdrivers, wrenches, and power tools, a low torque reaction sensor is used.",
    sensorType: "Low torque reaction sensor",
    torqueRange: "1 - 160 OZF.in",
    application: "Small hand screwdrivers, wrenches and power tools",
    highlight: "Low torque calibration",
  },
  {
    slug: "bmx",
    model: "BMX",
    name: "BMX Torque Reaction Sensor",
    image: `${imageBase}/bmxthumbnail.jpg`,
    imageAlt: "Mountz BMX torque reaction sensor",
    description:
      "Torque reaction sensor for calibrating and testing hand screwdrivers, wrenches and power tools.",
    sensorType: "Torque reaction sensor",
    torqueRange: "2 OZF.in - 5,000 LBF.ft",
    application: "Hand screwdrivers, wrenches and power tools",
    highlight: "Wide-range reaction testing",
  },
  {
    slug: "blrtsx-a",
    model: "BLRTSX-A",
    name: "BLRTSX-A Brushless Rotary Torque & Angle Sensors",
    image: `${imageBase}/rotarysensorblrtsathumbnail.jpg`,
    imageAlt: "Mountz BLRTSX-A brushless rotary torque and angle sensor",
    description:
      "For power tool testing, brushless rotary torque and angle sensors calculate a fastener's rotation angle or torque breakaway.",
    sensorType: "Brushless rotary torque and angle sensor",
    torqueRange: "10 OZF.in - 738 LBF.ft",
    application: "Power-tool torque, angle and breakaway testing",
    highlight: "Torque plus angle measurement",
  },
  {
    slug: "blrtsx",
    model: "BLRTSX",
    name: "BLRTSX Brushless Rotary Torque Sensors",
    image: `${imageBase}/rotarysensorblrtsxthumbnail.jpg`,
    imageAlt: "Mountz BLRTSX brushless rotary torque sensor",
    description:
      "Test power tools with brushless rotary torque sensors. Torque performance can be audited and checked using this tool.",
    sensorType: "Brushless rotary torque sensor",
    torqueRange: "10 ozf.in - 738 lbf.ft",
    application: "Power-tool performance auditing",
    highlight: "Brushless rotary testing",
  },
  {
    slug: "rtsx",
    model: "RTSX",
    name: "RTSX Rotary Torque Sensors",
    image: `${imageBase}/rtsxthumbnail.jpg`,
    imageAlt: "Mountz RTSX rotary torque sensor",
    description:
      "Torque sensors on a rotary axis monitor power tools so torque output can be calculated and checked with the instrument.",
    sensorType: "Rotary-axis torque sensor",
    torqueRange: "1 lbf.in - 1500 lbf.ft",
    application: "Monitoring rotary power-tool output",
    highlight: "Rotary-axis torque monitoring",
  },
  {
    slug: "rtsx-a",
    model: "RTSX-A",
    name: "RTSX-A Rotary Angle Sensors",
    image: `${imageBase}/rotarysensoranglesthumbnail.jpg`,
    imageAlt: "Mountz RTSX-A rotary angle sensor",
    description:
      "For measuring power tools, rotary torque and angle sensors calculate fastener joint angles or breakaway torque.",
    sensorType: "Rotary torque and angle sensor",
    torqueRange: "1 LBF.in - 1500 LBF.ft",
    application: "Power-tool joint-angle and breakaway measurement",
    highlight: "Rotary torque and angle",
  },
  {
    slug: "sdx",
    model: "SDX",
    name: "SDX Torque Sensing Screwdriver",
    image: `${imageBase}/sdxthumbnail.jpg`,
    imageAlt: "Mountz SDX torque sensing screwdriver",
    description:
      "Torque sensing screwdriver for auditing or verifying torque in controlled fastening applications.",
    sensorType: "Torque sensing screwdriver",
    torqueRange: "1 - 50 lbf.in",
    application: "Torque auditing and verification",
    highlight: "Integrated torque sensing",
  },
] as const;
