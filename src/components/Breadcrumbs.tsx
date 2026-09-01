import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export type Crumb = { name: string; href: string };

export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav aria-label="Sayfa yolu" className="mb-8">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-haze">
        {trail.map((crumb, i) => {
          const isLast = i === trail.length - 1;
          return (
            <li key={crumb.href} className="flex items-center gap-1">
              {i > 0 && <ChevronRight aria-hidden="true" className="h-4 w-4 text-navy-500" />}
              {isLast ? (
                <span aria-current="page" className="text-mist">{crumb.name}</span>
              ) : (
                <Link href={crumb.href} className="hover:text-paper">{crumb.name}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
