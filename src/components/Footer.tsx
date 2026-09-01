import Link from 'next/link';
import { Mail } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { Logo } from './Logo';
import { siteConfig, footerNav, whatsappLink } from '@/data/site-config';

function prettyPhone(digits: string): string {
  return `+${digits.slice(0, 2)} ${digits.slice(2, 6)} ${digits.slice(6)}`;
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-navy-600 bg-navy-800">
      <div className="shell py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Logo size="md" />
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-mist">
              Türkiye için esnek IPTV abonelik seçenekleri ve Türkçe kurulum desteği.
            </p>

            <div className="mt-5 flex flex-col gap-2 text-sm">
              <a
                href={whatsappLink('Merhaba, IPTV Turkey hakkında bilgi almak istiyorum.')}
                className="inline-flex items-center gap-2 font-display font-semibold text-paper hover:text-brand-300"
              >
                <WhatsAppIcon className="h-4 w-4 text-brand-400" />
                {prettyPhone(siteConfig.contact.whatsapp)}
              </a>
              <p className="text-mist">WhatsApp destek hattı</p>
              {siteConfig.contact.email && (
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="inline-flex items-center gap-2 text-mist hover:text-paper"
                >
                  <Mail aria-hidden="true" className="h-4 w-4 text-brand-400" />
                  {siteConfig.contact.email}
                </a>
              )}
              <p className="text-haze">{siteConfig.contact.supportHours}</p>
            </div>
          </div>

          {footerNav.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="font-display text-sm font-semibold text-paper">{group.title}</h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm text-mist hover:text-paper">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 border-t border-navy-600 pt-8">
          <p className="max-w-3xl text-xs leading-relaxed text-haze">
            {siteConfig.name} bir teknoloji ve abonelik hizmetidir. Üçüncü taraflara ait
            kanalların, yayınların veya markaların sahibi değildir ve bunlar üzerinde hak
            iddia etmez. İçerik ve kanal kullanılabilirliği lisanslama, bölge, paket ve
            hizmet sağlayıcıya göre değişebilir. Telif hakkı ihlali bildirimleri için{' '}
            <Link href="/telif-hakki-sikayeti/" className="underline hover:text-mist">
              telif hakkı şikayeti
            </Link>{' '}
            sayfamızı kullanabilirsiniz.
          </p>
          <p className="mt-5 text-xs text-haze">
            © {year} {siteConfig.name}. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}
