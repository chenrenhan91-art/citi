"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo } from "react";
import { searchProducts } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

function SearchResults() {
  const params = useSearchParams();
  const q = params.get("q") ?? "";
  const results = useMemo(() => searchProducts(q), [q]);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-12 lg:px-8">
      <h1 className="font-serif text-4xl">Search</h1>
      <form className="mt-6 max-w-xl">
        <label htmlFor="search-q" className="text-sm">
          Find a piece
        </label>
        <input
          id="search-q"
          name="q"
          defaultValue={q}
          className="mt-2 h-11 w-full border border-line px-3"
          placeholder="Linen, rug, Portugal..."
        />
      </form>
      <p className="mt-6 text-sm text-muted">
        {q ? `${results.length} result${results.length === 1 ? "" : "s"} for “${q}”` : "Type a word and press enter."}
      </p>
      <div className="mt-8 grid grid-cols-2 gap-6 lg:grid-cols-4">
        {results.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {q && results.length === 0 ? (
        <p className="mt-6">
          Nothing matched. <Link href="/collections/shop-all" className="underline">Shop all</Link>
        </p>
      ) : null}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="px-4 py-12">Loading search...</div>}>
      <SearchResults />
    </Suspense>
  );
}
