import Link from 'next/link';
import { Clock, Mail, MessageSquare } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { StructuredData } from '@/components/StructuredData';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';
import { CheckoutTrigger } from '@/components/CheckoutTrigger';
import { siteConfig, whatsappLink } from '@/data/site-config';
import { pageMetadata, breadcrumbSchema } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'İletişim | IPTV Turkey',
  description:
    'IPTV Turkey destek ekibine ulaşın. Kurulum, paket seçimi ve mevcut aboneliğinizle ilgili sorularınız için WhatsApp destek hattı ve e-posta.',
  path: '/iletisim/',
});

const trail = [
  { name: 'Ana Sayfa', href: '/' },
  { name: 'İletişim', href: '/iletisim/' },
];

function prettyPhone(digits: string): string {
  return `+${digits.slice(0, 2)} ${digits.slice(2, 6)} ${digits.slice(6)}`;
}

const topics = [
  { icon: MessageSquare, title: 'Satın almadan önce', text: 'Cihazınızın uyumlu olup olmadığı, hangi sürenin size uygun olduğu ve eş zamanlı bağlantı ihtiyacınız.' },
  { icon: Clock, title: 'Kurulum sırasında', text: 'Oynatıcı seçimi, abonelik bilgilerinin girilmesi, program rehberi ve saat dilimi ayarları.' },
  { icon: Mail, title: 'Abonelik sonrası', text: 'Donma ve bağlantı sorunları, cihaz değişikliği, süre uzatma ve ek bağlantı talepleri.' },
];

export default function ContactPage() {
  return (
    <>
      {/* Organization already ships from the root layout on every page. */}
      <StructuredData data={breadcrumbSchema(trail)} />

      <div className="shell py-12 sm:py-16">
        <Breadcrumbs trail={trail} />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="eyebrow">İletişim</p>
            <h1 className="text-display-md">Bize ulaşın</h1>
            <p className="mt-4 max-w-prose text-lead text-mist">
              En hızlı yol WhatsApp destek hattımızdır. Yazarken cihaz modelinizi ve varsa
              ekrandaki hata mesajının görüntüsünü paylaşmanız çözümü belirgin şekilde
              hızlandırır.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={whatsappLink('Merhaba, IPTV Turkey hakkında bilgi almak istiyorum.')}
                className="btn bg-[#25D366] text-white hover:bg-[#1DA851]"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp&apos;tan Yazın
              </a>
              <CheckoutTrigger className="btn-secondary">Abone Ol</CheckoutTrigger>
            </div>

            <dl className="mt-10 flex flex-col gap-5 border-t border-navy-600 pt-8">
              <div className="flex items-start gap-3">
                <WhatsAppIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
                <div>
                  <dt className="font-display text-sm font-semibold text-paper">WhatsApp</dt>
                  <dd className="mt-1 text-mist">{prettyPhone(siteConfig.contact.whatsapp)}</dd>
                </div>
              </div>

              {siteConfig.contact.email && (
                <div className="flex items-start gap-3">
                  <Mail aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
                  <div>
                    <dt className="font-display text-sm font-semibold text-paper">E-posta</dt>
                    <dd className="mt-1">
                      <a href={`mailto:${siteConfig.contact.email}`} className="text-mist hover:text-paper">
                        {siteConfig.contact.email}
                      </a>
                    </dd>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <Clock aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
                <div>
                  <dt className="font-display text-sm font-semibold text-paper">Destek saatleri</dt>
                  <dd className="mt-1 text-mist">{siteConfig.contact.supportHours}</dd>
                </div>
              </div>
            </dl>
          </div>

          <aside className="lg:col-span-5">
            <div className="card p-6">
              <h2 className="font-display text-base font-bold">Hangi konularda yardımcı oluyoruz?</h2>
              <ul className="mt-6 flex flex-col gap-6">
                {topics.map(({ icon: Icon, title, text }) => (
                  <li key={title} className="flex gap-3">
                    <Icon aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
                    <div>
                      <p className="font-display text-sm font-semibold text-paper">{title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-mist">{text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-haze">
              Telif hakkı ihlali bildirimleri için{' '}
              <Link href="/telif-hakki-sikayeti/" className="text-brand-300 underline underline-offset-2">
                telif hakkı şikayeti
              </Link>{' '}
              sayfamızı kullanabilirsiniz.
            </p>
          </aside>
        </div>
      </div>
    </>
  );
}
