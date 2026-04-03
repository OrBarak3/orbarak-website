import { describe, expect, it } from 'vitest';
import {
  contactLinks,
  demoSection,
  education,
  experience,
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
} from './portfolio';

describe('navItems', () => {
  it('contains the expected section ids in display order', () => {
    const expectedIds = [
      'projects',
      'demo',
      'skills',
      'experience',
      'education',
      'background',
      'contact',
    ];
    expect(navItems).toHaveLength(expectedIds.length);
    for (const item of navItems) {
      expect(item.id).toBeTruthy();
      expect(item.label).toBeTruthy();
    }
    const ids = navItems.map((item) => item.id);
    expect(ids).toEqual(expectedIds);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('heroMetrics', () => {
  it('has 3 entries with non-empty value and label', () => {
    expect(heroMetrics).toHaveLength(3);
    for (const metric of heroMetrics) {
      expect(metric.value).toBeTruthy();
      expect(metric.label).toBeTruthy();
    }
  });
});

describe('heroFacts', () => {
  it('has 4 entries with non-empty label and value', () => {
    expect(heroFacts).toHaveLength(4);
    for (const fact of heroFacts) {
      expect(fact.label).toBeTruthy();
      expect(fact.value).toBeTruthy();
    }
  });
});

describe('workflowSteps', () => {
  it('has 4 non-empty strings', () => {
    expect(workflowSteps).toHaveLength(4);
    for (const step of workflowSteps) {
      expect(step).toBeTruthy();
    }
  });
});

describe('heroSnippet', () => {
  it('is valid JSON', () => {
    expect(() => JSON.parse(heroSnippet)).not.toThrow();
  });
});

describe('projects', () => {
  it('includes every featured project in order', () => {
    expect(projects.map((project) => project.id)).toEqual([
      'agentic-contract-review',
      'llm-agentic-tagging',
      'asr-agentic-tagger',
    ]);
  });

  it('each project has all required fields', () => {
    for (const project of projects) {
      expect(project.id).toBeTruthy();
      expect(project.title).toBeTruthy();
      expect(project.summary).toBeTruthy();
      expect(project.impact.length).toBeGreaterThan(0);
      expect(project.tags.length).toBeGreaterThan(0);
    }
  });

  it('projects with details have valid architecture and schema entries', () => {
    for (const project of projects) {
      if (!project.details) continue;
      for (const key of ['architecture', 'schema'] as const) {
        const detail = project.details[key];
        expect(detail.key).toBe(key);
        expect(detail.label).toBeTruthy();
        expect(detail.title).toBeTruthy();
        expect(detail.description).toBeTruthy();
        expect(detail.bullets.length).toBeGreaterThan(0);
      }
    }
  });
});

describe('demoSection', () => {
  it('includes the copy required to render the contract review demo', () => {
    expect(demoSection.eyebrow).toBeTruthy();
    expect(demoSection.title).toContain('Contract Review');
    expect(demoSection.description).toContain('LangGraph');
    expect(demoSection.exampleContract).toContain('1. Services');
  });
});

describe('skillGroups', () => {
  it('has 4 entries with non-empty fields', () => {
    expect(skillGroups).toHaveLength(4);
    for (const group of skillGroups) {
      expect(group.title).toBeTruthy();
      expect(group.description).toBeTruthy();
      expect(group.items.length).toBeGreaterThan(0);
    }
  });
});

describe('experience', () => {
  it('has 1 entry with all required fields', () => {
    expect(experience).toHaveLength(1);
    for (const entry of experience) {
      expect(entry.company).toBeTruthy();
      expect(entry.role).toBeTruthy();
      expect(entry.label).toBeTruthy();
      expect(entry.summary).toBeTruthy();
      expect(entry.bullets.length).toBeGreaterThan(0);
    }
  });
});

describe('education', () => {
  it('has 1 entry with all required fields', () => {
    expect(education).toHaveLength(1);
    for (const entry of education) {
      expect(entry.institution).toBeTruthy();
      expect(entry.degree).toBeTruthy();
      expect(entry.label).toBeTruthy();
      expect(entry.summary).toBeTruthy();
      expect(entry.bullets.length).toBeGreaterThan(0);
    }
  });
});

describe('background', () => {
  it('includes service, volunteering, and language metadata', () => {
    expect(militaryService.title).toBeTruthy();
    expect(militaryService.organization).toBeTruthy();
    expect(volunteering.title).toBeTruthy();
    expect(volunteering.organization).toBeTruthy();
    expect(languages).toEqual([
      { language: 'Hebrew', level: 'Native' },
      { language: 'English', level: 'Fluent' },
    ]);
  });
});

describe('contactLinks', () => {
  it('has 4 entries', () => {
    expect(contactLinks).toHaveLength(4);
  });

  it('each link has valid href', () => {
    for (const link of contactLinks) {
      expect(link.label).toBeTruthy();
      expect(link.value).toBeTruthy();
      expect(
        link.href.startsWith('mailto:') || link.href.startsWith('https://') || link.href === '#',
      ).toBe(true);
    }
  });
});
