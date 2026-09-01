'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { siteConfig, whatsappLink } from '@/data/site-config';

function prettyPhone(digits: string): string {
  return `+${digits.slice(0, 2)} ${digits.slice(2, 6)} ${digits.slice(6)}`;
}

/**
 * Floating support launcher. Opening the card is a response to the visitor's
 * own click, so the small transition is appropriate motion.
 */
export function WhatsAppButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      {open && (
        <div
          role="dialog"
          aria-label="WhatsApp destek"
          className="w-[19rem] rounded-card border border-navy-600 bg-navy-800 p-5 shadow-lift"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-display text-sm font-bold text-paper">IPTV Turkey</p>
              <p className="mt-0.5 flex items-center gap-1.5 text-xs text-haze">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
                Genellikle kısa sürede yanıtlıyoruz
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Pencereyi kapat"
              className="text-haze hover:text-paper"
            >
              <X aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-mist">
            Merhaba 👋 Paket seçimi, kurulum veya mevcut siparişiniz hakkında
            yardımcı olabiliriz. Yazmanız yeterli.
          </p>

          <a
            href={whatsappLink('Merhaba, IPTV Turkey hakkında bilgi almak istiyorum.')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn mt-5 w-full bg-[#25D366] text-white hover:bg-[#1DA851]"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Sohbeti başlat
          </a>

          <p className="mt-3 text-center text-xs text-haze">
            WhatsApp&apos;a yönlendirileceksiniz
            <br />
            {prettyPhone(siteConfig.contact.whatsapp)}
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? 'Destek penceresini kapat' : 'WhatsApp üzerinden destek al'}
        className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift transition-colors hover:bg-[#1DA851]"
      >
        {open ? <X aria-hidden="true" className="h-6 w-6" /> : <WhatsAppIcon className="h-7 w-7" />}
      </button>
    </div>
  );
}
