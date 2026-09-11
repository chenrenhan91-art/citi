export type Article = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  body: string[];
};

export const articles: Article[] = [
  {
    slug: "how-we-wash-linen",
    title: "How we wash Portuguese linen",
    date: "12 March 2026",
    excerpt:
      "Stonewashing is not a marketing word. It is the step that turns stiff flax into a bed you can use on night one.",
    image: "/images/country-portugal.jpg",
    body: [
      "Flax linen leaves the loom with a firm hand. That is a feature of the fibre, not a fault. If we skipped the wash, the Atlantic bundle would feel like canvas for the first month.",
      "Our mill in northern Portugal washes each metre in water and pumice, then tumble-dries it under control so the slub shows and the colour settles. You can still wash it at home at 40°C. Line drying keeps the hand closer to how it arrived.",
      "If you need to return bedding, UK distance-selling rules and our 30-day policy both require the set unwashed and in its original packaging. We cannot resell washed sheets. Faulty pieces are a different case: contact studio@dazzleyoureyes.co.uk and we will collect them.",
    ],
  },
  {
    slug: "why-rugs-travel-as-oversized",
    title: "Why rugs travel as oversized goods",
    date: "2 February 2026",
    excerpt:
      "A 200 x 300 cm wool rug is not a parcel. The delivery charge is the two-person team, not a handling trick.",
    image: "/images/banner-rugs.jpg",
    body: [
      "Area rugs, the Holm chair, and the Holm bench ship on a two-person service in the United Kingdom. That is why the delivery line is £49.50, and why a merchandise total of £250 does not waive it. Standard parcels (pillows, throws, lamps, baskets) are a different band.",
      "We book a delivery window after the piece leaves the warehouse. Someone needs to be in. Drivers will not unpack a white-glove interior styling service; they will place the rolled rug or the chair in the room you choose if access is reasonable.",
      "International oversized delivery is £99.00 to eligible countries. We do not ship to the restricted destinations listed in our shipping policy. If your building has no lift, tell us in the checkout notes so the carrier can plan.",
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((item) => item.slug === slug);
}
