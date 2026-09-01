import type { Faq } from '@/data/faq-data';

/**
 * Uses native <details>/<summary>: keyboard accessible with no JavaScript,
 * and the answers stay in the DOM so FAQPage schema matches visible content.
 */
export function FAQAccordion({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="flex flex-col gap-3">
      {faqs.map((faq) => (
        <details key={faq.question} className="card group p-0">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-display text-base font-medium text-paper">
            {faq.question}
            <span
              aria-hidden="true"
              className="shrink-0 text-2xl leading-none text-brand-400 group-open:hidden"
            >
              +
            </span>
            <span
              aria-hidden="true"
              className="hidden shrink-0 text-2xl leading-none text-brand-400 group-open:inline"
            >
              −
            </span>
          </summary>
          <div className="border-t border-navy-600 px-5 py-4">
            <p className="text-sm leading-relaxed text-mist">{faq.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
