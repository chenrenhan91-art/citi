"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useCart } from "@/lib/cart";
import { formatGBP } from "@/lib/format";
import { shippableCountries } from "@/lib/countries";
import { CoverImage } from "@/components/CoverImage";

export default function CartPage() {
  const { lines, setQuantity, removeItem, quote, subtotal } = useCart();
  const [country, setCountry] = useState("GB");
  const shipping = useMemo(() => quote(country), [quote, country]);
  const total = shipping.ok ? subtotal + shipping.pence : subtotal;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 lg:px-8">
      <h1 className="font-serif text-4xl">Your bag</h1>
      <p className="mt-2 text-sm text-muted">
        You can check out as a guest. No account is required. Delivery is shown below and will match checkout.
      </p>

      {lines.length === 0 ? (
        <p className="mt-10">
          Your bag is empty.{" "}
          <Link href="/collections/shop-all" className="underline">
            Continue shopping
          </Link>
        </p>
      ) : (
        <div className="mt-10 grid gap-12 lg:grid-cols-[1.4fr_0.8fr]">
          <ul className="divide-y divide-line border-y border-line">
            {lines.map((line) => (
              <li key={`${line.product.id}-${line.variant.id}`} className="flex gap-4 py-6">
                <Link href={`/products/${line.product.slug}`} className="relative h-28 w-28 shrink-0 overflow-hidden bg-paper">
                  <CoverImage src={line.product.images[0]} alt={line.product.name} sizes="112px" />
                </Link>
                <div className="flex-1">
                  <Link href={`/products/${line.product.slug}`} className="font-medium">
                    {line.product.name}
                  </Link>
                  <p className="text-sm text-muted">{line.variant.name}</p>
                  <p className="mt-1 text-sm">{formatGBP(line.variant.price)}</p>
                  <div className="mt-3 flex items-center gap-3">
                    <label className="text-sm" htmlFor={`qty-${line.variant.id}`}>
                      Qty
                    </label>
                    <select
                      id={`qty-${line.variant.id}`}
                      className="h-10 border border-line px-2"
                      value={line.quantity}
                      onChange={(event) =>
                        setQuantity(line.product.id, line.variant.id, Number(event.target.value))
                      }
                    >
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      className="text-sm underline"
                      onClick={() => removeItem(line.product.id, line.variant.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <p className="text-sm">{formatGBP(line.lineTotal)}</p>
              </li>
            ))}
          </ul>

          <aside className="h-fit border border-line p-6">
            <h2 className="text-[12px] uppercase tracking-[0.16em]">Order summary</h2>
            <label htmlFor="ship-country" className="mt-4 block text-sm">
              Ship to
            </label>
            <select
              id="ship-country"
              className="mt-2 h-11 w-full border border-line px-2"
              value={country}
              onChange={(event) => setCountry(event.target.value)}
            >
              {shippableCountries.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.name}
                </option>
              ))}
            </select>
            <p className="mt-4 flex justify-between text-sm">
              <span>Merchandise (incl. VAT)</span>
              <span>{formatGBP(subtotal)}</span>
            </p>
            <div className="mt-3 text-sm">
              {shipping.ok ? (
                <>
                  <p className="flex justify-between">
                    <span>{shipping.label}</span>
                    <span>{shipping.pence === 0 ? "Free" : formatGBP(shipping.pence)}</span>
                  </p>
                  <p className="mt-2 text-[13px] text-muted">{shipping.detail}</p>
                </>
              ) : (
                <p className="text-red-800">{shipping.message}</p>
              )}
            </div>
            <p className="mt-4 flex justify-between border-t border-line pt-4 font-medium">
              <span>Estimated total</span>
              <span>{formatGBP(total)}</span>
            </p>
            {shipping.ok ? (
              <Link href="/checkout" className="btn btn-solid mt-6 w-full">
                Guest checkout
              </Link>
            ) : (
              <p className="mt-6 text-sm">Choose an eligible destination to continue.</p>
            )}
            <p className="mt-3 text-[12px] text-muted">
              Guest checkout takes card payment. No account is required.
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}
