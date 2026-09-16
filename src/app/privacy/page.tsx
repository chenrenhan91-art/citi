import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { company } from "@/lib/company";

export const metadata = {
  title: "Privacy policy",
  description: "How DAZZLEYOUREYES LTD uses personal data under UK GDPR.",
};

export default function PrivacyPage() {
  return (
    <PageIntro
      title="Privacy policy"
      lede={`${company.legalName} is the controller of personal data collected through this website. We follow UK GDPR and the Data Protection Act 2018.`}
    >
      <h2 className="font-serif text-2xl">What we collect</h2>
      <p>
        If you check out, email us, or join the newsletter we collect the details you type: name, email, phone for
        delivery, delivery address, billing address if different, and message content. Contact and newsletter forms open
        your own email app so you can write to {company.email}. Nothing is stored by a third-party form service.
        The bag is stored in your browser (local storage) until you complete an order or clear it. When you pay, card
        details are used only to authorise the payment. We keep the last four digits with the order confirmation. We do
        not store the full card number.
      </p>
      <h2 className="pt-4 font-serif text-2xl">Why we use it</h2>
      <p>
        To reply to you, to fulfil a paid order, to send a newsletter you asked for, and to keep records we must
        keep under UK tax and consumer law. Legal bases are contract, legitimate interests (running a shop), legal
        obligation, and consent for optional email.
      </p>
      <h2 className="pt-4 font-serif text-2xl">Sharing</h2>
      <p>
        We would share an address with a carrier to deliver goods. We do not sell lists. Hosting providers that store
        this site may process data in the UK or EEA. Restricted destinations are blocked; we do not ship there.
      </p>
      <h2 className="pt-4 font-serif text-2xl">Retention and your rights</h2>
      <p>
        Newsletter data is kept until you unsubscribe. Enquiry emails are kept up to two years. You may request access,
        correction, erasure, restriction, or portability, and you may complain to the Information Commissioner's Office
        (ico.org.uk). Contact {company.privacyEmail} or write to {company.addressSingle}.
      </p>
      <p>
        See also <Link href="/cookies">Cookies</Link> and <Link href="/terms">Terms</Link>.
      </p>
    </PageIntro>
  );
}
