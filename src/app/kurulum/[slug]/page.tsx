import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, Lightbulb, Wrench } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { StructuredData } from '@/components/StructuredData';
import { CheckoutTrigger } from '@/components/CheckoutTrigger';
import { guides, getGuide } from '@/data/guides-data';
import { pageMetadata, breadcrumbSchema } from '@/lib/seo';
import { absoluteUrl } from '@/data/site-config';

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return pageMetadata({ title: 'Rehber bulunamadı', description: '', path: '/kurulum/' });

  return pageMetadata({
    title: guide.seoTitle,
    description: guide.description,
    path: `/kurulum/${guide.slug}/`,
  });
}

export default async function GuidePage({ params }: Params) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const trail = [
    { name: 'Ana Sayfa', href: '/' },
    { name: 'Kurulum', href: '/kurulum/' },
    { name: guide.name, href: `/kurulum/${guide.slug}/` },
  ];

  // HowTo describes a procedure — appropriate here, unlike on a prose page.
  const howTo = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: guide.title,
    description: guide.description,
    inLanguage: 'tr-TR',
    totalTime: `PT${guide.minutes}M`,
    step: guide.steps.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: step.title,
      text: step.text,
      url: absoluteUrl(`/kurulum/${guide.slug}/#adim-${i + 1}`),
    })),
  };

  return (
    <>
      <StructuredData data={[breadcrumbSchema(trail), howTo]} />

      <div className="shell py-12 sm:py-16">
        <Breadcrumbs trail={trail} />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <article className="lg:col-span-8">
            <p className="eyebrow">Kurulum</p>
            <h1 className="text-display-md">{guide.title}</h1>

            <p className="mt-4 max-w-prose text-lead text-mist">{guide.description}</p>

            <p className="mt-5 inline-flex items-center gap-1.5 text-sm text-haze">
              <Clock aria-hidden="true" className="h-4 w-4" />
              Yaklaşık {guide.minutes} dakika
            </p>

            <ol className="mt-12 flex flex-col gap-8">
              {guide.steps.map((step, i) => (
                <li key={step.title} id={`adim-${i + 1}`} className="flex scroll-mt-28 gap-5">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-500 font-display text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h2 className="font-display text-lg font-bold text-paper">{step.title}</h2>
                    <p className="mt-2 leading-relaxed text-mist">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <section className="mt-14" aria-labelledby="ipuclari">
              <h2 id="ipuclari" className="flex items-center gap-2 font-display text-2xl font-bold">
                <Lightbulb aria-hidden="true" className="h-5 w-5 text-brand-400" />
                İpuçları
              </h2>
              <ul className="mt-6 flex flex-col gap-3">
                {guide.tips.map((tip) => (
                  <li key={tip} className="flex gap-3 leading-relaxed text-mist">
                    <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-14" aria-labelledby="sorun-giderme">
              <h2 id="sorun-giderme" className="flex items-center gap-2 font-display text-2xl font-bold">
                <Wrench aria-hidden="true" className="h-5 w-5 text-brand-400" />
                Sorun giderme
              </h2>
              <div className="mt-6 overflow-x-auto rounded-card border border-navy-600">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-navy-800">
                      <th scope="col" className="border-b border-navy-600 px-4 py-3 text-left font-display font-semibold text-paper">
                        Belirti
                      </th>
                      <th scope="col" className="border-b border-navy-600 px-4 py-3 text-left font-display font-semibold text-paper">
                        Ne yapmalı
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {guide.troubleshooting.map((item) => (
                      <tr key={item.problem} className="border-b border-navy-600 last:border-0">
                        <td className="px-4 py-3 align-top font-medium text-paper">{item.problem}</td>
                        <td className="px-4 py-3 align-top text-mist">{item.fix}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="card mt-14 p-7">
              <h2 className="font-display text-xl font-bold">Takıldığınız yer mi var?</h2>
              <p className="mt-3 text-mist">
                Cihaz modelinizi ve ekrandaki hata mesajını paylaşın, adım adım yönlendirelim.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <CheckoutTrigger className="btn-primary">Abone Ol</CheckoutTrigger>
                <Link href="/iletisim/" className="btn-secondary">İletişim</Link>
              </div>
            </section>
          </article>

          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 flex flex-col gap-5">
              <div className="card p-5">
                <p className="font-display text-sm font-bold text-paper">Bu rehber şunları kapsar</p>
                <ul className="mt-3 flex flex-col gap-2">
                  {guide.devices.map((device) => (
                    <li key={device} className="text-sm text-mist">{device}</li>
                  ))}
                </ul>
              </div>

              <nav aria-label="Diğer rehberler" className="card p-5">
                <p className="font-display text-sm font-bold text-paper">Diğer cihazlar</p>
                <ul className="mt-3 flex flex-col gap-2">
                  {guides
                    .filter((g) => g.slug !== guide.slug)
                    .map((g) => (
                      <li key={g.slug}>
                        <Link href={`/kurulum/${g.slug}/`} className="text-sm text-mist hover:text-brand-300">
                          {g.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
