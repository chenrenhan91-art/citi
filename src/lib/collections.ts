export type Collection = {
  slug: string;
  title: string;
  description: string;
  image: string;
  nav?: boolean;
};

export const collections: Collection[] = [
  {
    slug: "shop-all",
    title: "Shop All",
    description: "Rugs, bedding, furniture, and objects for the well-travelled home.",
    image: "/images/hero-living.jpg",
    nav: true,
  },
  {
    slug: "best-sellers",
    title: "Best Sellers",
    description: "Pieces we remake because they leave the warehouse first.",
    image: "/images/split-bestsellers.jpg",
    nav: true,
  },
  {
    slug: "archive-sale",
    title: "Archive Sale",
    description: "Closed dye lots and last lengths. Archive pieces are final sale.",
    image: "/images/split-archive.jpg",
    nav: true,
  },
  {
    slug: "rugs",
    title: "Rugs",
    description: "Hand-knotted, flatwoven, and jute rugs. Oversized UK delivery applies.",
    image: "/images/cat-rugs.jpg",
    nav: true,
  },
  {
    slug: "bedding",
    title: "Bedding and Bath",
    description: "Linen, percale, towels, and robes. Free UK shipping on this category.",
    image: "/images/cat-bedding.jpg",
    nav: true,
  },
  {
    slug: "pillows",
    title: "Pillows",
    description: "Wool, block-print, and alpaca cushions, inserts included.",
    image: "/images/cat-pillows.jpg",
    nav: true,
  },
  {
    slug: "furniture",
    title: "Furniture",
    description: "Oak seating, benches, and a rattan table. Check delivery band on each piece.",
    image: "/images/cat-furniture.jpg",
    nav: true,
  },
  {
    slug: "baskets",
    title: "Baskets",
    description: "Palm and seagrass storage from Oaxaca and Morocco.",
    image: "/images/cat-baskets.jpg",
    nav: true,
  },
  {
    slug: "lighting",
    title: "Lighting",
    description: "Paper pendants and ceramic table lamps. Bulbs are sold separately.",
    image: "/images/prod-lantern.jpg",
    nav: true,
  },
  {
    slug: "throws",
    title: "Throws",
    description: "Alpaca and wool blankets for sofas and the end of the bed.",
    image: "/images/prod-alpaca-throw.jpg",
    nav: true,
  },
  {
    slug: "tabletop",
    title: "Tabletop",
    description: "Stoneware, glass, and an oak board for the table.",
    image: "/images/prod-dinner-set.jpg",
    nav: true,
  },
  {
    slug: "portugal",
    title: "Portugal",
    description: "Linen, percale, stoneware, and oak from northern workshops.",
    image: "/images/country-portugal.jpg",
  },
  {
    slug: "morocco",
    title: "Morocco",
    description: "Kilims, wool pillows, seagrass, and handblown glass.",
    image: "/images/country-morocco.jpg",
  },
  {
    slug: "india",
    title: "India",
    description: "Hand-knotted wool, block print, and herringbone throws.",
    image: "/images/country-india.jpg",
  },
  {
    slug: "japan",
    title: "Japan",
    description: "Quiet wool rugs and washi lighting.",
    image: "/images/country-japan.jpg",
  },
  {
    slug: "peru",
    title: "Peru",
    description: "Alpaca pillows and throws from the Sacred Valley.",
    image: "/images/country-peru.jpg",
  },
  {
    slug: "mexico",
    title: "Mexico",
    description: "Jute, palm baskets, rattan, and carved oak.",
    image: "/images/country-mexico.jpg",
  },
];

export const countriesOnHome = [
  {
    slug: "portugal",
    name: "Portugal",
    coords: "38° 43' 20'' N / 09° 08' 21'' W",
    copy: "Linen, percale, and stoneware from northern mills and potteries.",
    image: "/images/country-portugal.jpg",
  },
  {
    slug: "morocco",
    name: "Morocco",
    coords: "31° 37' 48'' N / 08° 00' 32'' W",
    copy: "Kilims, wool, seagrass, and glass from Atlas and city workshops.",
    image: "/images/country-morocco.jpg",
  },
  {
    slug: "india",
    name: "India",
    coords: "28° 38' 41'' N / 77° 13' 00'' E",
    copy: "Hand-knotted wool, block print, and winter throws.",
    image: "/images/country-india.jpg",
  },
  {
    slug: "japan",
    name: "Japan",
    coords: "35° 01' 00'' N / 135° 46' 00'' E",
    copy: "Low-pile rugs and paper lighting for slower rooms.",
    image: "/images/country-japan.jpg",
  },
  {
    slug: "peru",
    name: "Peru",
    coords: "13° 31' 00'' S / 71° 58' 00'' W",
    copy: "Alpaca textiles from the Andes, light and warm.",
    image: "/images/country-peru.jpg",
  },
  {
    slug: "mexico",
    name: "Mexico",
    coords: "17° 03' 00'' N / 96° 43' 00'' W",
    copy: "Palm, jute, rattan, and carved oak from Oaxaca makers.",
    image: "/images/country-mexico.jpg",
  },
];

export function getCollection(slug: string) {
  return collections.find((item) => item.slug === slug);
}
