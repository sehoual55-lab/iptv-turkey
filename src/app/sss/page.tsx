import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FAQAccordion } from '@/components/FAQAccordion';
import { StructuredData } from '@/components/StructuredData';
import { faqs } from '@/data/faq-data';
import { whatsappLink } from '@/data/site-config';
import { pageMetadata, breadcrumbSchema, faqSchema } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Sıkça Sorulan Sorular | IPTV Turkey',
  description:
    'IPTV nedir, hangi cihazlarla uyumludur, ne kadar internet hızı gerekir, kurulum nasıl yapılır? IPTV Turkey hakkında en çok sorulan soruların yanıtları.',
  path: '/sss/',
});

const trail = [
  { name: 'Ana Sayfa', href: '/' },
  { name: 'SSS', href: '/sss/' },
];

export default function FaqPage() {
  return (
    <>
      <StructuredData data={[breadcrumbSchema(trail), faqSchema(faqs)]} />

      <div className="shell py-12 sm:py-16">
        <Breadcrumbs trail={trail} />

        <header className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">SSS</p>
          <h1 className="text-display-md">Sıkça sorulan sorular</h1>
          <p className="mt-4 text-lead text-mist">
            Aklınıza takılanların çoğunun yanıtı burada. Bulamazsanız WhatsApp üzerinden
            sorabilirsiniz.
          </p>
        </header>

        <div className="mx-auto mt-12 max-w-3xl">
          <FAQAccordion faqs={faqs} />

          <div className="card mt-12 p-7 text-center">
            <h2 className="font-display text-xl font-bold">Sorunuzun yanıtı yok mu?</h2>
            <p className="mt-3 text-mist">
              Cihaz modelinizi ve karşılaştığınız durumu yazın, kısa sürede dönelim.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href={whatsappLink('Merhaba, bir sorum var.')}
                className="btn-primary"
              >
                WhatsApp&apos;tan Yazın
              </a>
              <Link href="/iletisim/" className="btn-secondary">
                İletişim
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
