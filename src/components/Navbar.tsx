import { useEffect, useState } from 'react';
import type { NavItem } from '../types/portfolio';

interface NavbarProps {
  items: NavItem[];
  activeSection: string;
}

export function Navbar({ items, activeSection }: NavbarProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [activeSection]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
        <a href="#top" className="group inline-flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 font-mono text-sm text-accent shadow-glow transition-transform duration-300 group-hover:-translate-y-0.5">
            OB
          </div>
          <div>
            <div className="text-sm font-medium tracking-wide text-slate-200">Or Barak</div>
            <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-slate-500">
              AI Engineer
            </div>
          </div>
        </a>

        <nav className="hidden items-center gap-2 md:flex">
          {items.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <a
            href="#contact"
            className="inline-flex items-center rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-sm font-medium text-accent transition hover:border-accent/60 hover:bg-accent/15"
          >
            Get in Touch
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10 md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          <span className="font-mono text-lg">{open ? 'X' : '='}</span>
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-slate-950/95 px-5 py-4 md:hidden">
          <nav className="flex flex-col gap-2">
            {items.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`rounded-2xl px-4 py-3 text-sm transition ${
                  activeSection === item.id
                    ? 'bg-white/10 text-white'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="mt-2 inline-flex items-center justify-center rounded-2xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm font-medium text-accent transition hover:border-accent/60 hover:bg-accent/15"
            >
              Get in Touch
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

