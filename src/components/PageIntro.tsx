import type { ReactNode } from "react";

export function PageIntro({
  title,
  lede,
  children,
}: {
  title: string;
  lede?: string;
  children: ReactNode;
}) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-14 lg:px-0">
      <h1 className="font-serif text-4xl leading-[1.15]">{title}</h1>
      {lede ? <p className="mt-4 text-lg text-muted">{lede}</p> : null}
      <div className="prose-page mt-8 space-y-4 text-[16px] leading-7">{children}</div>
    </article>
  );
}
