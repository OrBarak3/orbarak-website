import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { ContactSection } from './components/ContactSection';
import { ExperienceItem } from './components/ExperienceItem';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { ProjectCard } from './components/ProjectCard';
import { SectionTitle } from './components/SectionTitle';
import { SkillCategory } from './components/SkillCategory';
import {
  contactLinks,
  experience,
  heroFacts,
  heroMetrics,
  heroSnippet,
  navItems,
  projects,
  skillGroups,
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

  return (
    <div className="min-h-screen bg-background text-text">
      <div className="fixed inset-0 -z-20 bg-[radial-gradient(circle_at_20%_0%,rgba(34,211,238,0.12),transparent_28%),radial-gradient(circle_at_80%_10%,rgba(14,165,233,0.12),transparent_24%),linear-gradient(180deg,#020617_0%,#020617_100%)]" />
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(rgba(15,23,42,0.0),rgba(15,23,42,0.7))]" />

      <Navbar items={navItems} activeSection={activeSection} />

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
              title="LLM systems designed for production reliability, reviewability, and business impact."
              description="Each project emphasizes structured outputs, measurable evaluation, and routing logic that reduces unnecessary human effort while keeping quality thresholds explicit."
            />

            <div className="mt-12 grid gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
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
              title="A practical toolkit for eval-heavy AI systems."
              description="The skill mix is centered on getting LLM workflows to behave consistently in real-world settings, then instrumenting them so teams can trust the results."
            />

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {skillGroups.map((group) => (
                <SkillCategory key={group.title} group={group} />
              ))}
            </div>
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
              title="Bridging workflow design, evaluation strategy, and client-facing AI delivery."
              description="The through-line is taking ambiguous business processes and turning them into robust AI systems with measurable quality, clear review states, and usable structured outputs."
            />

            <div className="mt-12 space-y-8">
              {experience.map((entry, index) => (
                <ExperienceItem
                  key={entry.company}
                  entry={entry}
                  isLast={index === experience.length - 1}
                />
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section id="about" className="scroll-mt-28 py-24 sm:py-28" {...sectionMotion}>
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <SectionTitle
                eyebrow="About"
                title="A systems-minded AI engineer with product context."
                description="Or Barak combines hands-on implementation with a strong understanding of how AI workflows need to perform in enterprise settings: not only accurate, but reliable, reviewable, and valuable in production."
              />

              <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-card backdrop-blur-xl sm:p-8">
                <div className="grid gap-4">
                  <div className="rounded-3xl border border-white/8 bg-slate-950/80 p-5">
                    <div className="font-mono text-xs uppercase tracking-[0.2em] text-accent-soft">
                      Applied AI focus
                    </div>
                    <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
                      At aiOla, the work centered on converting speech into structured JSON
                      outputs for enterprise workflows, improving prompt behavior, strengthening
                      schema design, and building evaluation methods that tracked accuracy,
                      latency, and business usefulness together.
                    </p>
                  </div>

                  <div className="rounded-3xl border border-white/8 bg-slate-950/80 p-5">
                    <div className="font-mono text-xs uppercase tracking-[0.2em] text-accent-soft">
                      Engineering approach
                    </div>
                    <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
                      The approach is technical and pragmatic: define the contract, validate the
                      output, measure the failure modes, and keep a human review path where it
                      actually improves the system.
                    </p>
                  </div>

                  <div className="rounded-3xl border border-white/8 bg-slate-950/80 p-5">
                    <div className="font-mono text-xs uppercase tracking-[0.2em] text-accent-soft">
                      Foundation
                    </div>
                    <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
                      A Mechanical Engineering degree from Tel Aviv University contributed strong
                      training in machine learning, programming, robotics, statistics, and data
                      analysis, which now supports production-focused AI engineering work.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <ContactSection links={contactLinks} />
      </main>
    </div>
  );
}
