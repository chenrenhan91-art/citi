import Link from "next/link";
import type { Product } from "@/lib/types";
import { CoverImage } from "./CoverImage";
import { Price } from "./Price";

export function ProductCard({ product }: { product: Product }) {
  const variant = product.variants[0];
  return (
    <article>
      <Link href={`/products/${product.slug}`} className="group block">
        <div className="relative aspect-square overflow-hidden bg-paper">
          <CoverImage
            src={product.images[0]}
            alt={product.name}
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="transition duration-500 group-hover:scale-[1.03]"
          />
          {product.archive ? (
            <span className="absolute left-3 top-3 bg-white px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-olive">
              Archive
            </span>
          ) : null}
        </div>
        <div className="pt-4 text-center">
          <h3 className="text-[13px] tracking-wide">{product.name}</h3>
          <p className="mt-1 text-[12px] text-muted">Crafted in {product.madeIn}</p>
          <div className="mt-2 flex justify-center">
            <Price price={variant.price} compareAt={variant.compareAt} />
          </div>
        </div>
      </Link>
    </article>
  );
}
