'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Consent = { necessary: true; analytics: boolean; marketing: boolean };
const STORAGE_KEY = 'iptv-turkey-consent';

/**
 * Cookie consent. Nothing optional is pre-selected and no analytics script is
 * loaded until the visitor actively accepts.
 */
export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const save = (consent: Consent) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...consent, at: Date.now() }));
    } catch {
      /* storage unavailable — the banner simply reappears next visit */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Çerez tercihleri"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-navy-600 bg-navy-800 p-4 shadow-lift"
    >
      <div className="shell flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm leading-relaxed text-mist">
            Sitenin çalışması için zorunlu çerezleri kullanıyoruz. İsteğe bağlı analiz
            çerezleri yalnızca siz onay verirseniz yüklenir. Ayrıntılar için{' '}
            <Link href="/cerez-politikasi/" className="underline hover:text-paper">
              çerez politikamızı
            </Link>{' '}
            inceleyebilirsiniz.
          </p>

          {settingsOpen && (
            <fieldset className="mt-4 flex flex-col gap-3 border-t border-navy-600 pt-4">
              <legend className="sr-only">Çerez kategorileri</legend>
              <label className="flex items-start gap-3 text-sm text-mist">
                <input type="checkbox" checked disabled className="mt-1 h-4 w-4" />
                <span>
                  <span className="font-medium text-paper">Zorunlu çerezler</span> — sitenin
                  temel işlevleri için gereklidir, kapatılamaz.
                </span>
              </label>
              <label className="flex items-start gap-3 text-sm text-mist">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="mt-1 h-4 w-4"
                />
                <span>
                  <span className="font-medium text-paper">Analiz çerezleri</span> — sayfaların
                  nasıl kullanıldığını anlamamıza yardımcı olur.
                </span>
              </label>
              <label className="flex items-start gap-3 text-sm text-mist">
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                  className="mt-1 h-4 w-4"
                />
                <span>
                  <span className="font-medium text-paper">Pazarlama çerezleri</span> — kampanya
                  ölçümlemesi için kullanılır.
                </span>
              </label>
            </fieldset>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => save({ necessary: true, analytics: false, marketing: false })}
            className="btn-secondary"
          >
            Reddet
          </button>
          <button
            type="button"
            onClick={() => setSettingsOpen((v) => !v)}
            className="btn-secondary"
            aria-expanded={settingsOpen}
          >
            Ayarlar
          </button>
          <button
            type="button"
            onClick={() =>
              save(
                settingsOpen
                  ? { necessary: true, analytics, marketing }
                  : { necessary: true, analytics: true, marketing: true }
              )
            }
            className="btn-primary"
          >
            {settingsOpen ? 'Seçimi kaydet' : 'Tümünü kabul et'}
          </button>
        </div>
      </div>
    </div>
  );
}
