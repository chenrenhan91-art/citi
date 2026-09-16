import Link from "next/link";
import { company } from "@/lib/company";
import { CoverImage } from "@/components/CoverImage";
import { PageIntro } from "@/components/PageIntro";

export const metadata = {
  title: "Our Story",
  description: "Why DAZZLEYOUREYES LTD designs with workshops abroad and sells from West Drayton.",
};

export default function AboutPage() {
  return (
    <>
      <section className="relative min-h-[46vh]">
        <CoverImage src="/images/banner-makers.jpg" alt="Workshop looms" sizes="100vw" priority />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 flex items-end px-4 py-12 text-white lg:px-16">
          <h1 className="font-serif text-4xl md:text-5xl">Homes should keep the journeys we take</h1>
        </div>
      </section>
      <PageIntro title="Our philosophy">
        <p>
          {company.storeName} is the storefront of {company.legalName}. We travel to workshops, design a short list of
          pieces with the people who make them, and sell those pieces from England. There is no wholesale middle step
          between the workshop invoice and your door.
        </p>
        <p>
          We do not claim a certification we have not earned. What we do claim is simpler: small lots, named origins on
          every product page, and prices in pounds sterling that include UK VAT.
        </p>
        <h2 className="pt-6 font-serif text-2xl">Global style, small batch</h2>
        <p>
          Country by country we blend our studio drawings with techniques already in the room: stonewashed linen in
          Portugal, hand knots in Rajasthan, alpaca in the Andes. You will not find an endless catalogue. If a dye lot
          closes, it moves to the Archive Sale and is not remade.
        </p>
        <h2 className="pt-6 font-serif text-2xl">The name</h2>
        <p>
          Dazzle Your Eyes is a working title for objects that should still look considered after a decade of use. The
          legal entity behind the site is {company.legalName}, {company.addressSingle}.
        </p>
        <p>
          Questions: <a href={`mailto:${company.inboxEmail}`}>{company.email}</a> or{" "}
          <Link href="/contact">contact us</Link>.
        </p>
      </PageIntro>
    </>
  );
}
