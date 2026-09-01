import Link from 'next/link';
import { Clock, ArrowRight, Tv, MonitorPlay, Radio, Smartphone } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { StructuredData } from '@/components/StructuredData';
import { guides } from '@/data/guides-data';
import { pageMetadata, breadcrumbSchema } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Kurulum Rehberleri | IPTV Turkey',
  description:
    'Smart TV, Android TV, Fire TV Stick ve mobil cihazlar için Türkçe IPTV kurulum rehberleri. Adım adım anlatım, sık karşılaşılan sorunlar ve çözümleri.',
  path: '/kurulum/',
});

const trail = [
  { name: 'Ana Sayfa', href: '/' },
  { name: 'Kurulum', href: '/kurulum/' },
];

const icons: Record<string, typeof Tv> = {
  'smart-tv': Tv,
  'android-tv': MonitorPlay,
  'fire-tv-stick': Radio,
  mobil: Smartphone,
};

export default function GuidesHubPage() {
  return (
    <>
      <StructuredData data={breadcrumbSchema(trail)} />

      <div className="shell py-12 sm:py-16">
        <Breadcrumbs trail={trail} />

        <header className="max-w-2xl">
          <p className="eyebrow">Kurulum</p>
          <h1 className="text-display-md">Kurulum rehberleri</h1>
          <p className="mt-4 text-lead text-mist">
            Kurulum, cihazınıza uyumlu bir oynatıcı kurmak ve abonelik bilgilerinizi girmekten
            ibarettir. Ortalama beş ila on dakika sürer.
          </p>
        </header>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {guides.map((guide) => {
            const Icon = icons[guide.slug] ?? Tv;
            return (
              <Link
                key={guide.slug}
                href={`/kurulum/${guide.slug}/`}
                className="group card flex flex-col p-6 transition-colors hover:border-brand-500/50"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-navy-600 bg-navy-900 transition-colors group-hover:border-brand-500/50">
                  <Icon aria-hidden="true" className="h-5 w-5 text-brand-400" />
                </span>

                <h2 className="mt-5 font-display text-lg font-bold text-paper">{guide.name}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-mist">{guide.summary}</p>

                <span className="mt-5 flex items-center justify-between border-t border-navy-600 pt-4">
                  <span className="inline-flex items-center gap-1.5 text-xs text-haze">
                    <Clock aria-hidden="true" className="h-3.5 w-3.5" />
                    {guide.minutes} dakika
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-display text-sm font-semibold text-brand-300">
                    Rehberi aç
                    <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
