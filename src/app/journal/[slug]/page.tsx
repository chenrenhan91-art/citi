import { notFound } from "next/navigation";
import Link from "next/link";
import { articles, getArticle } from "@/lib/journal";
import { CoverImage } from "@/components/CoverImage";

export function generateStaticParams() {
  return articles.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return { title: article.title, description: article.excerpt };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <article>
      <section className="relative min-h-[42vh]">
        <CoverImage src={article.image} alt="" sizes="100vw" priority />
        <div className="absolute inset-0 bg-black/35" />
      </section>
      <div className="mx-auto max-w-3xl px-4 py-12">
        <p className="text-sm text-muted">
          <Link href="/journal">Journal</Link> / {article.date}
        </p>
        <h1 className="mt-3 font-serif text-4xl leading-[1.15]">{article.title}</h1>
        <div className="mt-8 space-y-4 text-[17px] leading-8">
          {article.body.map((para) => (
            <p key={para}>{para}</p>
          ))}
        </div>
      </div>
    </article>
  );
}
