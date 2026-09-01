'use client';

import { useState } from 'react';
import { OrderModal } from './OrderModal';
import { plans } from '@/data/pricing-data';

/**
 * Opens the checkout dialog from anywhere — header CTA, final call to action,
 * inline links. The visitor picks the plan inside the dialog, so no separate
 * checkout page is needed.
 */
export function CheckoutTrigger({
  className = 'btn-primary',
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const featured = plans.find((p) => p.featured) ?? plans[0];

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {children}
      </button>

      <OrderModal
        plan={open ? featured : null}
        lockPlan={false}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
