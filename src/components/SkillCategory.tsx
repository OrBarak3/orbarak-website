import type { SkillGroup } from '../types/portfolio';

interface SkillCategoryProps {
  group: SkillGroup;
}

export function SkillCategory({ group }: SkillCategoryProps) {
  return (
    <article className="panel-hover rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-card backdrop-blur-xl sm:rounded-[2rem] sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="ui-eyebrow text-accent-soft">{group.title}</div>
          <p className="mt-3 text-sm leading-7 text-slate-300">{group.description}</p>
        </div>
        <div className="rounded-full border border-white/10 bg-slate-950/75 px-3 py-1 font-mono text-xs text-slate-300">
          {group.items.length} items
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {group.items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 font-mono text-xs text-slate-200 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
          >
            {item}
          </span>
        ))}
      </div>
    </article>
  );
}
