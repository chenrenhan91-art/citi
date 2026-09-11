import { company } from "@/lib/company";
import { ContactForm } from "@/components/ContactForm";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="font-serif text-4xl">Contact</h1>
      <p className="mt-4 text-muted">
        {company.legalName}, {company.addressSingle}. {company.hours}
      </p>
      <p className="mt-2">
        <a className="underline" href={company.phoneHref}>
          {company.phoneDisplay}
        </a>
        {" · "}
        <a className="underline" href={`mailto:${company.email}`}>
          {company.email}
        </a>
      </p>
      <ContactForm />
    </div>
  );
}
