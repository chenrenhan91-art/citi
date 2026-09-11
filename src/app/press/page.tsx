import { PageIntro } from "@/components/PageIntro";
import { company } from "@/lib/company";

export const metadata = { title: "Press" };

export default function PressPage() {
  return (
    <PageIntro title="Press">
      <p>
        Editors and stylists can request photography and a line sheet from {company.email}. Please put “Press” in the
        subject. We do not lend Archive Sale pieces.
      </p>
      <p>
        Company for credit lines: {company.legalName}, trading as {company.storeName}.
      </p>
    </PageIntro>
  );
}
