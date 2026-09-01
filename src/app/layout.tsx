import type { Metadata, Viewport } from 'next';
// Fonts are self-hosted (no Google Fonts request), which keeps the site fast
// and avoids sending visitor IPs to a third party before cookie consent.
// Both families include Latin Extended, which Turkish diacritics require.
import '@fontsource-variable/outfit/index.css';
import '@fontsource-variable/inter/index.css';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CookieBanner } from '@/components/CookieBanner';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { StructuredData } from '@/components/StructuredData';
import { siteConfig } from '@/data/site-config';
import { organizationSchema, websiteSchema } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'IPTV Turkey | Türkiye IPTV Paketleri ve Kurulum Rehberi',
    template: `%s`,
  },
  description: siteConfig.description,
  manifest: '/site.webmanifest',
  icons: { icon: '/favicon.svg' },
  ...(siteConfig.googleSiteVerification
    ? { verification: { google: siteConfig.googleSiteVerification } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: '#070C18',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className="flex min-h-screen flex-col">
        <StructuredData data={[organizationSchema(), websiteSchema()]} />

        <a
          href="#icerik"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-brand-500 focus:px-4 focus:py-2 focus:text-white"
        >
          İçeriğe geç
        </a>

        <Header />
        <main id="icerik" className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <CookieBanner />
      </body>
    </html>
  );
}
