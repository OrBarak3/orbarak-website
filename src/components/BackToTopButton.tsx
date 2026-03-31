import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

const VISIBILITY_THRESHOLD = 600;

export function BackToTopButton() {
  const [visible, setVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const buttonEase = [0.22, 1, 0.36, 1] as const;

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > VISIBILITY_THRESHOLD);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence initial={false}>
      {visible ? (
        <motion.a
          key="back-to-top"
          href="#top"
          aria-label="Back to top"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: shouldReduceMotion ? 0.12 : 0.22, ease: buttonEase }}
          className="ui-meta-label fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-slate-950/85 px-4 py-3 text-accent shadow-glow backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-accent/50 hover:bg-slate-950/95 sm:bottom-6 sm:right-6"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M7 11V3" />
            <path d="M3.5 6.5L7 3l3.5 3.5" />
          </svg>
          Top
        </motion.a>
      ) : null}
    </AnimatePresence>
  );
}
