"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { formatGBP } from "@/lib/format";
import { company } from "@/lib/company";
import { useCart } from "@/lib/cart";
import { readOrder, type PlacedOrder } from "@/lib/order";

export default function CheckoutSuccessPage() {
  const { clear } = useCart();
  const [order, setOrder] = useState<PlacedOrder | null | undefined>(undefined);

  useEffect(() => {
    const placed = readOrder();
    setOrder(placed);
    if (placed) clear();
  }, [clear]);

  if (order === undefined) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16">
        <p className="text-sm text-muted">Loading your confirmation.</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16">
        <h1 className="font-serif text-4xl">No recent order</h1>
        <p className="mt-4">
          We could not find a confirmation in this browser session.{" "}
          <Link href="/collections/shop-all" className="underline">
            Continue shopping
          </Link>
          .
        </p>
      </div>
    );
  }

  const placed = new Date(order.placedAt).toLocaleString("en-GB", {
    dateStyle: "long",
    timeStyle: "short",
  });

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 lg:px-8">
      <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Thank you</p>
      <h1 className="mt-2 font-serif text-4xl">Order confirmed</h1>
      <p className="mt-4 text-sm text-muted">
        Order {order.id} · {placed}. A confirmation will be sent to {order.email}.
      </p>

      <div className="mt-10 border border-line p-6">
        <h2 className="text-[12px] uppercase tracking-[0.16em]">Items</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {order.lines.map((line) => (
            <li key={`${line.name}-${line.variant}`} className="flex justify-between gap-3">
              <span>
                {line.name} ({line.variant}) × {line.quantity}
              </span>
              <span>{formatGBP(line.lineTotal)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 flex justify-between text-sm">
          <span>Merchandise (incl. VAT)</span>
          <span>{formatGBP(order.subtotal)}</span>
        </p>
        <p className="mt-2 flex justify-between text-sm">
          <span>{order.shippingLabel}</span>
          <span>{order.shippingPence === 0 ? "Free" : formatGBP(order.shippingPence)}</span>
        </p>
        <p className="mt-4 flex justify-between border-t border-line pt-4 font-medium">
          <span>Total paid</span>
          <span>{formatGBP(order.total)}</span>
        </p>
        <p className="mt-4 text-sm text-muted">Charged to card ending {order.last4}.</p>
        <p className="mt-2 text-sm text-muted">Delivering to {order.shipTo}.</p>
      </div>

      <p className="mt-8 text-sm">
        Sold by {company.legalName}, {company.addressSingle}. Questions:{" "}
        <a className="underline" href={`mailto:${company.inboxEmail}`}>
          {company.email}
        </a>
        .
      </p>
      <Link href="/collections/shop-all" className="btn btn-solid mt-8">
        Continue shopping
      </Link>
    </div>
  );
}
