'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { OrderForm } from './OrderForm';
import type { Plan } from '@/data/pricing-data';

/** Wraps the shared order form in a dialog for the pricing cards. */
export function OrderModal({
  plan,
  initialConnections = 1,
  lockPlan = true,
  onClose,
}: {
  /** null closes the dialog. */
  plan: Plan | null;
  initialConnections?: number;
  /** false lets the visitor switch plans inside the dialog. */
  lockPlan?: boolean;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState<Plan | null>(plan);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Adopt whichever plan opened the dialog.
  useEffect(() => {
    setCurrent(plan);
  }, [plan]);

  useEffect(() => {
    if (!plan) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [plan, onClose]);

  if (!plan || !current || !mounted) return null;

  /**
   * Rendered through a portal on document.body.
   *
   * The sticky header uses backdrop-blur, and an element with a backdrop-filter
   * becomes the containing block for its fixed-position descendants. Without
   * the portal, a dialog opened from the header CTA would position itself
   * against the header rather than the viewport.
   */
  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center overflow-y-auto overscroll-contain bg-black/80 p-0 backdrop-blur-sm sm:items-start sm:p-6 sm:py-10"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="siparis-basligi"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="my-auto w-full max-w-lg rounded-t-card border border-navy-600 bg-navy-800 p-6 shadow-lift sm:rounded-card"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 id="siparis-basligi" className="font-display text-xl font-bold">
              Sipariş bilgileri
            </h2>
            <p className="mt-1 text-sm text-mist">
              Bilgilerinizi girin, siparişi WhatsApp&apos;a iletelim.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Pencereyi kapat"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-navy-600 text-mist hover:text-paper"
          >
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>

        {/* key remounts the form when a different plan is picked */}
        <OrderForm
          key={`${current.id}-${initialConnections}`}
          plan={current}
          onPlanChange={lockPlan ? undefined : setCurrent}
          initialConnections={initialConnections}
          lockPlan={lockPlan}
        />
      </div>
    </div>,
    document.body
  );
}
