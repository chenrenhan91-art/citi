import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { company } from "@/lib/company";
import { restrictedLabelList } from "@/lib/embargo";

export const metadata = {
  title: "Terms of service",
  description: "Contract terms for purchases from DAZZLEYOUREYES LTD, governed by the laws of England and Wales.",
};

export default function TermsPage() {
  return (
    <PageIntro
      title="Terms of service"
      lede={`These terms apply to the website operated by ${company.legalName} (“we”, “us”). By using the site or placing an order you agree to them.`}
    >
      <h2 className="font-serif text-2xl">1. Who we are</h2>
      <p>
        The seller is {company.legalName}, {company.addressSingle}. Contact {company.email}.
        {company.storeName} is our trading name. {company.vatNote}
      </p>
      <h2 className="pt-4 font-serif text-2xl">2. Governing law</h2>
      <p>
        These terms and any dispute or claim (including non-contractual disputes) are governed by the laws of England
        and Wales. The courts of England and Wales have exclusive jurisdiction, except that if you are a consumer living
        in Scotland or Northern Ireland you may also bring proceedings in your home courts. Nothing in these terms
        limits your mandatory rights under UK consumer law, including the Consumer Rights Act 2015 and the Consumer
        Contracts (Information, Cancellation and Additional Charges) Regulations 2013.
      </p>
      <h2 className="pt-4 font-serif text-2xl">3. Using the site</h2>
      <p>
        Content on this website (text, photographs, drawings, layout) is owned by us or our licensors. You may view it
        for personal, non-commercial use. You may not scrape the catalogue, copy product photography for resale, or
        misuse the site. We may change or withdraw the site without notice.
      </p>
      <h2 className="pt-4 font-serif text-2xl">4. Orders and guest checkout</h2>
      <p>
        You may shop without creating an account. An order is an offer to buy. We accept it when payment is authorised
        and we show an order confirmation. We may refuse an order if an item is out of stock, a price is obviously wrong,
        or the delivery address is restricted. We accept Visa, Mastercard, and American Express.
      </p>
      <h2 className="pt-4 font-serif text-2xl">5. Prices and currency</h2>
      <p>
        All prices are in pounds sterling (GBP) and include UK VAT at the rate in force. Delivery is extra unless a
        product page, the bag, and checkout all show it as free under the rules on our{" "}
        <Link href="/shipping">Shipping</Link> page. If we have displayed an obvious pricing error we may cancel the
        order and refund any sum taken.
      </p>
      <h2 className="pt-4 font-serif text-2xl">6. Handmade variation</h2>
      <p>
        Colour, size tolerance, leather marks, and weave irregularity are part of handmade goods. They are not defects
        unless the piece is unsafe or not as described.
      </p>
      <h2 className="pt-4 font-serif text-2xl">7. Delivery and restricted destinations</h2>
      <p>
        Delivery bands, times, and mixed-bag rules are set out in Shipping and are repeated on product pages and in the
        bag. We do not deliver to: {restrictedLabelList()}. Checkout will reject those countries. Risk passes to you
        when the goods are delivered to the address you gave, or to a neighbour or safe place you authorised.
      </p>
      <h2 className="pt-4 font-serif text-2xl">8. Cancellation and returns</h2>
      <p>
        Consumers have 14 days from delivery to cancel most unused goods under the 2013 Regulations. We also offer 30
        days from delivery, on the terms in our <Link href="/returns">Returns</Link> policy. Archive and other final-sale
        goods are excluded from change-of-mind returns. These exclusions do not affect remedies for faulty goods under
        the Consumer Rights Act 2015. Digital content is not sold on this site.
      </p>
      <h2 className="pt-4 font-serif text-2xl">9. Promotions</h2>
      <p>
        Archive Sale prices apply only to listed pieces and cannot be combined with other offers. We may withdraw a
        promotion at any time for future orders.
      </p>
      <h2 className="pt-4 font-serif text-2xl">10. Privacy</h2>
      <p>
        Personal data is handled as described in our <Link href="/privacy">Privacy policy</Link> and{" "}
        <Link href="/cookies">Cookie policy</Link>.
      </p>
      <h2 className="pt-4 font-serif text-2xl">11. Liability</h2>
      <p>
        We do not exclude liability for death or personal injury caused by negligence, fraud, or any liability that UK
        law does not allow us to exclude. For consumers, goods must be as described, of satisfactory quality, and fit
        for purpose. For any other loss we are not liable for lost profit or indirect loss.
      </p>
      <h2 className="pt-4 font-serif text-2xl">12. Contact</h2>
      <p>
        Questions about these terms: {company.email}. Last updated 11 September 2026.
      </p>
    </PageIntro>
  );
}
