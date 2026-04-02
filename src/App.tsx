import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { BackToTopButton } from './components/BackToTopButton';
import { ContactSection } from './components/ContactSection';
import { ExperienceItem } from './components/ExperienceItem';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { ProjectCard } from './components/ProjectCard';
import { SectionTitle } from './components/SectionTitle';
import { SkillCategory } from './components/SkillCategory';
import {
  availabilityStatus,
  contactLinks,
  education,
  experience,
  footerMeta,
  heroFacts,
  heroMetrics,
  heroSnippet,
  languages,
  militaryService,
  navItems,
  projects,
  skillGroups,
  volunteering,
  workflowSteps,
} from './data/portfolio';

export default function App() {
  const shouldReduceMotion = useReducedMotion();
  const sectionIds = useMemo(() => navItems.map((item) => item.id), []);
  const [activeSection, setActiveSection] = useState(sectionIds[0]);
  const revealEase = [0.22, 1, 0.36, 1] as const;

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length > 0) {
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: '-30% 0px -50% 0px',
        threshold: [0.2, 0.45, 0.7],
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [sectionIds]);

  const sectionMotion = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.65, ease: revealEase },
      };

  const staggerContainer = shouldReduceMotion
    ? {}
    : {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, amount: 0.1 },
        variants: {
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        },
      };

  const staggerChild = shouldReduceMotion
    ? {}
    : {
        variants: {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: revealEase } },
        },
      };

  return (
    <div className="min-h-screen bg-background text-text">
      <div className="fixed inset-0 -z-20 bg-[radial-gradient(circle_at_20%_0%,rgba(34,211,238,0.12),transparent_28%),radial-gradient(circle_at_80%_10%,rgba(14,165,233,0.12),transparent_24%),linear-gradient(180deg,#020617_0%,#020617_100%)]" />
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(rgba(15,23,42,0.0),rgba(15,23,42,0.7))]" />

      <Navbar items={navItems} activeSection={activeSection} availability={availabilityStatus} />

      <main>
        <Hero
          facts={heroFacts}
          metrics={heroMetrics}
          workflowSteps={workflowSteps}
          snippet={heroSnippet}
        />

        <motion.section
          id="projects"
          className="scroll-mt-28 py-24 sm:py-28"
          {...sectionMotion}
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <SectionTitle
              eyebrow="Projects"
              title="Selected aiOla projects centered on tagging automation and transcript review."
              description="The featured work focuses on structured validation, LLM routing logic, and selective human review to reduce manual effort without losing control over quality."
            />

            <motion.div className="mt-12 grid gap-10" {...staggerContainer}>
              {projects.map((project) => (
                <motion.div key={project.id} {...staggerChild}>
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          id="skills"
          className="scroll-mt-28 py-24 sm:py-28"
          {...sectionMotion}
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <SectionTitle
              eyebrow="Skills"
              title="Tools and skills used in day-to-day applied AI work."
              description="This section follows the CV directly: LLM workflow design, agentic tooling, internal Python systems, data pipelines, and cross-functional delivery skills."
            />

            <motion.div className="mt-12 grid gap-6 lg:grid-cols-2" {...staggerContainer}>
              {skillGroups.map((group) => (
                <motion.div key={group.title} {...staggerChild}>
                  <SkillCategory group={group} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          id="experience"
          className="scroll-mt-28 py-24 sm:py-28"
          {...sectionMotion}
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <SectionTitle
              eyebrow="Experience"
              title="Current AI engineering work backed by an engineering foundation."
              description="The CV pairs hands-on aiOla delivery in production-oriented AI systems with a Mechanical Engineering background from Tel Aviv University."
            />

            <motion.div className="mt-12 space-y-8" {...staggerContainer}>
              {experience.map((entry, index) => (
                <motion.div key={entry.company} {...staggerChild}>
                  <ExperienceItem
                    entry={entry}
                    isLast={index === experience.length - 1}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          id="education"
          className="scroll-mt-28 py-24 sm:py-28"
          {...sectionMotion}
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <SectionTitle
              eyebrow="Education"
              title="Engineering foundation from Tel Aviv University."
              description="A Mechanical Engineering degree with applied coursework in machine learning, data analysis, and Python."
            />

            <motion.div className="mt-12 space-y-8" {...staggerContainer}>
              {education.map((entry, index) => (
                <motion.div key={entry.institution} {...staggerChild}>
                  <ExperienceItem
                    entry={{
                      company: entry.institution,
                      role: entry.degree,
                      label: entry.label,
                      summary: entry.summary,
                      bullets: entry.bullets,
                    }}
                    isLast={index === education.length - 1}
                    index={index}
                    badge="education"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          id="background"
          className="scroll-mt-28 py-24 sm:py-28"
          {...sectionMotion}
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <SectionTitle
              eyebrow="Background"
              title="Military service, volunteering, and languages."
              description="Additional background from the CV covering service, community work, and language proficiency."
            />

            <motion.div className="mt-12 grid gap-6 lg:grid-cols-2" {...staggerContainer}>
              {[militaryService, volunteering].map((entry) => (
                <motion.div key={entry.title} {...staggerChild}>
                  <div className="panel-hover rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-card backdrop-blur-xl sm:rounded-[2rem] sm:p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="ui-eyebrow text-accent-soft">{entry.label}</div>
                        <h3 className="mt-3 text-xl font-semibold text-white">{entry.title}</h3>
                        <p className="mt-2 text-base text-slate-200">{entry.organization}</p>
                      </div>
                      <div className="rounded-full border border-white/10 bg-slate-950/80 px-4 py-2 font-mono text-xs text-slate-400">
                        {entry.label === 'Volunteer' ? 'volunteering' : 'military'}
                      </div>
                    </div>
                    <p className="mt-5 text-sm leading-7 text-slate-300 sm:text-base">
                      {entry.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div className="mt-8" {...staggerContainer}>
              <motion.div {...staggerChild}>
                <div className="panel-hover rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-card backdrop-blur-xl sm:rounded-[2rem] sm:p-6">
                  <div className="ui-eyebrow text-accent-soft">Languages</div>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {languages.map((lang) => (
                      <span
                        key={lang.language}
                        className="rounded-full border border-white/10 bg-slate-950/80 px-4 py-2 font-mono text-sm text-slate-200"
                      >
                        {lang.language} — {lang.level}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        <ContactSection links={contactLinks} />
        <Footer meta={footerMeta} />
      </main>

      <BackToTopButton />
    </div>
  );
}
