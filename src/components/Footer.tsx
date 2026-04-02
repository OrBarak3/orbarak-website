import type { FooterMeta } from '../types/portfolio';

interface FooterProps {
  meta: FooterMeta;
}

export function Footer({ meta }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8">
      <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 pt-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="text-sm text-slate-200">
          {currentYear} {meta.name}
        </div>
        <div className="ui-meta-label text-slate-500">{meta.role}</div>
        <div className="ui-meta-label text-slate-500">{meta.stack}</div>
      </div>
    </footer>
  );
}
