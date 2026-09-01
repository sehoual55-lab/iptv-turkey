/** Small caption that sits above a section heading. */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

/**
 * Renders a heading where one word is picked out in the brand red. Pass the
 * sentence with the accent word wrapped in asterisks:
 *   <AccentHeading text="Bir abonelik *basit*" />
 */
export function AccentHeading({
  text,
  as: Tag = 'h2',
  className = '',
  id,
}: {
  text: string;
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  id?: string;
}) {
  const parts = text.split(/\*(.+?)\*/g);
  return (
    <Tag id={id} className={className}>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="text-brand-400">{part}</span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </Tag>
  );
}
