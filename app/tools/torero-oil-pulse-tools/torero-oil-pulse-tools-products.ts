export type OilPulseToolGroup = {
  id: string;
  label: string;
  title: string;
  description: string;
  products: OilPulseTool[];
};

export type OilPulseTool = {
  model: string;
  description: string;
  freeSpeed: string;
  maximumTorque: string;
  airInlet: string;
  weight: string;
};

export const oilPulseToolGroups: OilPulseToolGroup[] = [
  {
    id: "shut-off",
    label: "Shut off type oil pulse tools",
    title: "Shut-off type oil pulse tools",
    description: "Automatic shut-off models for controlled fastening and repeatable torque delivery.",
    products: [
      {
        model: "OBT-60PD",
        description: '3/8" Square Drive Pistol Shut Off Oil Pulse Tool',
        freeSpeed: "6000",
        maximumTorque: "20~32",
        airInlet: "1/4 PT",
        weight: "0.92",
      },
      {
        model: "OBT-90PD",
        description: '1/2" Square Drive Pistol Shut Off Oil Pulse Tool',
        freeSpeed: "4800",
        maximumTorque: "55~85",
        airInlet: "1/4 PT",
        weight: "1.45",
      },
      {
        model: "OBT-250PD",
        description: '3/4" Square Drive Pistol Shut Off Oil Pulse Tool',
        freeSpeed: "3300",
        maximumTorque: "225~450",
        airInlet: "3/8 PT",
        weight: "4.2",
      },
      {
        model: "OBT-40PH",
        description: '1/4" Hex Drive Pistol Shut Off Oil Pulse Tool',
        freeSpeed: "3800",
        maximumTorque: "5~9",
        airInlet: "1/4 PT",
        weight: "0.92",
      },
      {
        model: "OBT-70PH",
        description: '1/4" Hex Drive Pistol Shut Off Oil Pulse Tool',
        freeSpeed: "5800",
        maximumTorque: "20~32",
        airInlet: "1/4 PT",
        weight: "1.05",
      },
      {
        model: "OBT-60SD",
        description: '3/8" Square Drive Straight Type Shut Off Oil Pulse Tool',
        freeSpeed: "5700",
        maximumTorque: "20~32",
        airInlet: "1/4 PT",
        weight: "0.95",
      },
      {
        model: "OBT-60SH",
        description: '1/4" Hex Drive Straight Type Shut Off Oil Pulse Tool',
        freeSpeed: "5700",
        maximumTorque: "16~28",
        airInlet: "1/4 PT",
        weight: "0.87",
      },
      {
        model: "OBT-100PDL-1",
        description: '1/2" Square Drive Pistol Type Reverse Shut-off Wrench',
        freeSpeed: "4200",
        maximumTorque: "55~95",
        airInlet: "1/4 PT",
        weight: "1.7",
      },
    ],
  },
  {
    id: "non-shut-off",
    label: "Non shut off type oil pulse tools",
    title: "Non-shut-off type oil pulse tools",
    description: "Non-shut-off pistol and straight tools for applications where operator control stays in the loop.",
    products: [
      {
        model: "OBN-40PD",
        description: '3/8" Square Drive Pistol Non Shut Off Oil Pulse Tool',
        freeSpeed: "4000",
        maximumTorque: "13~22",
        airInlet: "1/4 PT",
        weight: "0.7",
      },
      {
        model: "OBN-90PD",
        description: '1/2" Square Drive Pistol Non Shut Off Oil Pulse Tool',
        freeSpeed: "5200",
        maximumTorque: "50~100",
        airInlet: "1/4 PT",
        weight: "1.3",
      },
      {
        model: "OBN-70PH",
        description: '1/4" Hex Drive Pistol Non Shut Off Oil Pulse Tool',
        freeSpeed: "5600",
        maximumTorque: "30~40",
        airInlet: "1/4 PT",
        weight: "0.95",
      },
      {
        model: "OBN-40SD",
        description: '3/8" Square Drive Straight Type Non Shut Off Oil Pulse Tool',
        freeSpeed: "4000",
        maximumTorque: "13~22",
        airInlet: "1/4 PT",
        weight: "0.62",
      },
      {
        model: "OBN-40SH",
        description: '1/4" Hex Drive Straight Type Non Shut Off Oil Pulse Tool',
        freeSpeed: "4000",
        maximumTorque: "11~20",
        airInlet: "1/4 PT",
        weight: "0.62",
      },
    ],
  },
  {
    id: "special",
    label: "Special type oil pulse tools",
    title: "Special type oil pulse tools",
    description: "A dedicated open-end solution for specialist fastening access and oil-pulse applications.",
    products: [
      {
        model: "OBN-60-SW-1",
        description: "Straight non-shut-off gear oil-pulse tool (Open-end)",
        freeSpeed: "430-480",
        maximumTorque: "40-55",
        airInlet: "1/4 NPT",
        weight: "2.37",
      },
    ],
  },
];

export const oilPulseToolCount = oilPulseToolGroups.reduce(
  (count, group) => count + group.products.length,
  0,
);
