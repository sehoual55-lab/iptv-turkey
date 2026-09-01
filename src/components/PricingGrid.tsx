'use client';

import { useState } from 'react';
import { PricingCard } from './PricingCard';
import { OrderModal } from './OrderModal';
import { plans, type Plan } from '@/data/pricing-data';

export function PricingGrid({ limit }: { limit?: number }) {
  const [selected, setSelected] = useState<{ plan: Plan; connections: number } | null>(null);
  const shown = limit ? plans.slice(0, limit) : plans;

  return (
    <>
      <div className="grid items-stretch gap-6 pt-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
        {shown.map((plan) => (
          <PricingCard
            key={plan.id}
            plan={plan}
            onSelect={(p, c) => setSelected({ plan: p, connections: c })}
          />
        ))}
      </div>
      <OrderModal
        plan={selected?.plan ?? null}
        initialConnections={selected?.connections ?? 1}
        onClose={() => setSelected(null)}
      />
    </>
  );
}
