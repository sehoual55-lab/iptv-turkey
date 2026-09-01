'use client';

import { useState } from 'react';
import { Check, Minus, Plus, Crown, Sparkles, ArrowRight } from 'lucide-react';
import {
  formatAmount, formatPrice, planTotal, monthlyPrice, savingsPercent, totalMonths, planFeatures,
  availabilityNote, showBadges, maxConnections, extraConnectionDiscount,
  siteCurrencySymbol, type Plan,
} from '@/data/pricing-data';

export function PricingCard({
  plan,
  onSelect,
}: {
  plan: Plan;
  onSelect: (plan: Plan, connections: number) => void;
}) {
  const [connections, setConnections] = useState(1);
  const total = planTotal(plan, connections);
  const perMonth = monthlyPrice(plan, connections);
  const term = totalMonths(plan);
  const BadgeIcon = plan.featured ? Crown : Sparkles;
  const solid = Boolean(plan.solid);

  // On the red field the usual mist/haze greys lose contrast, so text steps up
  // to translucent white instead.
  const t = {
    sub: solid ? 'text-white/70' : 'text-haze',
    body: solid ? 'text-white/85' : 'text-mist',
    faint: solid ? 'text-white/60' : 'text-haze',
    line: solid ? 'border-white/20' : 'border-navy-600',
    field: solid ? 'border-white/25 bg-black/25' : 'border-navy-600 bg-navy-900',
    tick: solid ? 'text-white' : 'text-brand-400',
  };
  const savings = savingsPercent(plan);
  const discountPct = Math.round(extraConnectionDiscount * 100);

  return (
    <div
      className={[
        'relative flex h-full flex-col rounded-card p-6',
        solid
          ? 'border border-brand-400/50 bg-gradient-to-b from-brand-600 to-[#4B0812] text-white shadow-[0_28px_70px_-30px_rgba(225,29,46,0.7)]'
          : plan.featured
            ? 'border border-brand-500/50 bg-glass shadow-[0_0_0_1px_rgba(225,29,46,0.18),0_28px_70px_-30px_rgba(225,29,46,0.55)]'
            : 'border border-navy-600 bg-glass shadow-card',
      ].join(' ')}
    >
      {showBadges && plan.badge && (
        <span
          className={[
            'absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1',
            'font-display text-xs font-semibold',
            solid
              ? 'bg-white text-brand-600'
              : plan.featured
                ? 'bg-brand-500 text-white'
                : 'border border-emerald-500/40 bg-navy-800 text-emerald-300',
          ].join(' ')}
        >
          <BadgeIcon aria-hidden="true" className="mr-1.5 inline h-3.5 w-3.5 align-[-2px]" />
          {plan.badge}
        </span>
      )}

      <div className="mt-2">
        <h3 className="font-display text-2xl font-bold">{plan.name}</h3>
        <p className={`mt-1.5 text-sm ${t.sub}`}>
          {plan.months} ay
          {plan.bonusMonths > 0 && (
            <span className={`ml-2 font-medium ${solid ? 'text-white' : 'text-emerald-400'}`}>
              +{plan.bonusMonths} ay hediye
            </span>
          )}
        </p>
      </div>

      {/* Price: the numeral carries the weight, the unit stays quiet. */}
      <div className="mt-6 flex items-end gap-1.5">
        <span className="font-display text-[2.75rem] font-extrabold leading-none tracking-tight">
          {formatAmount(total)}
        </span>
        <span className={`pb-1 font-display text-xl font-bold ${t.body}`}>{siteCurrencySymbol}</span>
        <span className={`pb-1.5 text-sm ${t.sub}`}>/ {plan.months} ay</span>
      </div>

      <div className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1.5">
        <p className={`text-sm ${t.body}`}>
          Ayda ~{formatPrice(perMonth)}
          <span className={t.faint}> · {term} ay</span>
        </p>
        {savings > 0 && (
          <span className={`rounded px-1.5 py-0.5 text-xs font-medium ${solid ? 'bg-white/15 text-white' : 'bg-emerald-500/10 text-emerald-300'}`}>
            %{savings} daha uygun
          </span>
        )}
      </div>
      <p className={`mt-1.5 text-xs ${t.faint}`}>Tek seferlik ödeme, otomatik yenileme yok</p>

      {/* Connection stepper */}
      <div className="mt-6">
        <p className={`label mb-2 ${solid ? 'text-white/80' : ''}`}>Eş zamanlı bağlantı</p>
        <div className={`flex items-center rounded-lg border ${t.field}`}>
          <button
            type="button"
            onClick={() => setConnections((c) => Math.max(1, c - 1))}
            disabled={connections <= 1}
            aria-label="Bağlantı sayısını azalt"
            className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-l-lg transition-colors disabled:opacity-30 ${solid ? 'text-white/80 hover:bg-white/10 hover:text-white' : 'text-mist hover:bg-navy-800 hover:text-paper'}`}
          >
            <Minus aria-hidden="true" className="h-4 w-4" />
          </button>
          <span
            aria-live="polite"
            className={`flex-1 border-x py-2.5 text-center font-display text-lg font-bold ${solid ? 'border-white/20' : 'border-navy-600'}`}
          >
            {connections}
          </span>
          <button
            type="button"
            onClick={() => setConnections((c) => Math.min(maxConnections, c + 1))}
            disabled={connections >= maxConnections}
            aria-label="Bağlantı sayısını artır"
            className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-r-lg transition-colors disabled:opacity-30 ${solid ? 'text-white/80 hover:bg-white/10 hover:text-white' : 'text-mist hover:bg-navy-800 hover:text-paper'}`}
          >
            <Plus aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
        <p className={`mt-2 text-xs leading-relaxed ${t.faint}`}>
          İlk bağlantı tam fiyat, her ek bağlantı %{discountPct} daha uygun.
        </p>
      </div>

      <ul className={`mt-6 flex flex-1 flex-col gap-2.5 border-t pt-6 ${t.line}`}>
        {planFeatures(plan).map((feature) => (
          <li key={feature} className={`flex gap-2.5 text-sm leading-relaxed ${t.body}`}>
            <Check aria-hidden="true" className={`mt-0.5 h-4 w-4 shrink-0 ${t.tick}`} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => onSelect(plan, connections)}
        className={[
          // Taller target, heavier type, and a lift on hover so the control
          // feels like the primary action rather than a plain link.
          'group/cta mt-6 inline-flex h-[3.25rem] w-full items-center justify-center gap-2',
          'rounded-xl font-display text-[0.9375rem] font-bold tracking-[0.01em]',
          'transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99]',
          solid
            ? 'bg-white text-brand-600 shadow-[0_10px_28px_-12px_rgba(0,0,0,0.8)] hover:bg-white hover:shadow-[0_16px_34px_-12px_rgba(0,0,0,0.9)]'
            : plan.featured
              ? 'bg-gradient-to-r from-brand-500 to-brand-400 text-white shadow-[0_12px_30px_-12px_rgba(225,29,46,0.9)] hover:shadow-[0_18px_40px_-12px_rgba(225,29,46,1)]'
              : 'border border-navy-500 bg-navy-800/70 text-paper hover:border-brand-500/70 hover:bg-navy-700 hover:shadow-[0_12px_30px_-16px_rgba(225,29,46,0.9)]',
        ].join(' ')}
      >
        Bu paketi seç
        <ArrowRight
          aria-hidden="true"
          className="h-4 w-4 transition-transform duration-200 group-hover/cta:translate-x-1"
        />
      </button>

      <p className={`mt-4 text-xs leading-relaxed ${t.faint}`}>{availabilityNote}</p>
    </div>
  );
}
