import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { restrictedDestinations } from "@/lib/embargo";
import { company } from "@/lib/company";

export const metadata = {
  title: "Restricted destinations",
  description: "Countries DAZZLEYOUREYES LTD cannot ship to.",
};

export default function RestrictedPage() {
  return (
    <PageIntro
      title="Restricted destinations"
      lede="We follow UK export controls and sanctions. Checkout will refuse these destinations. The list is shown under several common names so it is not missed."
    >
      <ul className="list-disc space-y-2 pl-5">
        {restrictedDestinations.map((item) => (
          <li key={item.code}>{item.label}</li>
        ))}
      </ul>
      <p>
        If your address is in one of these places, do not place an order. No carrier we use will accept the shipment.
        Questions: <a href={`mailto:${company.email}`}>{company.email}</a>. See also{" "}
        <Link href="/shipping">Shipping</Link>.
      </p>
    </PageIntro>
  );
}
