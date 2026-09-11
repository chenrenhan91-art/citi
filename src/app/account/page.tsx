import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { company } from "@/lib/company";

export const metadata = { title: "Account" };

export default function AccountPage() {
  return (
    <PageIntro
      title="Account"
      lede="You can buy without registering. Guest checkout is the default."
    >
      <p>
        Add pieces to your bag and go to checkout. We do not require a password. If you want restock notes, use the
        newsletter in the footer or email {company.email}.
      </p>
      <p>
        <Link href="/cart" className="btn btn-solid mt-2">
          Go to bag
        </Link>
      </p>
      <p className="pt-6 text-sm text-muted">
        A signed-in area is not offered. After you pay, your confirmation is shown on screen and kept in this browser
        session. Orders are not stored against an account.
      </p>
    </PageIntro>
  );
}
