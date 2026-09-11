import { CoverImage } from "./CoverImage";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/lib/types";

export function CollectionView({
  title,
  description,
  image,
  products,
}: {
  title: string;
  description: string;
  image: string;
  products: Product[];
}) {
  return (
    <div>
      <section className="relative min-h-[42vh]">
        <CoverImage src={image} alt="" sizes="100vw" priority />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="font-serif text-4xl md:text-5xl">{title}</h1>
          <p className="mt-4 max-w-xl text-lg">{description}</p>
        </div>
      </section>
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-6 px-4 py-12 lg:grid-cols-4 lg:px-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {products.length === 0 ? (
        <p className="px-4 pb-16 text-center text-muted">Nothing in this collection just now.</p>
      ) : null}
    </div>
  );
}
