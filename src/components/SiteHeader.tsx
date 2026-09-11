"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  MagnifyingGlass,
  User,
  Bag,
  X,
  List,
} from "@phosphor-icons/react";
import { company } from "@/lib/company";
import { collections } from "@/lib/collections";
import { searchProducts } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { formatGBP } from "@/lib/format";
import { CoverImage } from "./CoverImage";

const shopLinks = collections.filter((item) => item.nav);

export function SiteHeader() {
  const { count, lines, quote } = useCart();
  const [shopOpen, setShopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [bagOpen, setBagOpen] = useState(false);
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchProducts(query).slice(0, 8), [query]);
  const shipping = quote("GB");

  useEffect(() => {
    document.body.style.overflow =
      mobileOpen || searchOpen || bagOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen, searchOpen, bagOpen]);

  return (
    <header className="sticky top-0 z-40 bg-white">
      <p className="bg-olive px-4 py-2 text-center text-[11px] tracking-[0.14em] text-white">
        Free UK shipping on bedding and bath. Standard UK delivery free from £250.
        Prices in GBP, VAT included.
      </p>
      <div className="relative border-b border-line">
        <div className="mx-auto grid max-w-[1400px] grid-cols-3 items-center px-4 py-4 lg:px-8">
          <div className="flex items-center gap-6">
            <button
              type="button"
              className="lg:hidden"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
            >
              <List size={22} />
            </button>
            <nav className="hidden items-center gap-7 lg:flex">
              <button
                type="button"
                className="nav-link"
                onMouseEnter={() => setShopOpen(true)}
                onClick={() => setShopOpen((value) => !value)}
              >
                Shop
              </button>
              <Link href="/about" className="nav-link">
                Our Story
              </Link>
              <Link href="/journal" className="nav-link">
                Journal
              </Link>
            </nav>
          </div>
          <Link href="/" className="wordmark justify-self-center text-center text-[13px] sm:text-[15px]">
            {company.wordmark}
          </Link>
          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
            >
              <MagnifyingGlass size={20} />
            </button>
            <Link href="/account" aria-label="Account">
              <User size={20} />
            </Link>
            <button
              type="button"
              aria-label={`Bag, ${count} items`}
              className="relative"
              onClick={() => setBagOpen(true)}
            >
              <Bag size={20} />
              {count > 0 ? (
                <span className="absolute -right-2 -top-2 min-w-4 rounded-full bg-olive px-1 text-center text-[10px] text-white">
                  {count}
                </span>
              ) : null}
            </button>
          </div>
        </div>

        {shopOpen ? (
          <div
            className="absolute left-0 right-0 top-full hidden border-b border-line bg-white lg:block"
            onMouseLeave={() => setShopOpen(false)}
          >
            <div className="mx-auto grid max-w-[1400px] grid-cols-4 gap-8 px-8 py-10">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Shop</p>
                <ul className="mt-4 space-y-2">
                  {shopLinks.slice(0, 6).map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={`/collections/${item.slug}`}
                        className="text-[15px] hover:text-olive"
                        onClick={() => setShopOpen(false)}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted">More</p>
                <ul className="mt-4 space-y-2">
                  {shopLinks.slice(6).map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={`/collections/${item.slug}`}
                        className="text-[15px] hover:text-olive"
                        onClick={() => setShopOpen(false)}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-span-2 grid grid-cols-2 gap-4">
                <Link href="/collections/rugs" onClick={() => setShopOpen(false)} className="relative aspect-[4/3] overflow-hidden">
                  <CoverImage src="/images/cat-rugs.jpg" alt="Rugs" />
                  <span className="absolute inset-x-0 bottom-4 text-center text-[11px] uppercase tracking-[0.18em] text-white">
                    Rugs
                  </span>
                </Link>
                <Link href="/collections/bedding" onClick={() => setShopOpen(false)} className="relative aspect-[4/3] overflow-hidden">
                  <CoverImage src="/images/cat-bedding.jpg" alt="Bedding" />
                  <span className="absolute inset-x-0 bottom-4 text-center text-[11px] uppercase tracking-[0.18em] text-white">
                    Bedding
                  </span>
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 bg-white lg:hidden">
          <div className="flex items-center justify-between border-b border-line px-4 py-4">
            <span className="wordmark text-[12px]">{company.wordmark}</span>
            <button type="button" aria-label="Close menu" onClick={() => setMobileOpen(false)}>
              <X size={22} />
            </button>
          </div>
          <nav className="space-y-4 overflow-y-auto px-6 py-8">
            <Link href="/about" onClick={() => setMobileOpen(false)} className="block text-lg">
              Our Story
            </Link>
            <Link href="/journal" onClick={() => setMobileOpen(false)} className="block text-lg">
              Journal
            </Link>
            <p className="pt-4 text-[11px] uppercase tracking-[0.18em] text-muted">Shop</p>
            {shopLinks.map((item) => (
              <Link
                key={item.slug}
                href={`/collections/${item.slug}`}
                onClick={() => setMobileOpen(false)}
                className="block"
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}

      {searchOpen ? (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="mx-auto max-w-3xl px-4 py-8">
            <div className="flex justify-end">
              <button type="button" aria-label="Close search" onClick={() => setSearchOpen(false)}>
                <X size={22} />
              </button>
            </div>
            <form action={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/search/`} className="mt-8">
              <label htmlFor="q" className="text-[11px] uppercase tracking-[0.18em] text-muted">
                Search
              </label>
              <input
                id="q"
                name="q"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="mt-2 w-full border-b border-ink bg-transparent py-3 text-2xl"
                placeholder="Rugs, linen, Portugal..."
                autoFocus
              />
            </form>
            <ul className="mt-8 divide-y divide-line">
              {results.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/products/${item.slug}`}
                    className="flex items-center gap-4 py-3"
                    onClick={() => setSearchOpen(false)}
                  >
                    <span className="relative block h-16 w-16 overflow-hidden bg-paper">
                      <CoverImage src={item.images[0]} alt="" sizes="64px" />
                    </span>
                    <span>
                      <span className="block">{item.name}</span>
                      <span className="text-sm text-muted">{formatGBP(item.variants[0].price)}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}

      {bagOpen ? (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/30">
          <button
            type="button"
            className="h-full flex-1"
            aria-label="Close bag"
            onClick={() => setBagOpen(false)}
          />
          <aside className="flex h-full w-full max-w-md flex-col bg-white">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <h2 className="text-[12px] uppercase tracking-[0.18em]">Your bag</h2>
              <button type="button" aria-label="Close bag" onClick={() => setBagOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {lines.length === 0 ? (
                <p className="text-muted">Your bag is empty.</p>
              ) : (
                <ul className="space-y-4">
                  {lines.map((line) => (
                    <li key={`${line.product.id}-${line.variant.id}`} className="flex gap-3">
                      <span className="relative h-20 w-20 overflow-hidden bg-paper">
                        <CoverImage src={line.product.images[0]} alt="" sizes="80px" />
                      </span>
                      <span className="flex-1 text-sm">
                        <span className="block">{line.product.name}</span>
                        <span className="text-muted">{line.variant.name}</span>
                        <span className="mt-1 block">
                          {line.quantity} × {formatGBP(line.variant.price)}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="border-t border-line px-5 py-4">
              <p className="flex justify-between text-sm">
                <span>Merchandise</span>
                <span>{formatGBP(lines.reduce((sum, line) => sum + line.lineTotal, 0))}</span>
              </p>
              <p className="mt-2 text-sm">
                {shipping.ok ? (
                  <>
                    <span className="flex justify-between">
                      <span>{shipping.label}</span>
                      <span>{shipping.pence === 0 ? "Free" : formatGBP(shipping.pence)}</span>
                    </span>
                    <span className="mt-2 block text-[13px] text-muted">{shipping.detail}</span>
                  </>
                ) : (
                  <span className="text-muted">{shipping.message}</span>
                )}
              </p>
              <p className="mt-3 text-[12px] text-muted">
                Guest checkout is available. No account is required. Delivery is estimated for the United Kingdom here; other countries are calculated on the bag page.
              </p>
              <Link href="/cart" className="btn btn-solid mt-4 w-full" onClick={() => setBagOpen(false)}>
                View bag
              </Link>
            </div>
          </aside>
        </div>
      ) : null}
    </header>
  );
}
