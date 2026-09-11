import Link from "next/link";
import { company } from "@/lib/company";
import { NewsletterForm } from "./NewsletterForm";

const shop = [
  ["Shop All", "/collections/shop-all"],
  ["Rugs", "/collections/rugs"],
  ["Bedding and Bath", "/collections/bedding"],
  ["Pillows", "/collections/pillows"],
  ["Furniture", "/collections/furniture"],
  ["Baskets", "/collections/baskets"],
  ["Lighting", "/collections/lighting"],
  ["Throws", "/collections/throws"],
  ["Tabletop", "/collections/tabletop"],
  ["Best Sellers", "/collections/best-sellers"],
  ["Archive Sale", "/collections/archive-sale"],
] as const;

const about = [
  ["Our Story", "/about"],
  ["Our Makers", "/makers"],
  ["Journal", "/journal"],
  ["Press", "/press"],
  ["Corporate gifting", "/gifting"],
] as const;

const help = [
  ["Help and FAQ", "/help"],
  ["Shipping", "/shipping"],
  ["Returns", "/returns"],
  ["Restricted destinations", "/restricted-destinations"],
  ["Contact", "/contact"],
  ["Accessibility", "/accessibility"],
] as const;

const legal = [
  ["Terms of service", "/terms"],
  ["Privacy policy", "/privacy"],
  ["Cookie policy", "/cookies"],
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-line bg-paper">
      <div className="mx-auto max-w-[1400px] px-4 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="font-serif text-2xl leading-[1.2]">Be the first to know</p>
            <p className="mt-3 max-w-sm text-sm text-muted">
              New collections, restocks, and workshop notes. We send a few emails a year, not a daily digest.
            </p>
            <NewsletterForm />
          </div>
          <FooterCol title="Shop" links={shop} />
          <FooterCol title="About" links={about} />
          <div>
            <FooterCol title="Help" links={help} />
            <p className="mt-8 text-[11px] uppercase tracking-[0.18em] text-muted">Legal</p>
            <ul className="mt-3 space-y-2">
              {legal.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm hover:text-olive">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-line pt-10">
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Company</p>
          <p className="mt-3 font-serif text-xl">{company.legalName}</p>
          <p className="mt-2 max-w-xl text-sm leading-relaxed">
            {company.addressSingle}
          </p>
          <p className="mt-2 text-sm">
            <a href={company.phoneHref} className="hover:text-olive">
              {company.phoneDisplay}
            </a>
            {" · "}
            <a href={`mailto:${company.email}`} className="hover:text-olive">
              {company.email}
            </a>
          </p>
          <p className="mt-2 text-sm text-muted">{company.hours}</p>
          <p className="mt-2 text-sm text-muted">{company.vatNote} Guest checkout is available.</p>
        </div>

        <p className="mt-10 text-sm">{company.copyright}</p>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: readonly (readonly [string, string])[];
}) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{title}</p>
      <ul className="mt-3 space-y-2">
        {links.map(([label, href]) => (
          <li key={href}>
            <Link href={href} className="text-sm hover:text-olive">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
