import { motion, useReducedMotion } from 'framer-motion';
import type { MetricStat, SummaryFact } from '../types/portfolio';

interface HeroProps {
  facts: SummaryFact[];
  metrics: MetricStat[];
  workflowSteps: string[];
  snippet: string;
}

export function Hero({ facts, metrics, workflowSteps, snippet }: HeroProps) {
  const shouldReduceMotion = useReducedMotion();
  const revealEase = [0.22, 1, 0.36, 1] as const;

  const containerAnimation = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7, ease: revealEase },
      };

  return (
    <section id="top" className="relative overflow-hidden pt-10">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.20),transparent_32%),radial-gradient(circle_at_top_right,rgba(14,165,233,0.18),transparent_26%),linear-gradient(180deg,rgba(15,23,42,0.92),rgba(2,6,23,1))]" />
      <div className="absolute inset-0 -z-10 bg-hero-grid bg-[size:32px_32px] opacity-[0.08]" />

      <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-24 pt-8 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:pb-28">
        <motion.div {...containerAnimation} className="max-w-3xl">
          <div className="inline-flex items-center gap-3 rounded-full border border-accent/35 bg-accent/10 px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-accent shadow-glow">
            <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_rgba(115,216,255,0.8)]" />
            Status: Available for AI Engineering roles
          </div>

          <h1 className="mt-8 max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            AI Engineer building reliable LLM workflows for production
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Mechanical Engineering graduate turned AI workflow specialist with hands-on
            experience building LLM systems, evaluation pipelines, structured extraction
            workflows, and human-in-the-loop AI products for enterprise use cases.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-full border border-accent/45 bg-accent px-6 py-3 text-sm font-medium text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-300"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10"
            >
              Contact Me
            </a>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-card backdrop-blur"
              >
                <div className="font-mono text-2xl font-medium text-accent">{metric.value}</div>
                <div className="mt-2 text-sm text-slate-300">{metric.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.aside
          {...containerAnimation}
          transition={
            shouldReduceMotion
              ? undefined
              : { duration: 0.8, delay: 0.15, ease: revealEase }
          }
          className="relative rounded-[2rem] border border-white/10 bg-slate-900/65 p-6 shadow-card backdrop-blur-xl lg:mt-6"
        >
          <div className="absolute inset-x-8 top-0 h-px overflow-hidden">
            <div className="h-full w-24 bg-gradient-to-r from-transparent via-accent to-transparent opacity-80 animate-pulseLine" />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent-soft">
                System Summary
              </p>
              <h2 className="mt-2 text-xl font-semibold text-white">Production AI workflow profile</h2>
            </div>
            <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-slate-300">
              profile.ts
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="flex flex-col gap-1 rounded-2xl border border-white/8 bg-white/[0.03] p-4"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">
                  {fact.label}
                </span>
                <span className="text-sm leading-6 text-slate-200">{fact.value}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-white/8 bg-slate-950/80 p-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">
                Workflow
              </span>
              <span className="font-mono text-[11px] text-accent-soft">v2026.ready</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {workflowSteps.map((step, index) => (
                <div
                  key={step}
                  className={`rounded-2xl border px-3 py-3 text-center font-mono text-xs ${
                    index === workflowSteps.length - 1
                      ? 'border-accent/30 bg-accent/10 text-accent'
                      : 'border-white/8 bg-white/[0.03] text-slate-300'
                  } ${shouldReduceMotion ? '' : 'animate-float'}`}
                  style={!shouldReduceMotion ? { animationDelay: `${index * 0.5}s` } : undefined}
                >
                  {step}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-white/8 bg-slate-950/90 p-4">
            <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">
              Example structured output
            </div>
            <pre className="overflow-x-auto font-mono text-xs leading-6 text-slate-300">
              <code>{snippet}</code>
            </pre>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
