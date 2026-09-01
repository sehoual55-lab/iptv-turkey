import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { BlogCard } from '@/components/BlogCard';
import { StructuredData } from '@/components/StructuredData';
import { articlesByDate } from '@/data/blog-data';
import { pageMetadata, breadcrumbSchema } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Blog | IPTV Turkey',
  description:
    'IPTV kurulumu, cihaz seçimi, M3U teknolojisi ve güvenlik konularında Türkçe rehberler. Yeni başlayanlar için açıklayıcı, abartısız içerikler.',
  path: '/blog/',
});

const trail = [
  { name: 'Ana Sayfa', href: '/' },
  { name: 'Blog', href: '/blog/' },
];

export default function BlogIndexPage() {
  return (
    <>
      <StructuredData data={breadcrumbSchema(trail)} />

      <div className="shell py-12 sm:py-16">
        <Breadcrumbs trail={trail} />

        <header className="max-w-2xl">
          <p className="eyebrow">Blog</p>
          <h1 className="text-display-md">Türkçe IPTV rehberleri</h1>
          <p className="mt-4 text-lead text-mist">
            Kurulum, cihaz seçimi, bağlantı hızı ve güvenlik konularını sade bir dille
            anlatıyoruz. Pazarlama vaatleri yerine işe yarayan bilgi.
          </p>
        </header>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articlesByDate.map((article) => (
            <BlogCard key={article.slug} article={article} />
          ))}
        </div>

        <p className="mt-12 text-sm text-mist">
          Aradığınız konuyu bulamadınız mı?{' '}
          <Link href="/sss/" className="text-brand-300 underline underline-offset-2 hover:text-brand-400">
            Sıkça sorulan sorulara
          </Link>{' '}
          göz atabilirsiniz.
        </p>
      </div>
    </>
  );
}
