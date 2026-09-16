import Link from "next/link";
import { productsIn } from "@/lib/products";
import { countriesOnHome } from "@/lib/collections";
import { company } from "@/lib/company";
import { CoverImage } from "@/components/CoverImage";
import { ProductCard } from "@/components/ProductCard";
import { CountryStrip } from "@/components/CountryStrip";

const categories = [
  { href: "/collections/bedding", label: "Bedding", image: "/images/cat-bedding.jpg", alt: "Stonewashed linen bedding" },
  { href: "/collections/rugs", label: "Rugs", image: "/images/cat-rugs.jpg", alt: "Hand-knotted wool rug" },
  { href: "/collections/pillows", label: "Pillows", image: "/images/cat-pillows.jpg", alt: "Woven pillows on a sofa" },
  { href: "/collections/furniture", label: "Furniture", image: "/images/cat-furniture.jpg", alt: "Oak lounge chair" },
  { href: "/collections/baskets", label: "Baskets", image: "/images/cat-baskets.jpg", alt: "Palm and seagrass baskets" },
];

export default function HomePage() {
  const featured = productsIn("best-sellers").slice(0, 4);

  return (
    <>
      <section className="relative min-h-[100dvh]">
        <CoverImage
          src="/images/hero-living.jpg"
          alt="Sunlit living room with a hand-knotted wool rug and linen sofa"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/15 to-black/10" />
        <div className="absolute inset-0 flex items-center justify-center px-4 pt-16">
          <div className="max-w-3xl text-center text-white">
            <h1 className="font-serif text-4xl leading-[1.15] md:text-5xl lg:text-[48px]">
              The art of living well, crafted around the world
            </h1>
            <p className="mt-4 text-lg md:text-[28px] md:leading-snug">
              Artisan made. Heirloom minded.
            </p>
            <Link href="/collections/shop-all" className="btn btn-ghost mt-8">
              Shop the house
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 text-center lg:px-8">
        <p className="mx-auto max-w-2xl font-serif text-2xl leading-snug md:text-[28px]">
          The art of living well, crafted around the world.
        </p>
        <p className="mt-3 font-serif text-2xl md:text-[28px]">Artisan made. Heirloom minded.</p>
        <div className="mx-auto mt-12 grid max-w-[1400px] grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((item) => (
            <Link key={item.href} href={item.href} className="group relative block">
              <div className="relative aspect-square overflow-hidden bg-paper">
                <CoverImage src={item.image} alt={item.alt} sizes="20vw" className="transition duration-500 group-hover:scale-[1.03]" />
              </div>
              <span className="btn btn-outline mt-4 w-full">{item.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative min-h-[70vh]">
        <CoverImage
          src="/images/banner-rugs.jpg"
          alt="Hand-knotted wool rug in a sunlit studio"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="max-w-xl text-center text-white">
            <h2 className="font-serif text-4xl md:text-5xl">Made the long way</h2>
            <p className="mt-4 text-lg">
              Limited hand-knotted rugs in New Zealand wool, dyed in sun-faded tones that sit quietly on oak floors.
            </p>
            <Link href="/collections/rugs" className="btn btn-ghost mt-8">
              Shop now
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1400px] grid-cols-1 md:grid-cols-2">
        <Link href="/collections/archive-sale" className="group relative min-h-[70vh]">
          <CoverImage src="/images/split-archive.jpg" alt="Linen bedding from the archive sale" sizes="50vw" />
          <span className="btn btn-ghost absolute bottom-8 left-1/2 -translate-x-1/2">
            Archive Sale: last lengths
          </span>
        </Link>
        <Link href="/collections/best-sellers" className="group relative min-h-[70vh]">
          <CoverImage src="/images/split-bestsellers.jpg" alt="Bestselling home objects on a coffee table" sizes="50vw" />
          <span className="btn btn-ghost absolute bottom-8 left-1/2 -translate-x-1/2">
            Best Sellers
          </span>
        </Link>
      </section>

      <section className="px-4 py-16 lg:px-8">
        <h2 className="text-center font-serif text-3xl">Pieces we keep remaking</h2>
        <div className="mx-auto mt-10 grid max-w-[1400px] grid-cols-2 gap-6 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="relative min-h-[70vh]">
        <CoverImage
          src="/images/banner-makers.jpg"
          alt="Textile workshop with wooden looms and dyed wool"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="max-w-xl text-center text-white">
            <h2 className="font-serif text-4xl md:text-5xl">Paid fairly. Made in small lots.</h2>
            <p className="mt-4 text-lg">
              We design with workshops we visit, pay on agreed terms, and sell from the United Kingdom without a showroom markup.
            </p>
            <Link href="/makers" className="btn btn-ghost mt-8">
              Our commitment
            </Link>
          </div>
        </div>
      </section>

      <CountryStrip countries={countriesOnHome} />

      <section className="mx-auto max-w-[900px] px-4 py-20 text-center lg:px-8">
        <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Company</p>
        <h2 className="mt-3 font-serif text-3xl md:text-4xl">{company.legalName}</h2>
        <p className="mt-6 text-base leading-relaxed">
          {company.storeName} is the trading name of {company.legalName}, a company registered in England.
          Goods are sold from our premises at {company.addressSingle}.
        </p>
        <p className="mt-4 text-base">
          {company.hours}
        </p>
        <p className="mt-4 text-base">
          <a className="underline" href={`mailto:${company.inboxEmail}`}>
            {company.email}
          </a>
        </p>
        <p className="mt-4 text-sm text-muted">
          {company.vatNote} We ship worldwide except to restricted destinations listed in our shipping policy.
        </p>
      </section>
    </>
  );
}
