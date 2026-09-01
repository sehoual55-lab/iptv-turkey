/**
 * Central site configuration.
 *
 * Everything an operator needs to change day to day lives here or in an
 * environment variable. See README.md for the full list.
 */

export const siteConfig = {
  name: 'IPTV Turkey',
  domain: 'iptv-turkey.site',
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://iptv-turkey.site').replace(/\/$/, ''),
  locale: 'tr-TR',
  lang: 'tr',
  currency: 'EUR',
  currencySymbol: '€',

  /** Shown in <title> when a page does not set its own suffix. */
  titleSuffix: 'IPTV Turkey',

  description:
    'IPTV Turkey paketlerini, uyumlu cihazları ve Türkçe kurulum rehberlerini keşfedin. Smart TV, Android TV ve Fire TV Stick için esnek çözümleri karşılaştırın.',

  contact: {
    /** wa.me format: country code + number, digits only, no + or spaces. */
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '447412836986',
    /** Support address. Rendered in the footer and in Organization schema. */
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'xyz905391@gmail.com',
    /** Free-text placeholder — replace with your registered business details. */
    companyName: 'IPTV Turkey',
    companyAddress: 'Şirket adresi buraya eklenecektir.',
    supportHours: 'Her gün 09:00 - 23:00 (TSİ)',
  },

  /**
   * Optional external checkout. When empty, order buttons hand off to
   * WhatsApp with a pre-filled message instead.
   */
  checkoutUrl: process.env.NEXT_PUBLIC_CHECKOUT_URL ?? '',

  /**
   * Google Apps Script web-app URL that logs orders to the spreadsheet.
   * See google-apps-script/checkout-backend.gs. Empty disables logging;
   * the WhatsApp handoff works either way.
   */
  orderEndpoint:
    process.env.NEXT_PUBLIC_ORDER_ENDPOINT ??
    'https://script.google.com/macros/s/AKfycbwXefp7rDtMDl0mXGrY_5bycDTx3VN5UAH_3CmW0bjlA9x97XISGIW6PuHNy-RXbnN8/exec',

  /** Only loaded after the visitor accepts analytics cookies. */
  analyticsId: process.env.NEXT_PUBLIC_ANALYTICS_ID ?? '',

  /**
   * Google Search Console verification token. Renders as
   * <meta name="google-site-verification"> — leave empty to omit the tag.
   */
  googleSiteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? '',

  author: 'IPTV Turkey Editör Ekibi',
} as const;

/** Builds a wa.me link with a pre-filled Turkish message. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${siteConfig.contact.whatsapp}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

/** Absolute URL helper — used for canonicals, Open Graph and JSON-LD. */
export function absoluteUrl(path = '/'): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${siteConfig.url}${clean}`;
}

export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: 'Ana Sayfa', href: '/' },
  { label: 'Paketler', href: '/paketler/' },
  { label: 'Kurulum', href: '/kurulum/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'SSS', href: '/sss/' },
  { label: 'İletişim', href: '/iletisim/' },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: 'Hizmet',
    items: [
      { label: 'Paketler', href: '/paketler/' },
      { label: 'Kurulum Rehberleri', href: '/kurulum/' },
      { label: 'Sıkça Sorulan Sorular', href: '/sss/' },
    ],
  },
  {
    title: 'Kurulum',
    items: [
      { label: 'Smart TV', href: '/kurulum/smart-tv/' },
      { label: 'Android TV', href: '/kurulum/android-tv/' },
      { label: 'Fire TV Stick', href: '/kurulum/fire-tv-stick/' },
      { label: 'Mobil Cihazlar', href: '/kurulum/mobil/' },
    ],
  },
  {
    title: 'Kurumsal',
    items: [
      { label: 'Hakkımızda', href: '/hakkimizda/' },
      { label: 'İletişim', href: '/iletisim/' },
      { label: 'Blog', href: '/blog/' },
      { label: 'Telif Hakkı Şikayeti', href: '/telif-hakki-sikayeti/' },
    ],
  },
  {
    title: 'Yasal',
    items: [
      { label: 'Gizlilik Politikası', href: '/gizlilik-politikasi/' },
      { label: 'Kullanım Koşulları', href: '/kullanim-kosullari/' },
      { label: 'İade Politikası', href: '/iade-politikasi/' },
      { label: 'Çerez Politikası', href: '/cerez-politikasi/' },
    ],
  },
];
