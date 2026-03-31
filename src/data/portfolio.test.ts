import { describe, expect, it } from 'vitest';
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
} from './portfolio';

describe('navItems', () => {
  it('has 5 entries with non-empty id and label', () => {
    expect(navItems).toHaveLength(5);
    for (const item of navItems) {
      expect(item.id).toBeTruthy();
      expect(item.label).toBeTruthy();
    }
  });

  it('has no duplicate ids', () => {
    const ids = navItems.map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('ids match expected section ids', () => {
    const ids = navItems.map((item) => item.id);
    expect(ids).toEqual(['projects', 'skills', 'experience', 'about', 'contact']);
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
  it('has 2 entries', () => {
    expect(projects).toHaveLength(2);
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

  it('each project has both architecture and schema details', () => {
    for (const project of projects) {
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
  it('has 2 entries with all required fields', () => {
    expect(experience).toHaveLength(2);
    for (const entry of experience) {
      expect(entry.company).toBeTruthy();
      expect(entry.role).toBeTruthy();
      expect(entry.label).toBeTruthy();
      expect(entry.summary).toBeTruthy();
      expect(entry.bullets.length).toBeGreaterThan(0);
    }
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
