'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { Logo } from './Logo';
import { CheckoutTrigger } from './CheckoutTrigger';
import { mainNav, siteConfig, whatsappLink } from '@/data/site-config';

/** Formats 447412836986 as +44 7412 836986 for display. */
function prettyPhone(digits: string): string {
  return `+${digits.slice(0, 2)} ${digits.slice(2, 6)} ${digits.slice(6)}`;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the mobile menu whenever navigation happens.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Escape closes the menu; keeps keyboard users from being trapped.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href.replace(/\/$/, ''));

  return (
    <header className="sticky top-0 z-50 border-b border-navy-600 bg-navy-900/90 backdrop-blur">
      <div className="shell flex h-[4.5rem] items-center justify-between gap-4">
        <Link href="/" aria-label="IPTV Turkey ana sayfa">
          <Logo size="sm" />
        </Link>

        <nav aria-label="Ana menü" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={`rounded-md px-3 py-2 text-sm transition-colors ${
                    isActive(item.href)
                      ? 'text-paper'
                      : 'text-mist hover:text-paper'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsappLink('Merhaba, IPTV Turkey hakkında bilgi almak istiyorum.')}
            className="hidden items-center gap-2 rounded-lg border border-navy-600 px-3 py-2.5 font-display text-sm text-mist transition-colors hover:border-navy-500 hover:text-paper xl:inline-flex"
          >
            <WhatsAppIcon className="h-4 w-4 text-brand-400" />
            WhatsApp • {prettyPhone(siteConfig.contact.whatsapp)}
          </a>

          <CheckoutTrigger className="btn-primary hidden sm:inline-flex">
            Abone Ol
          </CheckoutTrigger>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobil-menu"
            aria-label={open ? 'Menüyü kapat' : 'Menüyü aç'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-navy-600 text-paper lg:hidden"
          >
            {open ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobil-menu" className="border-t border-navy-600 bg-navy-900 lg:hidden">
          <nav aria-label="Mobil menü" className="shell py-4">
            <ul className="flex flex-col gap-1">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className="block rounded-md px-3 py-3 text-base text-mist hover:bg-navy-800 hover:text-paper"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <CheckoutTrigger className="btn-primary w-full">
                  Abone Ol
                </CheckoutTrigger>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
