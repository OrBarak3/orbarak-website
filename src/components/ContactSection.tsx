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
            title="Contact details aligned with the current CV."
            description="The links below match the email, LinkedIn, and GitHub details listed on the resume."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="panel-hover group rounded-3xl border border-white/10 bg-slate-950/70 p-5"
              >
                <div className="ui-eyebrow text-slate-500">{link.label}</div>
                <div className="mt-4 text-lg font-medium text-white">{link.value}</div>
                <div className="mt-3 text-sm text-accent transition group-hover:text-cyan-200">
                  {link.note ?? 'Open contact link'}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
