"use client";

import Link from "next/link";
import { useState } from "react";
import { CoverImage } from "./CoverImage";

type Country = {
  slug: string;
  name: string;
  coords: string;
  copy: string;
  image: string;
};

export function CountryStrip({ countries }: { countries: Country[] }) {
  const [index, setIndex] = useState(0);
  const current = countries[index];

  return (
    <section className="relative min-h-[80vh]">
      <CoverImage src={current.image} alt={`${current.name} collection`} sizes="100vw" />
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white">
        <p className="text-[13px] tracking-[0.18em]">{current.coords}</p>
        <h2 className="mt-3 font-serif text-5xl uppercase md:text-6xl">{current.name}</h2>
        <p className="mt-4 max-w-md text-lg">{current.copy}</p>
        <Link href={`/collections/${current.slug}`} className="btn btn-ghost mt-8">
          Shop the country
        </Link>
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {countries.map((item, i) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => setIndex(i)}
              className={`h-2 w-8 ${i === index ? "bg-white" : "bg-white/40"}`}
              aria-label={`Show ${item.name}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
