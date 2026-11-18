export type KukenAirToolProduct = {
  model: string;
  slug: string;
  family: string;
  assetName: string;
  image: string;
  imageAlt: string;
};

const imagePath = "/assets/img/products/kuken-air-tools";

export const kukenAirToolProducts: KukenAirToolProduct[] = [
  {
    model: "PTS-450EX",
    slug: "pts-450ex",
    family: "PTS-EX series",
    assetName: "PTS-450EX.png",
    image: `${imagePath}/PTS-450EX.png`,
    imageAlt: "KUKEN Japan PTS-450EX pneumatic air tool",
  },
  {
    model: "PTS-450EX-L",
    slug: "pts-450ex-l",
    family: "PTS-EX-L series",
    assetName: "PTS-450EX-L.png",
    image: `${imagePath}/PTS-450EX-L.png`,
    imageAlt: "KUKEN Japan PTS-450EX-L pneumatic air tool",
  },
  {
    model: "PTS-600EX",
    slug: "pts-600ex",
    family: "PTS-EX series",
    assetName: "PTS-600EX.png",
    image: `${imagePath}/PTS-600EX.png`,
    imageAlt: "KUKEN Japan PTS-600EX pneumatic air tool",
  },
  {
    model: "PTS-600EX-L",
    slug: "pts-600ex-l",
    family: "PTS-EX-L series",
    assetName: "PTS-600EX-L.png",
    image: `${imagePath}/PTS-600EX-L.png`,
    imageAlt: "KUKEN Japan PTS-600EX-L pneumatic air tool",
  },
  {
    model: "PTS-800EX",
    slug: "pts-800ex",
    family: "PTS-EX series",
    assetName: "PTS-800EX.png",
    image: `${imagePath}/PTS-800EX.png`,
    imageAlt: "KUKEN Japan PTS-800EX pneumatic air tool",
  },
  {
    model: "PTS-800EX-L",
    slug: "pts-800ex-l",
    family: "PTS-EX-L series",
    assetName: "PTS-800EX-L.png",
    image: `${imagePath}/PTS-800EX-L.png`,
    imageAlt: "KUKEN Japan PTS-800EX-L pneumatic air tool",
  },
];
