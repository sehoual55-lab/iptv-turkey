import { Info } from 'lucide-react';
import type { Block } from '@/data/blog-data';

/** Renders the typed block list an Article is made of. */
export function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="flex flex-col gap-5">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'h2':
            return (
              <h2
                key={i}
                id={block.id}
                className="mt-6 scroll-mt-28 font-display text-2xl font-bold text-paper"
              >
                {block.text}
              </h2>
            );

          case 'h3':
            return (
              <h3 key={i} className="mt-3 font-display text-lg font-bold text-paper">
                {block.text}
              </h3>
            );

          case 'p':
            return (
              <p key={i} className="leading-relaxed text-mist">
                {block.text}
              </p>
            );

          case 'ul':
            return (
              <ul key={i} className="flex flex-col gap-2.5 pl-1">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-3 leading-relaxed text-mist">
                    <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );

          case 'ol':
            return (
              <ol key={i} className="flex flex-col gap-3">
                {block.items.map((item, n) => (
                  <li key={item} className="flex gap-3 leading-relaxed text-mist">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-navy-600 font-display text-xs font-bold text-brand-300">
                      {n + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            );

          case 'note':
            return (
              <aside
                key={i}
                className="flex gap-3 rounded-card border border-brand-500/30 bg-brand-500/5 p-5"
              >
                <Info aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
                <p className="text-sm leading-relaxed text-mist">{block.text}</p>
              </aside>
            );

          case 'table':
            return (
              <figure key={i} className="my-2">
                <div className="overflow-x-auto rounded-card border border-navy-600">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-navy-800">
                        {block.head.map((cell) => (
                          <th
                            key={cell}
                            scope="col"
                            className="border-b border-navy-600 px-4 py-3 text-left font-display font-semibold text-paper"
                          >
                            {cell}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.map((row, r) => (
                        <tr key={r} className="border-b border-navy-600 last:border-0">
                          {row.map((cell, c) => (
                            <td
                              key={c}
                              className={`px-4 py-3 align-top ${
                                c === 0 ? 'font-medium text-paper' : 'text-mist'
                              }`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {block.caption && (
                  <figcaption className="mt-2 text-xs text-haze">{block.caption}</figcaption>
                )}
              </figure>
            );
        }
      })}
    </div>
  );
}
