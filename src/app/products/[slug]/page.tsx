import { notFound } from "next/navigation";
import Link from "next/link";
import { products, getProduct, relatedProducts } from "@/lib/products";
import { shippingNoteForProduct } from "@/lib/shipping";
import { ProductCard } from "@/components/ProductCard";
import { ProductBuyBox } from "@/components/ProductBuyBox";
import { ProductGallery } from "@/components/ProductGallery";

export function generateStaticParams() {
  return products.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return { title: product.name, description: product.blurb };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const related = relatedProducts(product);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 lg:px-8">
      <p className="text-[12px] text-muted">
        <Link href="/collections/shop-all" className="hover:text-olive">
          Shop
        </Link>
        {" / "}
        <Link href={`/collections/${product.collections[0]}`} className="hover:text-olive">
          {product.collections[0]}
        </Link>
        {" / "}
        {product.name}
      </p>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <ProductGallery name={product.name} images={product.images} />
        <div>
          <p className="text-[12px] uppercase tracking-[0.16em] text-muted">
            Crafted in {product.madeIn}
          </p>
          <h1 className="mt-2 font-serif text-4xl leading-[1.15]">{product.name}</h1>
          <div className="mt-6">
            <ProductBuyBox product={product} />
          </div>
        </div>
      </div>

      <div className="mt-16 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-2xl">The piece</h2>
          <p className="mt-4 max-w-[65ch] text-[17px] leading-8">{product.description}</p>
        </div>
        <div>
          <h2 className="font-serif text-2xl">Details</h2>
          <ul className="mt-4 space-y-2 text-[15px]">
            {product.details.map((item) => (
              <li key={item}>{item}</li>
            ))}
            <li>Materials: {product.materials}</li>
            <li>Made in {product.madeIn}</li>
            <li>Care: {product.care}</li>
          </ul>
        </div>
      </div>

      <section className="mt-16 border-t border-line pt-10">
        <h2 className="font-serif text-2xl">Shipping and returns</h2>
        <p className="mt-4 max-w-[65ch] leading-7">{shippingNoteForProduct(product.shipClass)}</p>
        <p className="mt-3 max-w-[65ch] leading-7">
          Most in-stock pieces leave our West Drayton warehouse within 2-4 working days. Oversized rugs and furniture
          use a booked two-person service. Full tables live on our{" "}
          <Link href="/shipping" className="underline">
            shipping
          </Link>{" "}
          and{" "}
          <Link href="/returns" className="underline">
            returns
          </Link>{" "}
          pages. Guest checkout is available.
        </p>
      </section>

      <section className="mt-16">
        <h2 className="font-serif text-2xl">Reviews</h2>
        <p className="mt-3 text-muted">
          {product.reviewScore.toFixed(1)} from {product.reviewCount} customer reviews
        </p>
      </section>

      <section className="mt-16">
        <h2 className="font-serif text-2xl">You may also like</h2>
        <div className="mt-8 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {related.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
