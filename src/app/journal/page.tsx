import Link from "next/link";
import { articles } from "@/lib/journal";
import { CoverImage } from "@/components/CoverImage";

export const metadata = {
  title: "Journal",
  description: "Workshop notes from Dazzle Your Eyes.",
};

export default function JournalPage() {
  return (
    <div className="mx-auto max-w-[1100px] px-4 py-14 lg:px-8">
      <h1 className="font-serif text-4xl">Journal</h1>
      <p className="mt-3 max-w-xl text-muted">Short notes on materials, delivery, and the way the work is made.</p>
      <div className="mt-10 grid gap-10 md:grid-cols-2">
        {articles.map((article) => (
          <Link key={article.slug} href={`/journal/${article.slug}`} className="group block">
            <div className="relative aspect-[4/3] overflow-hidden bg-paper">
              <CoverImage src={article.image} alt="" sizes="50vw" className="transition duration-500 group-hover:scale-[1.03]" />
            </div>
            <p className="mt-4 text-sm text-muted">{article.date}</p>
            <h2 className="mt-2 font-serif text-2xl">{article.title}</h2>
            <p className="mt-2 text-sm leading-6">{article.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
