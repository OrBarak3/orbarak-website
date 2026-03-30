import type { SkillGroup } from '../types/portfolio';

interface SkillCategoryProps {
  group: SkillGroup;
}

export function SkillCategory({ group }: SkillCategoryProps) {
  return (
    <article className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-card backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-accent-soft">
            {group.title}
          </div>
          <p className="mt-3 text-sm leading-7 text-slate-300">{group.description}</p>
        </div>
        <div className="rounded-full border border-white/10 bg-slate-950/80 px-3 py-1 font-mono text-xs text-slate-400">
          {group.items.length} items
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {group.items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-2 font-mono text-xs text-slate-200"
          >
            {item}
          </span>
        ))}
      </div>
    </article>
  );
}

