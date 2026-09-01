import Link from 'next/link';
import { formatDateTr, type Article } from '@/data/blog-data';

export function BlogCard({ article }: { article: Article }) {
  return (
    <article className="card flex flex-col p-6">
      <p className="text-xs text-haze">
        <time dateTime={article.publishedAt}>{formatDateTr(article.publishedAt)}</time>
        {' · '}
        {article.readingMinutes} dakikalık okuma
      </p>

      <h3 className="mt-3 font-display text-lg font-semibold leading-snug">
        <Link href={`/blog/${article.slug}/`} className="hover:text-brand-300">
          {article.title}
        </Link>
      </h3>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-mist">{article.excerpt}</p>

      <Link
        href={`/blog/${article.slug}/`}
        className="mt-5 font-display text-sm font-semibold text-brand-300 hover:text-brand-400"
      >
        Yazıyı oku
      </Link>
    </article>
  );
}
