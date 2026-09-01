/** Compact fact strip under the hero. Values are factual, not marketing claims. */
export function StatStrip({
  items,
}: {
  items: { value: string; label: string }[];
}) {
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-navy-600 bg-navy-600 sm:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="bg-navy-800 px-5 py-4">
          <dt className="sr-only">{item.label}</dt>
          <dd>
            <span className="block font-display text-lg font-bold text-paper">{item.value}</span>
            <span className="mt-0.5 block text-xs text-haze">{item.label}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
