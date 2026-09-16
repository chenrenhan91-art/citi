import { PageIntro } from "@/components/PageIntro";
import { company } from "@/lib/company";

export const metadata = {
  title: "Cookie policy",
  description: "Cookies and local storage used by Dazzle Your Eyes.",
};

export default function CookiesPage() {
  return (
    <PageIntro title="Cookie policy">
      <p>
        This site uses a small amount of storage in your browser so the shopping bag survives a refresh. That storage is
        local to your device. We do not run advertising pixels.
      </p>
      <h2 className="pt-4 font-serif text-2xl">Strictly necessary</h2>
      <p>
        Bag contents (`dye-cart-v1`) live in local storage. Without this, guest checkout cannot remember what you added.
        The last order confirmation (`dye-last-order-v1`) is kept in session storage so the confirmation page can show
        your totals. You can clear both in your browser settings.
      </p>
      <h2 className="pt-4 font-serif text-2xl">Optional</h2>
      <p>
        The newsletter and contact forms open your email app so you can write to {company.email}. We do not set a
        marketing cookie for the newsletter.
      </p>
      <p>
        Questions: {company.privacyEmail}.
      </p>
    </PageIntro>
  );
}
