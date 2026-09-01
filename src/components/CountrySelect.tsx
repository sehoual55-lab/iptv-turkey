'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, ChevronDown, Search } from 'lucide-react';
import { countries, type Country } from '@/data/countries';

/**
 * Country dial-code picker with search.
 *
 * Deliberately shows the ISO code in a pill rather than a flag emoji: Windows
 * has no flag glyphs and renders regional indicators as bare letters ("TR"),
 * which looks broken. A styled pill reads as intentional on every platform.
 */
export function CountrySelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (dial: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);

  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selected = useMemo(
    () => countries.find((c) => c.dial === value) ?? countries[0],
    [value]
  );

  const results = useMemo(() => {
    const q = query.trim().toLocaleLowerCase('tr');
    if (!q) return countries;
    return countries.filter(
      (c) =>
        c.name.toLocaleLowerCase('tr').includes(q) ||
        c.dial.includes(q) ||
        c.code.toLocaleLowerCase('tr').includes(q)
    );
  }, [query]);

  // Focus the search box as soon as the panel opens.
  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
      inputRef.current?.focus();
    }
  }, [open]);

  // Close on outside click.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  // Keep the highlighted row in view while arrowing.
  useEffect(() => {
    if (!open) return;
    listRef.current?.querySelector<HTMLElement>('[data-active="true"]')?.scrollIntoView({ block: 'nearest' });
  }, [active, open]);

  const choose = (c: Country) => {
    onChange(c.dial);
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => Math.min(results.length - 1, i + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => Math.max(0, i - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[active]) choose(results[active]);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
    }
  };

  return (
    <div ref={wrapRef} className="relative w-[7.5rem] shrink-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Ülke kodu: ${selected.name} ${selected.dial}`}
        className="field flex h-full w-full items-center gap-2 px-3 text-left"
      >
        <span className="rounded bg-navy-700 px-1.5 py-0.5 font-display text-[0.625rem] font-bold tracking-wide text-mist">
          {selected.code}
        </span>
        <span className="flex-1 font-display text-sm font-semibold">{selected.dial}</span>
        <ChevronDown
          aria-hidden="true"
          className={`h-4 w-4 shrink-0 text-haze transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute left-0 z-20 mt-2 w-[19rem] overflow-hidden rounded-lg border border-navy-500 bg-navy-800 shadow-lift">
          <div className="flex items-center gap-2 border-b border-navy-600 px-3">
            <Search aria-hidden="true" className="h-4 w-4 shrink-0 text-haze" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActive(0);
              }}
              onKeyDown={onKeyDown}
              placeholder="Ülke veya kod arayın"
              aria-label="Ülke ara"
              className="w-full bg-transparent py-3 text-sm text-paper placeholder:text-haze focus:outline-none"
            />
          </div>

          {results.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-haze">Sonuç bulunamadı</p>
          ) : (
            <ul ref={listRef} role="listbox" className="max-h-64 overflow-y-auto py-1">
              {results.map((c, i) => {
                const isSelected = c.dial === value;
                return (
                  <li key={c.code}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      data-active={i === active}
                      onMouseEnter={() => setActive(i)}
                      onClick={() => choose(c)}
                      className={`flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm transition-colors ${
                        i === active ? 'bg-navy-700' : ''
                      }`}
                    >
                      <span className="w-8 shrink-0 rounded bg-navy-700 px-1 py-0.5 text-center font-display text-[0.625rem] font-bold text-mist">
                        {c.code}
                      </span>
                      <span className="min-w-0 flex-1 truncate text-mist">{c.name}</span>
                      <span className="shrink-0 font-display text-xs font-semibold text-haze">{c.dial}</span>
                      {isSelected && <Check aria-hidden="true" className="h-4 w-4 shrink-0 text-brand-400" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
