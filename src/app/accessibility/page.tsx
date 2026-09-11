import { PageIntro } from "@/components/PageIntro";
import { company } from "@/lib/company";

export const metadata = { title: "Accessibility" };

export default function AccessibilityPage() {
  return (
    <PageIntro title="Accessibility statement">
      <p>
        We want {company.storeName} to be usable with a keyboard, a screen reader, and a phone. Pages use text labels on
        form fields, skip-to-content, and buttons with visible names. If something blocks you, email {company.email} with
        the page URL and we will aim to reply within five working days.
      </p>
      <p>
        Product photographs are decorative support for the written description. If an image fails to load, the product
        name and price still appear.
      </p>
    </PageIntro>
  );
}
