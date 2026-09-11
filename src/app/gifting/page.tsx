import { PageIntro } from "@/components/PageIntro";
import { company } from "@/lib/company";

export const metadata = { title: "Corporate gifting" };

export default function GiftingPage() {
  return (
    <PageIntro title="Corporate gifting">
      <p>
        For orders of twelve pieces or more, email {company.email} with the SKU list and a delivery date. Trade prices
        are quoted only in writing. Delivery still follows the published bands: bedding free in the UK, standard{" "}
        parcels and oversized rugs as on the Shipping page. We cannot ship to restricted destinations.
      </p>
      <p>Invoices are issued by {company.legalName} in pounds sterling.</p>
    </PageIntro>
  );
}
