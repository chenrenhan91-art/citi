"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, type InputHTMLAttributes } from "react";
import { useCart } from "@/lib/cart";
import { formatGBP } from "@/lib/format";
import { shippableCountries } from "@/lib/countries";
import { isRestrictedCountry } from "@/lib/embargo";
import { company } from "@/lib/company";
import {
  cvcValid,
  digitsOnly,
  expiryValid,
  formatCardNumber,
  formatExpiry,
  luhnValid,
} from "@/lib/card";
import { newOrderId, saveOrder } from "@/lib/order";

type Address = {
  email: string;
  firstName: string;
  lastName: string;
  line1: string;
  line2: string;
  city: string;
  postcode: string;
  country: string;
  phone: string;
  notes: string;
};

type Billing = {
  firstName: string;
  lastName: string;
  line1: string;
  city: string;
  postcode: string;
  country: string;
};

const emptyAddress: Address = {
  email: "",
  firstName: "",
  lastName: "",
  line1: "",
  line2: "",
  city: "",
  postcode: "",
  country: "GB",
  phone: "",
  notes: "",
};

const emptyBilling: Billing = {
  firstName: "",
  lastName: "",
  line1: "",
  city: "",
  postcode: "",
  country: "GB",
};

export default function CheckoutPage() {
  const router = useRouter();
  const { lines, subtotal, quote } = useCart();
  const [step, setStep] = useState<"address" | "payment">("address");
  const [address, setAddress] = useState<Address>(emptyAddress);
  const [sameBilling, setSameBilling] = useState(true);
  const [billing, setBilling] = useState<Billing>(emptyBilling);
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [paying, setPaying] = useState(false);

  const shipping = useMemo(() => quote(address.country), [quote, address.country]);
  const restricted = isRestrictedCountry(address.country);
  const total = shipping.ok ? subtotal + shipping.pence : subtotal;
  const countryName =
    shippableCountries.find((item) => item.code === address.country)?.name ?? address.country;

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

  function setAddressField<K extends keyof Address>(key: K, value: Address[K]) {
    setAddress((current) => ({ ...current, [key]: value }));
    setError(null);
  }

  function continueToPayment() {
    setError(null);
    if (restricted || !shipping.ok) {
      setError("We cannot ship to this destination. Choose another country.");
      return;
    }
    const required: (keyof Address)[] = [
      "email",
      "firstName",
      "lastName",
      "line1",
      "city",
      "postcode",
      "phone",
    ];
    for (const key of required) {
      if (!address[key].trim()) {
        setError("Please complete every required delivery field.");
        return;
      }
    }
    if (!address.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!sameBilling) {
      const billingRequired: (keyof Billing)[] = [
        "firstName",
        "lastName",
        "line1",
        "city",
        "postcode",
      ];
      for (const key of billingRequired) {
        if (!billing[key].trim()) {
          setError("Please complete every required billing field.");
          return;
        }
      }
      if (isRestrictedCountry(billing.country)) {
        setError("We cannot take a billing address in a restricted destination.");
        return;
      }
    }
    setStep("payment");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function pay() {
    setError(null);
    if (!cardName.trim()) {
      setError("Enter the name on the card.");
      return;
    }
    if (!luhnValid(cardNumber)) {
      setError("Enter a valid card number.");
      return;
    }
    if (!expiryValid(expiry)) {
      setError("Enter a valid expiry date in MM/YY.");
      return;
    }
    if (!cvcValid(cvc)) {
      setError("Enter a 3 or 4 digit security code.");
      return;
    }
    if (restricted || !shipping.ok) {
      setError("We cannot ship to this destination.");
      return;
    }

    const shippingLabel = shipping.label;
    const shippingPence = shipping.pence;
    setPaying(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 700));

      const last4 = digitsOnly(cardNumber).slice(-4);
      saveOrder({
        id: newOrderId(),
        placedAt: new Date().toISOString(),
        email: address.email.trim(),
        shipTo: [
          `${address.firstName} ${address.lastName}`,
          address.line1,
          address.line2,
          address.city,
          address.postcode,
          countryName,
        ]
          .filter((part) => part && String(part).trim())
          .join(", "),
        countryName,
        lines: lines.map((line) => ({
          name: line.product.name,
          variant: line.variant.name,
          quantity: line.quantity,
          lineTotal: line.lineTotal,
        })),
        subtotal,
        shippingLabel,
        shippingPence,
        total,
        last4,
      });
      router.push("/checkout/success/");
    } catch {
      setError("Payment could not be completed. Please try again.");
      setPaying(false);
    }
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
      <div>
        <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
          {step === "address" ? "Step 1 of 2" : "Step 2 of 2"}
        </p>
        <h1 className="mt-2 font-serif text-4xl">
          {step === "address" ? "Guest checkout" : "Payment"}
        </h1>
        <p className="mt-3 text-sm text-muted">
          No account is required. Visa, Mastercard, and American Express are accepted.{" "}
          {company.vatNote}
        </p>

        {step === "address" ? (
          <div className="mt-8 space-y-5">
            <Field
              id="email"
              label="Email"
              type="email"
              autoComplete="email"
              value={address.email}
              onChange={(value) => setAddressField("email", value)}
            />
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                id="firstName"
                label="First name"
                autoComplete="given-name"
                value={address.firstName}
                onChange={(value) => setAddressField("firstName", value)}
              />
              <Field
                id="lastName"
                label="Last name"
                autoComplete="family-name"
                value={address.lastName}
                onChange={(value) => setAddressField("lastName", value)}
              />
            </div>
            <Field
              id="line1"
              label="Address line 1"
              autoComplete="address-line1"
              value={address.line1}
              onChange={(value) => setAddressField("line1", value)}
            />
            <Field
              id="line2"
              label="Address line 2 (optional)"
              autoComplete="address-line2"
              required={false}
              value={address.line2}
              onChange={(value) => setAddressField("line2", value)}
            />
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                id="city"
                label="City or town"
                autoComplete="address-level2"
                value={address.city}
                onChange={(value) => setAddressField("city", value)}
              />
              <Field
                id="postcode"
                label="Postcode"
                autoComplete="postal-code"
                value={address.postcode}
                onChange={(value) => setAddressField("postcode", value)}
              />
            </div>
            <CountrySelect
              id="country"
              label="Country"
              value={address.country}
              onChange={(value) => setAddressField("country", value)}
            />
            <Field
              id="phone"
              label="Phone for delivery"
              type="tel"
              autoComplete="tel"
              value={address.phone}
              onChange={(value) => setAddressField("phone", value)}
            />
            <div>
              <label htmlFor="notes" className="text-sm">
                Delivery notes (optional)
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                value={address.notes}
                onChange={(event) => setAddressField("notes", event.target.value)}
                className="mt-2 w-full border border-line px-3 py-2"
              />
            </div>

            <label className="flex items-start gap-3 text-sm">
              <input
                type="checkbox"
                className="mt-1"
                checked={sameBilling}
                onChange={(event) => {
                  setSameBilling(event.target.checked);
                  setError(null);
                }}
              />
              Billing address is the same as delivery
            </label>

            {!sameBilling ? (
              <div className="space-y-5 border border-line p-4">
                <p className="text-[12px] uppercase tracking-[0.16em]">Billing address</p>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    id="billingFirstName"
                    label="First name"
                    autoComplete="billing given-name"
                    value={billing.firstName}
                    onChange={(value) => setBilling((current) => ({ ...current, firstName: value }))}
                  />
                  <Field
                    id="billingLastName"
                    label="Last name"
                    autoComplete="billing family-name"
                    value={billing.lastName}
                    onChange={(value) => setBilling((current) => ({ ...current, lastName: value }))}
                  />
                </div>
                <Field
                  id="billingLine1"
                  label="Address line 1"
                  autoComplete="billing address-line1"
                  value={billing.line1}
                  onChange={(value) => setBilling((current) => ({ ...current, line1: value }))}
                />
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    id="billingCity"
                    label="City or town"
                    autoComplete="billing address-level2"
                    value={billing.city}
                    onChange={(value) => setBilling((current) => ({ ...current, city: value }))}
                  />
                  <Field
                    id="billingPostcode"
                    label="Postcode"
                    autoComplete="billing postal-code"
                    value={billing.postcode}
                    onChange={(value) => setBilling((current) => ({ ...current, postcode: value }))}
                  />
                </div>
                <CountrySelect
                  id="billingCountry"
                  label="Billing country"
                  value={billing.country}
                  onChange={(value) => {
                    setBilling((current) => ({ ...current, country: value }));
                    setError(null);
                  }}
                />
              </div>
            ) : null}

            {error && step === "address" ? <p className="text-sm text-red-800">{error}</p> : null}
            <button
              type="button"
              className="btn btn-solid"
              disabled={restricted || !shipping.ok}
              onClick={continueToPayment}
            >
              Continue to payment
            </button>
          </div>
        ) : (
          <div className="mt-8 space-y-5">
            <p className="text-sm">
              Delivering to {address.line1}, {address.city}, {address.postcode}, {countryName}.{" "}
              <button
                type="button"
                className="underline"
                onClick={() => {
                  setStep("address");
                  setError(null);
                }}
              >
                Edit address
              </button>
            </p>
            <Field
              id="cardName"
              label="Name on card"
              autoComplete="cc-name"
              value={cardName}
              onChange={setCardName}
            />
            <Field
              id="cardNumber"
              label="Card number"
              autoComplete="cc-number"
              inputMode="numeric"
              value={cardNumber}
              onChange={(value) => setCardNumber(formatCardNumber(value))}
            />
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                id="expiry"
                label="Expiry (MM/YY)"
                autoComplete="cc-exp"
                inputMode="numeric"
                value={expiry}
                onChange={(value) => setExpiry(formatExpiry(value))}
              />
              <Field
                id="cvc"
                label="Security code"
                autoComplete="cc-csc"
                inputMode="numeric"
                value={cvc}
                onChange={(value) => setCvc(digitsOnly(value).slice(0, 4))}
              />
            </div>
            <p className="text-[13px] text-muted">
              Your card is charged for merchandise and delivery. We keep the last four digits with the order
              confirmation. We do not store the full card number.
            </p>
            {error && step === "payment" ? <p className="text-sm text-red-800">{error}</p> : null}
            <button type="button" className="btn btn-solid" disabled={paying} onClick={() => void pay()}>
              {paying ? "Paying now" : `Pay ${formatGBP(total)}`}
            </button>
          </div>
        )}
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
          <span>Total</span>
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
  value,
  onChange,
  inputMode,
}: {
  id: string;
  label: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  inputMode?: InputHTMLAttributes<HTMLInputElement>["inputMode"];
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
        inputMode={inputMode}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-11 w-full border border-line px-3"
      />
    </div>
  );
}

function CountrySelect({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm">
        {label}
      </label>
      <select
        id={id}
        name={id}
        className="mt-2 h-11 w-full border border-line px-2"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {shippableCountries.map((item) => (
          <option key={item.code} value={item.code}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}
