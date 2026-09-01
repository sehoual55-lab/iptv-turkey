import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { StructuredData } from '@/components/StructuredData';
import { legalPages, getLegalPage } from '@/data/legal-data';
import { formatDateTr } from '@/data/blog-data';
import { pageMetadata, breadcrumbSchema } from '@/lib/seo';

/**
 * Renders the legal and corporate pages from one template.
 *
 * Only the slugs listed in legal-data are generated, so this dynamic segment
 * never shadows the static routes above it.
 */
export function generateStaticParams() {
  return legalPages.map((page) => ({ slug: page.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const page = getLegalPage(slug);
  if (!page) return pageMetadata({ title: 'Sayfa bulunamadı', description: '', path: '/' });

  return pageMetadata({
    title: page.seoTitle,
    description: page.description,
    path: `/${page.slug}/`,
    noIndex: page.noIndex,
  });
}

export default async function LegalPageRoute({ params }: Params) {
  const { slug } = await params;
  const page = getLegalPage(slug);
  if (!page) notFound();

  const trail = [
    { name: 'Ana Sayfa', href: '/' },
    { name: page.title, href: `/${page.slug}/` },
  ];

  return (
    <>
      <StructuredData data={breadcrumbSchema(trail)} />

      <div className="shell py-12 sm:py-16">
        <Breadcrumbs trail={trail} />

        <article className="max-w-prose">
          <h1 className="text-display-md">{page.title}</h1>

          <p className="mt-4 text-sm text-haze">
            Son güncelleme:{' '}
            <time dateTime={page.updated}>{formatDateTr(page.updated)}</time>
          </p>

          <p className="mt-6 text-lead text-mist">{page.intro}</p>

          <div className="mt-12 flex flex-col gap-10">
            {page.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-xl font-bold text-paper">{section.heading}</h2>

                {section.paragraphs?.map((text) => (
                  <p key={text.slice(0, 40)} className="mt-4 leading-relaxed text-mist">
                    {text}
                  </p>
                ))}

                {section.list && (
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {section.list.map((item) => (
                      <li key={item} className="flex gap-3 leading-relaxed text-mist">
                        <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <p className="mt-14 border-t border-navy-600 pt-8 text-sm text-mist">
            Bu sayfayla ilgili sorularınız için{' '}
            <Link href="/iletisim/" className="text-brand-300 underline underline-offset-2 hover:text-brand-400">
              iletişim sayfamızı
            </Link>{' '}
            kullanabilirsiniz.
          </p>
        </article>
      </div>
    </>
  );
}
