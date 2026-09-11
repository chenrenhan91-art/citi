import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { formatGBP } from "@/lib/format";
import { RETURN_WINDOW_DAYS, UK_RETURN_LABEL_FEE, UK_OVERSIZED_FEE } from "@/lib/shipping";
import { company } from "@/lib/company";

export const metadata = {
  title: "Returns",
  description: "30-day returns and statutory cancellation for Dazzle Your Eyes.",
};

export default function ReturnsPage() {
  return (
    <PageIntro
      title="Returns"
      lede={`You have ${RETURN_WINDOW_DAYS} days from delivery to send a piece back, which is longer than the 14-day cooling-off period under the Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013.`}
    >
      <p>
        Write to {company.email} with your order number. We will send a prepaid UK label or book a collection. Faulty
        goods are handled under the Consumer Rights Act 2015 and are not limited to 30 days.
      </p>
      <h2 className="pt-4 font-serif text-2xl">What we take back</h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          Bedding and bath: unused, unwashed, in original packaging. UK returns are free. We cannot resell washed
          sheets.
        </li>
        <li>
          Standard parcels: unused, with tags. We email a UK prepaid label and deduct {formatGBP(UK_RETURN_LABEL_FEE)}{" "}
          from the refund. Exchanges of the same item in another size are free.
        </li>
        <li>
          Oversized rugs and furniture: unused and undamaged. Collection is {formatGBP(UK_OVERSIZED_FEE)}, the same as
          outbound oversized delivery.
        </li>
        <li>
          Archive Sale and other final-sale pieces: no change-of-mind returns. Faulty goods remain covered.
        </li>
      </ul>
      <p>
        Original delivery charges are not refunded unless we sent the wrong item, the item was faulty, or you cancel
        within the statutory 14 days before dispatch. See <Link href="/terms">Terms of service</Link>.
      </p>
    </PageIntro>
  );
}
