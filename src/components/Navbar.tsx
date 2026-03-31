import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { AvailabilityStatus, NavItem } from '../types/portfolio';

interface NavbarProps {
  items: NavItem[];
  activeSection: string;
  availability: AvailabilityStatus;
}

export function Navbar({ items, activeSection, availability }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const menuEase = [0.22, 1, 0.36, 1] as const;

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
            <div className="ui-meta-label text-slate-500">AI Engineer</div>
          </div>
        </a>

        <div className="hidden items-center gap-3 md:flex">
          <nav className="flex items-center gap-2">
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

          <div
            className="ui-meta-label inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-2 text-emerald-200"
            aria-label={availability.longLabel}
          >
            <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.75)]" />
            {availability.shortLabel}
          </div>

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
          {open ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="4" y1="4" x2="16" y2="16" />
              <line x1="16" y1="4" x2="4" y2="16" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="5" x2="17" y2="5" />
              <line x1="3" y1="10" x2="17" y2="10" />
              <line x1="3" y1="15" x2="17" y2="15" />
            </svg>
          )}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, height: 'auto' }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.12 : 0.24, ease: menuEase }}
            className="overflow-hidden border-t border-white/10 bg-slate-950/95 md:hidden"
          >
            <motion.div
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: shouldReduceMotion ? 0.12 : 0.2, ease: menuEase }}
              className="px-5 py-4"
            >
              <div className="mb-4 flex items-center gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.75)]" />
                <div>
                  <div className="ui-meta-label text-emerald-200">{availability.shortLabel}</div>
                  <div className="mt-1 text-sm text-emerald-50/90">{availability.longLabel}</div>
                </div>
              </div>

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
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
