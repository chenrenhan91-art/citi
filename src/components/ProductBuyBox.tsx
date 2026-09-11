"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/lib/types";
import { useCart } from "@/lib/cart";
import { shippingNoteForProduct } from "@/lib/shipping";
import { Price } from "./Price";

export function ProductBuyBox({ product }: { product: Product }) {
  const { addItem } = useCart();
  const router = useRouter();
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const variant = useMemo(
    () => product.variants.find((item) => item.id === variantId) ?? product.variants[0],
    [product.variants, variantId],
  );

  return (
    <div>
      <Price price={variant.price} compareAt={variant.compareAt} />
      <p className="mt-2 text-sm text-muted">{product.blurb}</p>
      {product.variants.length > 1 ? (
        <div className="mt-6">
          <p className="text-[11px] uppercase tracking-[0.16em]">Size</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.variants.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setVariantId(item.id)}
                className={`border px-3 py-2 text-sm ${
                  item.id === variant.id ? "border-olive bg-olive text-white" : "border-line"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <p className="mt-4 text-sm text-muted">{variant.name}</p>
      )}

      <div className="mt-6">
        <label htmlFor="qty" className="text-[11px] uppercase tracking-[0.16em]">
          Quantity
        </label>
        <select
          id="qty"
          className="mt-2 block h-11 w-24 border border-line px-2"
          value={quantity}
          onChange={(event) => setQuantity(Number(event.target.value))}
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        className="btn btn-solid mt-6 w-full"
        onClick={() => {
          addItem(product.id, variant.id, quantity);
          setAdded(true);
        }}
      >
        Add to bag
      </button>
      {added ? (
        <button
          type="button"
          className="btn btn-outline mt-3 w-full"
          onClick={() => router.push("/cart")}
        >
          View bag
        </button>
      ) : null}

      <div className="mt-6 space-y-2 text-sm">
        <p>{product.inStock ? "In stock. Ready to ship." : "Made to order."}</p>
        <p>
          {product.finalSale
            ? "Final sale. You can still return faulty goods under the Consumer Rights Act 2015."
            : "Easy 30-day returns from delivery, unless marked final sale."}
        </p>
        <p className="text-muted">{shippingNoteForProduct(product.shipClass, "GB")}</p>
      </div>
    </div>
  );
}
