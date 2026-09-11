import Link from "next/link";
import { CoverImage } from "@/components/CoverImage";
import { countriesOnHome } from "@/lib/collections";
import { PageIntro } from "@/components/PageIntro";

export const metadata = {
  title: "Our Makers",
  description: "How DAZZLEYOUREYES LTD works with workshops in Portugal, Morocco, India, Japan, Peru, and Mexico.",
};

export default function MakersPage() {
  return (
    <>
      <section className="relative min-h-[40vh]">
        <CoverImage src="/images/country-india.jpg" alt="Textile work in progress" sizes="100vw" />
        <div className="absolute inset-0 bg-black/30" />
      </section>
      <PageIntro
        title="Our makers"
        lede="We visit the rooms where the work happens. We do not buy from anonymous catalogues and relabel the goods."
      >
        <p>
          Each collection page names a country because that is where the piece is made. Lead times follow the craft:
          linen leaves Portugal faster than a hand-knotted rug leaves Rajasthan. If a product is in stock, the product
          page says so.
        </p>
        <p>
          Payment terms are agreed in writing with each workshop before we list a piece. We do not use unpaid samples as
          a substitute for an order.
        </p>
        <ul className="grid gap-3 sm:grid-cols-2">
          {countriesOnHome.map((item) => (
            <li key={item.slug}>
              <Link href={`/collections/${item.slug}`} className="underline">
                {item.name}
              </Link>
              <span className="text-muted">. {item.copy}</span>
            </li>
          ))}
        </ul>
      </PageIntro>
    </>
  );
}
