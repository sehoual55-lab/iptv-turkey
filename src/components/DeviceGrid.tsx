import Link from 'next/link';
import { whatsappLink } from '@/data/site-config';
import { deviceBrands, trademarkNotice } from '@/data/device-brands';

/**
 * Compatibility grid of device brand marks.
 *
 * The glyph is decorative — the brand name is real text beside it, so screen
 * readers and search engines get the information without relying on the icon.
 */
export function DeviceGrid() {
  return (
    <>
      <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-6">
        {deviceBrands.map((brand) => (
          <li
            key={brand.name}
            className="card flex flex-col items-center gap-3 px-3 py-5 text-center"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
              className="h-7 w-7 shrink-0 fill-mist"
            >
              {brand.paths.map((d) => (
                <path key={d.slice(0, 24)} d={d} />
              ))}
            </svg>
            <div className="min-w-0">
              <p className="font-display text-xs font-bold leading-tight text-paper sm:text-sm">
                {brand.name}
              </p>
              <p className="mt-1 text-[0.6875rem] leading-snug text-haze">{brand.label}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 max-w-prose space-y-3">
        <p className="text-sm leading-relaxed text-mist">
          Cihazınız listede yok mu? Model adını{' '}
          <a
            href={whatsappLink('Merhaba, cihazımın uyumlu olup olmadığını öğrenmek istiyorum. Modelim: ')}
            className="text-brand-300 underline underline-offset-2 hover:text-brand-400"
          >
            WhatsApp üzerinden gönderin
          </a>
          , uyumlu olup olmadığını kısa sürede söyleyelim. Uyumlu değilse, sorunu çözen
          uygun fiyatlı bir HDMI cihazı önerebiliriz. Ayrıntılar için{' '}
          <Link href="/kurulum/" className="text-brand-300 underline underline-offset-2 hover:text-brand-400">
            kurulum rehberlerimize
          </Link>{' '}
          göz atabilirsiniz.
        </p>
        <p className="text-xs leading-relaxed text-haze">{trademarkNotice}</p>
      </div>
    </>
  );
}
