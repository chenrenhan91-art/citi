"use client";

import { useState } from "react";
import { CoverImage } from "./CoverImage";

export function ProductGallery({ name, images }: { name: string; images: string[] }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div className="relative aspect-square overflow-hidden bg-paper">
        <CoverImage src={images[active]} alt={name} sizes="50vw" priority />
      </div>
      <div className="mt-3 grid grid-cols-4 gap-3">
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(index)}
            className={`relative aspect-square overflow-hidden ${
              index === active ? "ring-2 ring-olive" : ""
            }`}
            aria-label={`Show image ${index + 1}`}
          >
            <CoverImage src={src} alt="" sizes="120px" />
          </button>
        ))}
      </div>
    </div>
  );
}
