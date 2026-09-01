import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, CalendarDays, RefreshCw } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ArticleBody } from '@/components/ArticleBody';
import { BlogCard } from '@/components/BlogCard';
import { FAQAccordion } from '@/components/FAQAccordion';
import { StructuredData } from '@/components/StructuredData';
import { CheckoutTrigger } from '@/components/CheckoutTrigger';
import {
  articles,
  getArticle,
  getRelated,
  tableOfContents,
  formatDateTr,
} from '@/data/blog-data';
import { pageMetadata, blogPostingSchema, breadcrumbSchema, faqSchema } from '@/lib/seo';

/** One static page per article at build time. */
export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) return pageMetadata({ title: 'Yazı bulunamadı', description: '', path: '/blog/' });

  return pageMetadata({
    title: article.seoTitle,
    description: article.description,
    path: `/blog/${article.slug}/`,
    type: 'article',
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
  });
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const toc = tableOfContents(article);
  const related = getRelated(article);

  const trail = [
    { name: 'Ana Sayfa', href: '/' },
    { name: 'Blog', href: '/blog/' },
    { name: article.title, href: `/blog/${article.slug}/` },
  ];

  const schemas: object[] = [
    blogPostingSchema({
      title: article.title,
      description: article.description,
      slug: article.slug,
      publishedAt: article.publishedAt,
      updatedAt: article.updatedAt,
      author: article.author,
    }),
    breadcrumbSchema(trail),
  ];
  // Only claim FAQPage when the questions are actually rendered below.
  if (article.faqs?.length) schemas.push(faqSchema(article.faqs));

  return (
    <>
      <StructuredData data={schemas} />

      <div className="shell py-12 sm:py-16">
        <Breadcrumbs trail={trail} />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <article className="lg:col-span-8">
            <header>
              <p className="eyebrow">{article.keyword}</p>
              <h1 className="text-display-md">{article.title}</h1>

              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-haze">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays aria-hidden="true" className="h-4 w-4" />
                  <time dateTime={article.publishedAt}>{formatDateTr(article.publishedAt)}</time>
                </span>
                {article.updatedAt !== article.publishedAt && (
                  <span className="inline-flex items-center gap-1.5">
                    <RefreshCw aria-hidden="true" className="h-4 w-4" />
                    Güncellendi: <time dateTime={article.updatedAt}>{formatDateTr(article.updatedAt)}</time>
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5">
                  <Clock aria-hidden="true" className="h-4 w-4" />
                  {article.readingMinutes} dakikalık okuma
                </span>
                <span>{article.author}</span>
              </div>
            </header>

            {/* Table of contents — mobile position; the sidebar takes over on desktop */}
            {toc.length > 0 && (
              <nav aria-label="İçindekiler" className="card mt-8 p-5 lg:hidden">
                <p className="font-display text-sm font-bold text-paper">İçindekiler</p>
                <ol className="mt-3 flex flex-col gap-2">
                  {toc.map((item, i) => (
                    <li key={item.id} className="text-sm">
                      <a href={`#${item.id}`} className="text-mist hover:text-brand-300">
                        <span className="mr-2 text-haze">{i + 1}.</span>
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            <div className="mt-10">
              <ArticleBody blocks={article.body} />
            </div>

            {article.faqs?.length ? (
              <section className="mt-14" aria-labelledby="yazi-sss">
                <h2 id="yazi-sss" className="font-display text-2xl font-bold">
                  Sıkça sorulan sorular
                </h2>
                <div className="mt-6">
                  <FAQAccordion faqs={article.faqs} />
                </div>
              </section>
            ) : null}

            {/* Closing call to action */}
            <section className="card mt-14 p-7">
              <h2 className="font-display text-xl font-bold">Paketleri incelemek ister misiniz?</h2>
              <p className="mt-3 text-mist">
                Cihazınıza uygun süreyi ve eş zamanlı bağlantı sayısını birlikte belirleyelim.
                Emin değilseniz cihaz modelinizi yazmanız yeterli.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <CheckoutTrigger className="btn-primary">Abone Ol</CheckoutTrigger>
                <Link href="/#paketler" className="btn-secondary">
                  Paketleri İncele
                </Link>
              </div>
            </section>

            {related.length > 0 && (
              <section className="mt-14" aria-labelledby="ilgili-yazilar">
                <h2 id="ilgili-yazilar" className="font-display text-2xl font-bold">
                  İlgili yazılar
                </h2>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  {related.map((item) => (
                    <BlogCard key={item.slug} article={item} />
                  ))}
                </div>
              </section>
            )}
          </article>

          {/* Sticky sidebar on desktop */}
          <aside className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-28 flex flex-col gap-5">
              {toc.length > 0 && (
                <nav aria-label="İçindekiler" className="card p-5">
                  <p className="font-display text-sm font-bold text-paper">İçindekiler</p>
                  <ol className="mt-3 flex flex-col gap-2">
                    {toc.map((item, i) => (
                      <li key={item.id} className="text-sm leading-snug">
                        <a href={`#${item.id}`} className="text-mist hover:text-brand-300">
                          <span className="mr-2 text-haze">{i + 1}.</span>
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}

              <div className="card p-5">
                <p className="font-display text-sm font-bold text-paper">Yardım gerekirse</p>
                <p className="mt-2 text-sm leading-relaxed text-mist">
                  Cihazınızın uyumlu olup olmadığından emin değilseniz model adını yazın,
                  kısa sürede yanıtlayalım.
                </p>
                <CheckoutTrigger className="btn-primary mt-4 w-full">Abone Ol</CheckoutTrigger>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
