import { notFound } from "next/navigation";
import { collections, getCollection } from "@/lib/collections";
import { productsIn } from "@/lib/products";
import { CollectionView } from "@/components/CollectionView";

export function generateStaticParams() {
  return collections.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return {};
  return { title: collection.title, description: collection.description };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  return (
    <CollectionView
      title={collection.title}
      description={collection.description}
      image={collection.image}
      products={productsIn(slug)}
    />
  );
}
