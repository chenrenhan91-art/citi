import Link from "next/link";
import { collections } from "@/lib/collections";
import { CoverImage } from "@/components/CoverImage";

export const metadata = {
  title: "Collections",
  description: "Browse Dazzle Your Eyes by category and country.",
};

export default function CollectionsIndexPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-12 lg:px-8">
      <h1 className="font-serif text-4xl">Collections</h1>
      <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
        {collections.map((item) => (
          <Link key={item.slug} href={`/collections/${item.slug}`} className="group block">
            <div className="relative aspect-square overflow-hidden bg-paper">
              <CoverImage src={item.image} alt={item.title} sizes="25vw" />
            </div>
            <h2 className="mt-3 text-center text-[13px] tracking-wide">{item.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
