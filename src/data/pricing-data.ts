/**
 * Package data.
 *
 * Prices are placeholders — set your own values in `price`. Amounts are in the
 * currency defined in site-config.ts (EUR by default).
 *
 * Discount badges are OFF by default. To show one, set `badge` to a string and
 * `showBadges` to true. Do not advertise a discount that is not real.
 */

import { siteConfig } from './site-config';

/** Re-exported so pricing components need only one import. */
export const siteCurrencySymbol = siteConfig.currencySymbol;

export const showBadges = true;

/**
 * Unverifiable channel and library counts ("25.000+ kanal") are the strongest
 * spam signal on a pricing page and invite rights complaints. They are off by
 * default; set this to true to show `countFeatures` instead of `features`.
 */
export const showChannelCounts = false;

/**
 * Connection pricing. The first connection is charged at the plan price; each
 * additional simultaneous connection costs `extraConnectionDiscount` less.
 * Set the discount to 0 to charge full price for every connection.
 */
export const extraConnectionDiscount = 0.15;
export const maxConnections = 5;

/** Total for a plan at a given number of simultaneous connections. */
export function planTotal(plan: Plan, connections: number): number {
  const extras = Math.max(0, connections - 1);
  return plan.price + extras * plan.price * (1 - extraConnectionDiscount);
}

export type Plan = {
  id: string;
  name: string;
  /** Paid months. */
  months: number;
  /** Free months added on top. 0 when there is no bonus. */
  bonusMonths: number;
  /** Placeholder price. Edit freely. */
  price: number;
  /** Optional strike-through reference price. Only shown when showBadges is true. */
  compareAt?: number;
  badge?: string;
  /** Renders the card on a solid red field instead of the dark surface. */
  solid?: boolean;
  /** Shown when showChannelCounts is true. */
  countFeatures?: string[];
  connections: number;
  featured?: boolean;
  features: string[];
};

export const plans: Plan[] = [
  {
    id: 'bronze',
    name: 'Bronze',
    months: 12,
    bonusMonths: 0,
    price: 39.99,
    connections: 1,
    features: [
      'Ulusal ve uluslararası kanallar',
      'Geniş film ve dizi arşivi',
      '4K / FHD / HD kalite',
      'Tüm cihazlarla uyumlu',
      'TV yayın rehberi (EPG)',
      'Kararlı sunucu altyapısı',
      '7/24 teknik destek',
      'Anında teslimat',
    ],
    countFeatures: [
      '25.000+ TV kanalı',
      '100.000+ film ve dizi',
      '4K / FHD / HD kalite',
      'Tüm uluslararası kanallar',
      'Tüm cihazlarla uyumlu',
      'TV yayın rehberi (EPG)',
      'Kararlı sunucu altyapısı',
      '7/24 teknik destek',
      'Anında teslimat',
    ],
  },
  {
    id: 'gold',
    name: 'Gold',
    months: 15,
    bonusMonths: 3,
    price: 49.99,
    connections: 1,
    featured: true,
    badge: 'EN POPÜLER',
    features: [
      'Ulusal ve uluslararası kanallar',
      'Geniş film ve dizi arşivi',
      '4K / FHD / HD kalite',
      'Tüm cihazlarla uyumlu',
      'TV yayın rehberi (EPG)',
      'Kararlı sunucu altyapısı',
      '7/24 teknik destek',
      'Anında teslimat',
    ],
    countFeatures: [
      '25.000+ TV kanalı',
      '100.000+ film ve dizi',
      '4K / FHD / HD kalite',
      'Tüm uluslararası kanallar',
      'Tüm cihazlarla uyumlu',
      'TV yayın rehberi (EPG)',
      'Kararlı sunucu altyapısı',
      '7/24 teknik destek',
      'Anında teslimat',
    ],
  },
  {
    id: 'platinum',
    name: 'Platinum',
    months: 15,
    bonusMonths: 3,
    price: 59.99,
    connections: 1,
    features: [
      'Ulusal ve uluslararası kanallar',
      'Geniş film ve dizi arşivi',
      '4K / FHD / HD kalite',
      'Tüm cihazlarla uyumlu',
      'TV yayın rehberi (EPG)',
      'Kararlı sunucu altyapısı',
      '7/24 teknik destek',
      'Anında teslimat',
    ],
    countFeatures: [
      '25.000+ TV kanalı',
      '100.000+ film ve dizi',
      '4K / FHD / HD kalite',
      'Tüm uluslararası kanallar',
      'Tüm cihazlarla uyumlu',
      'TV yayın rehberi (EPG)',
      'Kararlı sunucu altyapısı',
      '7/24 teknik destek',
      'Anında teslimat',
    ],
  },
  {
    id: 'exclusive',
    name: 'Exclusive',
    months: 24,
    bonusMonths: 3,
    price: 84.99,
    connections: 1,
    solid: true,
    badge: 'EN İYİ DEĞER',
    features: [
      'En geniş kanal listesi',
      'En geniş film ve dizi arşivi',
      '4K / FHD / HD kalite',
      'Tüm cihazlarla uyumlu',
      'TV yayın rehberi (EPG)',
      'Kararlı sunucu altyapısı',
      '7/24 teknik destek',
      'Anında teslimat',
    ],
    countFeatures: [
      '130.000+ TV kanalı',
      '140.000+ film ve dizi',
      '4K / FHD / HD kalite',
      'Tüm uluslararası kanallar',
      'Tüm cihazlarla uyumlu',
      'TV yayın rehberi (EPG)',
      'Kararlı sunucu altyapısı',
      '7/24 teknik destek',
      'Anında teslimat',
    ],
  },
];

/** Shown under every pricing card and on the packages page. */
export const availabilityNote =
  'İçerik ve kanal kullanılabilirliği lisanslama ve bölgeye göre değişebilir.';

export const connectionOptions = [1, 2, 3, 4, 5];

/** Paid months plus any free months. */
export function totalMonths(plan: Plan): number {
  return plan.months + plan.bonusMonths;
}

/** Effective monthly cost across the full term, bonus months included. */
export function monthlyPrice(plan: Plan, connections = 1): number {
  return planTotal(plan, connections) / totalMonths(plan);
}

/**
 * How much cheaper this plan is per month than the shortest plan.
 * Returns 0 for the baseline plan itself, so nothing is shown there.
 */
export function savingsPercent(plan: Plan): number {
  const baseline = plans[0];
  if (plan.id === baseline.id) return 0;
  const ratio = monthlyPrice(plan) / monthlyPrice(baseline);
  return Math.max(0, Math.round((1 - ratio) * 100));
}

/** Amount without the currency symbol, for split typographic treatment. */
/** Feature list to render, honouring the showChannelCounts flag. */
export function planFeatures(plan: Plan): string[] {
  return showChannelCounts && plan.countFeatures ? plan.countFeatures : plan.features;
}

export function formatAmount(amount: number): string {
  const rounded = Math.round(amount * 100) / 100;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(2).replace('.', ',');
}

export function formatPrice(amount: number): string {
  // Turkish number formatting uses a comma as the decimal separator.
  const rounded = Math.round(amount * 100) / 100;
  const text = Number.isInteger(rounded)
    ? String(rounded)
    : rounded.toFixed(2).replace('.', ',');
  return `${text} €`;
}
