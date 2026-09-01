import { Eyebrow, AccentHeading } from './Eyebrow';

/** Consistent vertical rhythm, optional eyebrow caption and section heading. */
export function Section({
  eyebrow,
  title,
  intro,
  children,
  className = '',
  headingId,
  center = false,
  wide = false,
}: {
  eyebrow?: string;
  /** Wrap one word in *asterisks* to give it the accent treatment. */
  title?: string;
  intro?: string;
  children: React.ReactNode;
  className?: string;
  headingId?: string;
  /** Centres the heading block and its intro. */
  center?: boolean;
  /** Uses the wider container — for content that needs the horizontal room. */
  wide?: boolean;
}) {
  return (
    <section className={`py-16 sm:py-24 ${className}`} aria-labelledby={headingId}>
      <div className={wide ? 'shell-wide' : 'shell'}>
        {title && (
          <div className={`mb-10 max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            <AccentHeading id={headingId} text={title} className="text-display-sm" />
            {intro && <p className="mt-4 text-lead text-mist">{intro}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
