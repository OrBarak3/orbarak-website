import type { ContactLink } from '../types/portfolio';
import { SectionTitle } from './SectionTitle';

interface ContactSectionProps {
  links: ContactLink[];
}

export function ContactSection({ links }: ContactSectionProps) {
  return (
    <section id="contact" className="scroll-mt-28 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="rounded-[2.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,47,73,0.45),rgba(15,23,42,0.96))] p-8 shadow-card backdrop-blur-xl sm:p-10">
          <SectionTitle
            eyebrow="Contact"
            title="Interested in AI Engineering, applied LLM systems, and workflow automation roles."
            description="The links below are placeholders for now, but the page structure keeps them centralized so they can be replaced quickly once you are ready to publish."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group rounded-3xl border border-white/10 bg-slate-950/70 p-5 transition hover:-translate-y-1 hover:border-accent/35 hover:bg-slate-950"
              >
                <div className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
                  {link.label}
                </div>
                <div className="mt-4 text-lg font-medium text-white">{link.value}</div>
                <div className="mt-3 text-sm text-accent transition group-hover:text-cyan-200">
                  Replace with real link before launch
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

