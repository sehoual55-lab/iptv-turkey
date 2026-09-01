import { Breadcrumbs } from '@/components/Breadcrumbs';
import { PricingGrid } from '@/components/PricingGrid';
import { FAQAccordion } from '@/components/FAQAccordion';
import { StructuredData } from '@/components/StructuredData';
import { faqs } from '@/data/faq-data';
import { availabilityNote, extraConnectionDiscount, maxConnections } from '@/data/pricing-data';
import { pageMetadata, breadcrumbSchema, serviceSchema, faqSchema } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Paketler ve Fiyatlar | IPTV Turkey',
  description:
    'IPTV Turkey abonelik paketlerini karşılaştırın: süre, eş zamanlı bağlantı sayısı ve aylık maliyet. Tek seferlik ödeme, otomatik yenileme yok.',
  path: '/paketler/',
});

const trail = [
  { name: 'Ana Sayfa', href: '/' },
  { name: 'Paketler', href: '/paketler/' },
];

/** Pricing questions only — the full list lives on /sss/. */
const pricingFaqs = faqs.filter((f) =>
  ['Aynı anda kaç cihazda izleyebilirim?', 'Paket içeriği bölgeye göre değişir mi?', 'Sipariş nasıl veriliyor?'].includes(
    f.question
  )
);

export default function PackagesPage() {
  return (
    <>
      <StructuredData data={[breadcrumbSchema(trail), serviceSchema(), faqSchema(pricingFaqs)]} />

      <div className="shell-wide py-12 sm:py-16">
        <Breadcrumbs trail={trail} />

        <header className="max-w-2xl">
          <p className="eyebrow">Tarifeler</p>
          <h1 className="text-display-md">Paketler ve fiyatlar</h1>
          <p className="mt-4 text-lead text-mist">
            Tüm paketler varsayılan olarak tek eş zamanlı bağlantı içerir. İlk bağlantı tam
            fiyat, her ek bağlantı %{Math.round(extraConnectionDiscount * 100)} daha uygundur;
            en fazla {maxConnections} bağlantı tanımlanabilir.
          </p>
        </header>

        <div className="mt-12">
          <PricingGrid />
        </div>

        <section className="mt-20 max-w-3xl" aria-labelledby="paket-sss">
          <h2 id="paket-sss" className="text-display-sm">
            Paketler hakkında sorular
          </h2>
          <div className="mt-8">
            <FAQAccordion faqs={pricingFaqs} />
          </div>
        </section>

        <p className="mt-12 max-w-prose text-xs leading-relaxed text-haze">{availabilityNote}</p>
      </div>
    </>
  );
}
