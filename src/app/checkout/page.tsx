"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useCart } from "@/lib/cart";
import { formatGBP } from "@/lib/format";
import { countries } from "@/lib/countries";
import { isRestrictedCountry } from "@/lib/embargo";
import { company } from "@/lib/company";

export default function CheckoutPage() {
  const { lines, subtotal, quote } = useCart();
  const [country, setCountry] = useState("GB");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const shipping = useMemo(() => quote(country), [quote, country]);
  const restricted = isRestrictedCountry(country);
  const total = shipping.ok ? subtotal + shipping.pence : subtotal;

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16">
        <h1 className="font-serif text-4xl">Checkout</h1>
        <p className="mt-4">
          Your bag is empty.{" "}
          <Link href="/collections/shop-all" className="underline">
            Add something to continue
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
      <div>
        <h1 className="font-serif text-4xl">Guest checkout</h1>
        <p className="mt-3 text-sm text-muted">
          No account is required. This form lets you confirm address, shipping, and restricted destinations. We do not take payment and we do not place an order.
        </p>

        <form
          className="mt-8 space-y-5"
          onSubmit={(event) => {
            event.preventDefault();
            setMessage(null);
            setError(null);
            if (restricted || !shipping.ok) {
              setError(
                "We cannot ship to this destination. Choose another country to see a delivery charge.",
              );
              return;
            }
            const data = new FormData(event.currentTarget);
            const required = ["email", "firstName", "lastName", "line1", "city", "postcode", "phone"];
            for (const key of required) {
              if (!String(data.get(key) || "").trim()) {
                setError("Please complete every required field.");
                return;
              }
            }
            setMessage(
              `Totals confirmed for ${company.legalName}. Merchandise ${formatGBP(subtotal)}, ${shipping.label} ${shipping.pence === 0 ? "Free" : formatGBP(shipping.pence)}, estimated total ${formatGBP(total)}. No payment has been taken and no order has been placed.`,
            );
          }}
        >
          <Field id="email" label="Email" type="email" autoComplete="email" />
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="firstName" label="First name" autoComplete="given-name" />
            <Field id="lastName" label="Last name" autoComplete="family-name" />
          </div>
          <Field id="line1" label="Address line 1" autoComplete="address-line1" />
          <Field id="line2" label="Address line 2 (optional)" autoComplete="address-line2" required={false} />
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="city" label="City or town" autoComplete="address-level2" />
            <Field id="postcode" label="Postcode" autoComplete="postal-code" />
          </div>
          <div>
            <label htmlFor="country" className="text-sm">
              Country
            </label>
            <select
              id="country"
              name="country"
              className="mt-2 h-11 w-full border border-line px-2"
              value={country}
              onChange={(event) => {
                setCountry(event.target.value);
                setMessage(null);
                setError(null);
              }}
            >
              {countries.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <Field id="phone" label="Phone" type="tel" autoComplete="tel" />
          <div>
            <label htmlFor="notes" className="text-sm">
              Delivery notes (optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              className="mt-2 w-full border border-line px-3 py-2"
            />
          </div>
          <div className="border border-line p-4 text-sm">
            <p className="font-medium">Payment</p>
            <p className="mt-2 text-muted">
              Card payment is not enabled on this preview. Use Confirm totals to validate shipping and destination rules.
            </p>
          </div>
          {error ? <p className="text-sm text-red-800">{error}</p> : null}
          {message ? <p className="text-sm text-olive">{message}</p> : null}
          <button type="submit" className="btn btn-solid" disabled={restricted || !shipping.ok}>
            Confirm totals
          </button>
        </form>
      </div>

      <aside className="h-fit border border-line p-6">
        <h2 className="text-[12px] uppercase tracking-[0.16em]">Your bag</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {lines.map((line) => (
            <li key={`${line.product.id}-${line.variant.id}`} className="flex justify-between gap-3">
              <span>
                {line.product.name} ({line.variant.name}) × {line.quantity}
              </span>
              <span>{formatGBP(line.lineTotal)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 flex justify-between text-sm">
          <span>Merchandise (incl. VAT)</span>
          <span>{formatGBP(subtotal)}</span>
        </p>
        {shipping.ok ? (
          <p className="mt-2 flex justify-between text-sm">
            <span>{shipping.label}</span>
            <span>{shipping.pence === 0 ? "Free" : formatGBP(shipping.pence)}</span>
          </p>
        ) : (
          <p className="mt-2 text-sm text-red-800">{shipping.message}</p>
        )}
        {shipping.ok ? <p className="mt-2 text-[13px] text-muted">{shipping.detail}</p> : null}
        <p className="mt-4 flex justify-between border-t border-line pt-4 font-medium">
          <span>Estimated total</span>
          <span>{formatGBP(total)}</span>
        </p>
        <p className="mt-4 text-[12px] text-muted">
          Sold by {company.legalName}, {company.addressSingle}.
        </p>
      </aside>
    </div>
  );
}

function Field({
  id,
  label,
  type = "text",
  autoComplete,
  required = true,
}: {
  id: string;
  label: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="mt-2 h-11 w-full border border-line px-3"
      />
    </div>
  );
}
