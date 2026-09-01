'use client';

import { useState } from 'react';
import { Check, Minus, Plus } from 'lucide-react';
import { siteConfig, whatsappLink } from '@/data/site-config';
import { countries, defaultCountry } from '@/data/countries';
import { WhatsAppIcon } from './WhatsAppIcon';
import { CountrySelect } from './CountrySelect';
import {
  plans, formatPrice, planTotal, totalMonths,
  maxConnections, extraConnectionDiscount, type Plan,
} from '@/data/pricing-data';

type Errors = Partial<Record<'name' | 'email' | 'phone' | 'consent', string>>;

/**
 * Order form.
 *
 * No payment details are collected or stored here. On submit the order goes to
 * the configured external checkout, or to WhatsApp when no checkout URL is set.
 *
 * `lockPlan` is true inside the pricing modal, where the plan is already
 * chosen; the standalone checkout page lets the visitor switch plans.
 */
export function OrderForm({
  plan,
  onPlanChange,
  initialConnections = 1,
  lockPlan = false,
  onSubmitted,
}: {
  plan: Plan;
  onPlanChange?: (plan: Plan) => void;
  initialConnections?: number;
  lockPlan?: boolean;
  onSubmitted?: () => void;
}) {
  const [connections, setConnections] = useState(initialConnections);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dial, setDial] = useState(defaultCountry.dial);
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const total = planTotal(plan, connections);
  const term = totalMonths(plan);
  const discountPct = Math.round(extraConnectionDiscount * 100);

  const validate = (): boolean => {
    const next: Errors = {};
    if (name.trim().length < 2) next.name = 'Lütfen adınızı ve soyadınızı girin.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) next.email = 'Geçerli bir e-posta adresi girin.';
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 6 || digits.length > 14) {
      next.phone = 'Geçerli bir WhatsApp numarası girin (alan kodu olmadan).';
    }
    if (!consent) next.consent = 'Devam etmek için onay kutusunu işaretleyin.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  /**
   * Records the order in the spreadsheet.
   *
   * Sent as a GET with query parameters, not a POST. An Apps Script /exec POST
   * is answered with a 302 to googleusercontent.com and browsers drop the body
   * when following it, so the request looks successful while nothing is
   * written. A GET survives the redirect.
   *
   * Fire-and-forget: the response cannot be read cross-origin, and a logging
   * failure must never block the customer.
   */
  const logOrder = (data: Record<string, string | number>) => {
    if (!siteConfig.orderEndpoint) return;
    try {
      const url = new URL(siteConfig.orderEndpoint);
      Object.entries(data).forEach(([key, value]) => {
        url.searchParams.set(key, String(value));
      });
      void fetch(url.toString(), { method: 'GET', mode: 'no-cors', keepalive: true });
    } catch {
      /* the WhatsApp handoff below still runs */
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const country = countries.find((c) => c.dial === dial);
    const bonus = plan.bonusMonths > 0 ? ` (${plan.months} + ${plan.bonusMonths} ay hediye)` : '';

    const summary = [
      'Yeni sipariş talebi',
      '',
      `Paket: ${plan.name}`,
      `Süre: ${term} ay${bonus}`,
      `Eş zamanlı bağlantı: ${connections}`,
      `Toplam: ${formatPrice(total)}`,
      '',
      `Ad Soyad: ${name}`,
      `E-posta: ${email}`,
      `WhatsApp: ${dial} ${phone.replace(/\D/g, '')}${country ? ` (${country.name})` : ''}`,
    ].join('\n');

    logOrder({
      name: name.trim(),
      email: email.trim(),
      phone: `${dial} ${phone.replace(/\D/g, '')}`,
      country: country?.name ?? '',
      plan: plan.name,
      months: term,
      paidMonths: plan.months,
      bonusMonths: plan.bonusMonths,
      connections,
      total: Number(total.toFixed(2)),
    });

    if (siteConfig.checkoutUrl) {
      const url = new URL(siteConfig.checkoutUrl);
      url.searchParams.set('plan', plan.id);
      url.searchParams.set('connections', String(connections));
      window.location.href = url.toString();
      return;
    }

    window.open(whatsappLink(summary), '_blank', 'noopener,noreferrer');
    setSent(true);
    onSubmitted?.();
  };

  if (sent) {
    return (
      <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/5 p-6 text-center">
        <Check aria-hidden="true" className="mx-auto h-8 w-8 text-emerald-400" />
        <h3 className="mt-3 font-display text-lg font-bold text-paper">Talebiniz iletildi</h3>
        <p className="mt-2 text-sm leading-relaxed text-mist">
          WhatsApp penceresi açılmadıysa aşağıdaki düğmeyi kullanabilirsiniz. Siparişiniz
          yalnızca mesajı gönderdiğinizde tarafımıza ulaşır.
        </p>
        <a
          href={whatsappLink('Merhaba, sipariş talebimi iletmek istiyorum.')}
          target="_blank"
          rel="noopener noreferrer"
          className="btn mt-5 bg-[#25D366] text-white hover:bg-[#1DA851]"
        >
          <WhatsAppIcon className="h-4 w-4" />
          WhatsApp&apos;ı aç
        </a>
      </div>
    );
  }

  return (
    <>
      {/* What the visitor is about to send */}
      <dl className="rounded-lg border border-navy-600 bg-navy-900 p-4 text-sm">
        <div className="flex items-baseline justify-between gap-4">
          <dt className="text-haze">Paket</dt>
          <dd className="font-display font-bold text-paper">{plan.name}</dd>
        </div>
        <div className="mt-2 flex items-baseline justify-between gap-4">
          <dt className="text-haze">Süre</dt>
          <dd className="text-mist">
            {term} ay
            {plan.bonusMonths > 0 && (
              <span className="ml-1.5 text-emerald-400">+{plan.bonusMonths} hediye</span>
            )}
          </dd>
        </div>
        <div className="mt-2 flex items-baseline justify-between gap-4">
          <dt className="text-haze">Eş zamanlı bağlantı</dt>
          <dd className="text-mist">{connections}</dd>
        </div>
        <div className="mt-3 flex items-baseline justify-between gap-4 border-t border-navy-600 pt-3">
          <dt className="text-mist">Toplam</dt>
          <dd className="font-display text-lg font-extrabold text-paper">{formatPrice(total)}</dd>
        </div>
      </dl>

      <form onSubmit={submit} noValidate className="mt-5 flex flex-col gap-4">
        {!lockPlan && onPlanChange && (
          <fieldset>
            <legend className="label">Paket</legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {plans.map((p) => (
                <label
                  key={p.id}
                  className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors ${
                    p.id === plan.id
                      ? 'border-brand-500 bg-brand-500/5'
                      : 'border-navy-600 hover:border-navy-500'
                  }`}
                >
                  <input
                    type="radio"
                    name="plan"
                    checked={p.id === plan.id}
                    onChange={() => onPlanChange(p)}
                    className="mt-1 h-4 w-4"
                  />
                  <span className="min-w-0">
                    <span className="block font-display text-sm font-bold text-paper">{p.name}</span>
                    <span className="mt-0.5 block text-xs text-haze">
                      {totalMonths(p)} ay · {formatPrice(p.price)}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        )}

        <div>
          <p className="label">Eş zamanlı bağlantı</p>
          <div className="flex items-center rounded-lg border border-navy-600 bg-navy-900">
            <button
              type="button"
              onClick={() => setConnections((c) => Math.max(1, c - 1))}
              disabled={connections <= 1}
              aria-label="Bağlantı sayısını azalt"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-l-lg text-mist hover:bg-navy-800 hover:text-paper disabled:opacity-30"
            >
              <Minus aria-hidden="true" className="h-4 w-4" />
            </button>
            <span aria-live="polite" className="flex-1 border-x border-navy-600 py-2.5 text-center font-display text-lg font-bold">
              {connections}
            </span>
            <button
              type="button"
              onClick={() => setConnections((c) => Math.min(maxConnections, c + 1))}
              disabled={connections >= maxConnections}
              aria-label="Bağlantı sayısını artır"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-r-lg text-mist hover:bg-navy-800 hover:text-paper disabled:opacity-30"
            >
              <Plus aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-2 text-xs text-haze">
            İlk bağlantı tam fiyat, her ek bağlantı %{discountPct} daha uygun.
          </p>
        </div>

        <div>
          <label htmlFor="order-name" className="label">Ad Soyad</label>
          <input
            id="order-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'order-name-error' : undefined}
            className="field"
            autoComplete="name"
          />
          {errors.name && <p id="order-name-error" className="mt-2 text-sm text-brand-300">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="order-email" className="label">E-posta</label>
          <input
            id="order-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'order-email-error' : undefined}
            placeholder="ornek@gmail.com"
            className="field"
            autoComplete="email"
          />
          {errors.email && <p id="order-email-error" className="mt-2 text-sm text-brand-300">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="order-phone" className="label">WhatsApp numarası</label>
          <div className="flex gap-2">
            <CountrySelect value={dial} onChange={setDial} />
            <input
              id="order-phone"
              type="tel"
              inputMode="numeric"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="532 123 45 67"
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? 'order-phone-error' : 'order-phone-hint'}
              className="field flex-1"
              autoComplete="tel-national"
            />
          </div>
          {errors.phone ? (
            <p id="order-phone-error" className="mt-2 text-sm text-brand-300">{errors.phone}</p>
          ) : (
            <p id="order-phone-hint" className="mt-2 text-xs text-haze">
              Ülke kodunu soldan seçin, numarayı baştaki sıfır olmadan yazın.
            </p>
          )}
        </div>

        <div>
          <label className="flex items-start gap-3 text-sm leading-relaxed text-mist">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              aria-invalid={Boolean(errors.consent)}
              className="mt-1 h-4 w-4"
            />
            <span>Bilgilerimin talebimi yanıtlamak amacıyla işlenmesini onaylıyorum.</span>
          </label>
          {errors.consent && <p className="mt-2 text-sm text-brand-300">{errors.consent}</p>}
        </div>

        <button type="submit" className="btn-primary mt-2 w-full">
          Siparişi Gönder
        </button>

        <p className="text-xs leading-relaxed text-haze">
          Bu formda ödeme bilgisi toplanmaz ve saklanmaz. Talebiniz alındıktan sonra ödeme
          adımları sizinle paylaşılır.
        </p>
      </form>
    </>
  );
}
