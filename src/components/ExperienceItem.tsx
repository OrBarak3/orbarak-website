import type { ExperienceEntry } from '../types/portfolio';

interface ExperienceItemProps {
  entry: ExperienceEntry;
  isLast: boolean;
}

export function ExperienceItem({ entry, isLast }: ExperienceItemProps) {
  return (
    <div className="relative pl-10">
      {!isLast ? <div className="absolute left-[15px] top-10 h-[calc(100%+2rem)] w-px bg-white/10" /> : null}
      <div className="absolute left-0 top-2 flex h-8 w-8 items-center justify-center rounded-full border border-accent/35 bg-accent/10 font-mono text-xs text-accent">
        0{isLast ? 2 : 1}
      </div>

      <div className="panel-hover rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-card backdrop-blur-xl sm:rounded-[2rem] sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="ui-eyebrow text-accent-soft">{entry.label}</div>
            <h3 className="mt-3 text-2xl font-semibold text-white">{entry.company}</h3>
            <p className="mt-2 text-base text-slate-200">{entry.role}</p>
          </div>
          <div className="rounded-full border border-white/10 bg-slate-950/80 px-4 py-2 font-mono text-xs text-slate-400">
            experience
          </div>
        </div>

        <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">{entry.summary}</p>

        <div className="mt-6 grid gap-3">
          {entry.bullets.map((bullet) => (
            <div
              key={bullet}
              className="rounded-2xl border border-white/8 bg-slate-950/70 px-4 py-3 text-sm leading-6 text-slate-200"
            >
              {bullet}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
