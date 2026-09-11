import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { formatGBP } from "@/lib/format";
import {
  UK_STANDARD_FEE,
  UK_OVERSIZED_FEE,
  UK_FREE_STANDARD_THRESHOLD,
  INTL_BEDDING_FEE,
  INTL_STANDARD_FEE,
  INTL_OVERSIZED_FEE,
  INTL_FREE_STANDARD_THRESHOLD,
} from "@/lib/shipping";
import { company } from "@/lib/company";

export const metadata = {
  title: "Shipping",
  description: "UK and international delivery charges for Dazzle Your Eyes.",
};

export default function ShippingPage() {
  return (
    <PageIntro
      title="Shipping"
      lede="Delivery is calculated on the highest shipping band in your bag. Bedding never drags a rug into a cheaper rate, and a free-shipping threshold never waives oversized delivery."
    >
      <p>
        Sold by {company.legalName} from {company.addressSingle}. {company.vatNote} Shipping charges below also include
        VAT where it applies.
      </p>
      <h2 className="pt-4 font-serif text-2xl">United Kingdom</h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          Bedding and bath (sheets, duvet covers, towels, robes): free. In-stock pieces leave the warehouse in 2-4
          working days and usually arrive 3-6 working days after dispatch.
        </li>
        <li>
          Standard parcels (pillows, throws, lighting, tabletop, baskets, the Costa side table): {formatGBP(UK_STANDARD_FEE)},
          or free when merchandise is {formatGBP(UK_FREE_STANDARD_THRESHOLD)} or more.
        </li>
        <li>
          Oversized (area rugs, Holm chair, Holm bench): {formatGBP(UK_OVERSIZED_FEE)} two-person delivery. The £250
          threshold does not apply. We book a window after dispatch. Someone needs to be in.
        </li>
      </ul>
      <h2 className="pt-4 font-serif text-2xl">Outside the United Kingdom</h2>
      <p>
        We ship to most countries. We do not ship to the destinations on our{" "}
        <Link href="/restricted-destinations">restricted list</Link>. Duties and local taxes may be due on arrival; they
        are not included in the order total.
      </p>
      <ul className="list-disc space-y-2 pl-5">
        <li>Bedding and bath only: {formatGBP(INTL_BEDDING_FEE)}.</li>
        <li>
          Standard: {formatGBP(INTL_STANDARD_FEE)}, or free from {formatGBP(INTL_FREE_STANDARD_THRESHOLD)}.
        </li>
        <li>Oversized: {formatGBP(INTL_OVERSIZED_FEE)}. The £400 threshold does not waive this charge.</li>
      </ul>
      <p>International parcels typically arrive 7-14 working days after dispatch; oversized 10-21 working days.</p>
      <h2 className="pt-4 font-serif text-2xl">How mixed bags are charged</h2>
      <p>
        The bag uses one delivery line: the highest band among the items. Bedding plus a pillow is charged as standard
        (unless the £250 UK / £400 international threshold is met). Bedding plus a rug is charged as oversized.
      </p>
      <p>
        Delivery is shown on each product page, in the bag, and at guest checkout. You do not need an account to see it.
      </p>
    </PageIntro>
  );
}
