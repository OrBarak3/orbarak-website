import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import type { DetailKey, Project } from '../types/portfolio';
import { highlightJson } from '../utils/highlightJson';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [activeDetail, setActiveDetail] = useState<DetailKey | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const detailEase = [0.22, 1, 0.36, 1] as const;

  const detail = activeDetail && project.details ? project.details[activeDetail] : null;

  const toggleDetail = (key: DetailKey) => {
    setActiveDetail((current) => (current === key ? null : key));
  };

  return (
    <article className="panel-hover group rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-card backdrop-blur-xl sm:rounded-[2rem] sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="ui-eyebrow text-accent-soft">{project.eyebrow}</div>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">{project.title}</h3>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
            {project.summary}
          </p>
        </div>

        <div className="rounded-full border border-white/10 bg-slate-950/75 px-4 py-2 font-mono text-xs text-slate-300">
          {project.id}
        </div>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-3xl border border-white/8 bg-slate-950/75 p-5">
          <div className="ui-eyebrow text-slate-500">Impact</div>
          <div className="mt-4 space-y-3">
            {project.impact.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm leading-6 text-slate-200"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/8 bg-slate-950/75 p-5">
          <div className="ui-eyebrow text-slate-500">Technology Stack</div>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 font-mono text-xs text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {project.details && (
            <div className="mt-6 flex flex-wrap gap-3">
              {(['architecture', 'schema'] as DetailKey[]).map((key) => {
                const item = project.details![key];
                const selected = activeDetail === key;

                return (
                  <button
                    key={key}
                    type="button"
                    aria-expanded={selected}
                    onClick={() => toggleDetail(key)}
                    className={`inline-flex items-center rounded-full border px-4 py-2 text-sm transition ${
                      selected
                        ? 'panel-active text-accent'
                        : 'border-white/10 bg-white/5 text-slate-200 hover:border-white/20 hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {project.highlights && (
        <div className="mt-4 rounded-3xl border border-white/8 bg-slate-950/75 p-5">
          <div className="ui-eyebrow text-slate-500">Highlights</div>
          <div className="mt-4 space-y-3">
            {project.highlights.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm leading-6 text-slate-200"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      )}

      <AnimatePresence initial={false}>
        {detail ? (
          <motion.div
            key={detail.key}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, height: 0, y: 10 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, height: 'auto', y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0, y: -8 }}
            transition={{ duration: 0.28, ease: detailEase }}
            className="mt-6 overflow-hidden rounded-3xl border border-accent/25 bg-[linear-gradient(180deg,rgba(8,47,73,0.45),rgba(15,23,42,0.9))] p-5"
          >
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <div className="ui-eyebrow text-accent-soft">{detail.title}</div>
                <p className="mt-3 text-sm leading-7 text-slate-200">{detail.description}</p>
                <div className="mt-5 space-y-3">
                  {detail.bullets.map((bullet) => (
                    <div
                      key={bullet}
                      className="rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-3 text-sm leading-6 text-slate-300"
                    >
                      {bullet}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-white/8 bg-slate-950/90 p-5">
                <div className="ui-eyebrow text-slate-500">
                  {detail.key === 'architecture' ? 'Flow Logic' : 'Schema Example'}
                </div>
                {detail.snippet ? (
                  <pre className="mt-4 overflow-x-auto font-mono text-xs leading-6 text-slate-300">
                    <code>{highlightJson(detail.snippet)}</code>
                  </pre>
                ) : null}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </article>
  );
}
