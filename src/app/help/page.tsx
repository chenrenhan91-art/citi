import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { company } from "@/lib/company";
import { formatGBP } from "@/lib/format";
import {
  UK_STANDARD_FEE,
  UK_OVERSIZED_FEE,
  UK_FREE_STANDARD_THRESHOLD,
  RETURN_WINDOW_DAYS,
} from "@/lib/shipping";

export const metadata = {
  title: "Help and FAQ",
  description: "Shipping, returns, and product questions for Dazzle Your Eyes.",
};

export default function HelpPage() {
  return (
    <PageIntro title="Help" lede="Short answers. The long versions live on Shipping, Returns, and Terms.">
      <h2 className="font-serif text-2xl">Do I need an account?</h2>
      <p>
        No. Add to bag and use guest checkout. An optional account page exists only if you want a newsletter or a
        password for later. Shopping does not require either.
      </p>
      <h2 className="pt-4 font-serif text-2xl">What currency do you charge?</h2>
      <p>Pounds sterling only. {company.vatNote}</p>
      <h2 className="pt-4 font-serif text-2xl">What are UK delivery charges?</h2>
      <p>
        Free on bedding and bath. {formatGBP(UK_STANDARD_FEE)} on standard parcels, free from{" "}
        {formatGBP(UK_FREE_STANDARD_THRESHOLD)}. {formatGBP(UK_OVERSIZED_FEE)} on rugs, the Holm chair, and the Holm
        bench. Full table: <Link href="/shipping">Shipping</Link>.
      </p>
      <h2 className="pt-4 font-serif text-2xl">Where will you not ship?</h2>
      <p>
        See <Link href="/restricted-destinations">restricted destinations</Link>. Checkout blocks those countries.
      </p>
      <h2 className="pt-4 font-serif text-2xl">How long are returns?</h2>
      <p>
        {RETURN_WINDOW_DAYS} days from delivery, with a statutory 14-day right to cancel for most unused goods. Archive
        pieces are final sale except where the law requires a remedy for faulty goods.{" "}
        <Link href="/returns">Returns</Link>.
      </p>
      <h2 className="pt-4 font-serif text-2xl">Do handmade pieces vary?</h2>
      <p>
        Yes. Wool colour, linen slub, and leather marks differ piece to piece. That is described on the product page and
        is not a fault.
      </p>
      <h2 className="pt-4 font-serif text-2xl">Who do I email?</h2>
      <p>
        <a href={`mailto:${company.email}`}>{company.email}</a> or call {company.phoneDisplay}. {company.hours}
      </p>
    </PageIntro>
  );
}
