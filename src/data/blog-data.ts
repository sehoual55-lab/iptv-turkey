/**
 * Blog content model.
 *
 * Articles are plain TypeScript objects so they are type-checked at build time
 * and statically rendered. To add a post: create a file in src/data/articles/,
 * export an `Article`, and register it in the `articles` array below.
 */

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string; id: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'note'; text: string }
  | { type: 'table'; caption?: string; head: string[]; rows: string[][] };

export type Article = {
  slug: string;
  title: string;
  /** <title> tag — may differ from the on-page H1. */
  seoTitle: string;
  description: string;
  /** Short summary shown on cards and in the RSS feed. */
  excerpt: string;
  publishedAt: string; // ISO date
  updatedAt: string; // ISO date
  author: string;
  readingMinutes: number;
  /** Decorative header treatment; no third-party imagery is used. */
  imageAlt: string;
  keyword: string;
  body: Block[];
  faqs?: { question: string; answer: string }[];
  related: string[]; // slugs
};

import { iptvTurkeyNedir } from './articles/iptv-turkey-nedir';
import { iptvTurkeyM3u } from './articles/iptv-turkey-m3u';
import { turkeyIptvM3uKurulum } from './articles/turkey-iptv-m3u-kurulum';

export const articles: Article[] = [
  iptvTurkeyNedir,
  iptvTurkeyM3u,
  turkeyIptvM3uKurulum,
];

/** Newest first. */
export const articlesByDate = [...articles].sort(
  (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
);

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getRelated(article: Article): Article[] {
  return article.related
    .map((slug) => getArticle(slug))
    .filter((a): a is Article => Boolean(a));
}

/** Extracts H2 blocks to build the table of contents. */
export function tableOfContents(article: Article): { id: string; text: string }[] {
  return article.body
    .filter((b): b is Extract<Block, { type: 'h2' }> => b.type === 'h2')
    .map((b) => ({ id: b.id, text: b.text }));
}

export function formatDateTr(iso: string): string {
  return new Intl.DateTimeFormat('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(iso));
}
