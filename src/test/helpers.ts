import type {
  AvailabilityStatus,
  ContactLink,
  ExperienceEntry,
  FooterMeta,
  MetricStat,
  NavItem,
  Project,
  SkillGroup,
  SummaryFact,
} from '../types/portfolio';

export function createNavItem(overrides?: Partial<NavItem>): NavItem {
  return { id: 'test-section', label: 'Test Section', ...overrides };
}

export function createMetric(overrides?: Partial<MetricStat>): MetricStat {
  return { value: '99%', label: 'test metric', ...overrides };
}

export function createFact(overrides?: Partial<SummaryFact>): SummaryFact {
  return { label: 'Test Label', value: 'Test Value', ...overrides };
}

export function createProject(overrides?: Partial<Project>): Project {
  return {
    id: 'test-project',
    eyebrow: 'Test Eyebrow',
    title: 'Test Project',
    summary: 'A test project summary',
    impact: ['Impact 1', 'Impact 2', 'Impact 3'],
    tags: ['Tag1', 'Tag2'],
    details: {
      architecture: {
        key: 'architecture',
        label: 'View Architecture',
        title: 'Architecture Detail',
        description: 'Architecture description',
        bullets: ['Arch bullet 1', 'Arch bullet 2'],
        snippet: 'arch code here',
      },
      schema: {
        key: 'schema',
        label: 'View Schema',
        title: 'Schema Detail',
        description: 'Schema description',
        bullets: ['Schema bullet 1'],
        snippet: '{ "key": "value" }',
      },
    },
    ...overrides,
  };
}

export function createSkillGroup(overrides?: Partial<SkillGroup>): SkillGroup {
  return {
    title: 'Test Skills',
    description: 'Test skill description',
    items: ['Skill A', 'Skill B', 'Skill C'],
    ...overrides,
  };
}

export function createExperienceEntry(
  overrides?: Partial<ExperienceEntry>,
): ExperienceEntry {
  return {
    company: 'Test Corp',
    role: 'Test Role',
    label: 'Test Label',
    summary: 'Test summary text',
    bullets: ['Bullet 1', 'Bullet 2'],
    ...overrides,
  };
}

export function createContactLink(
  overrides?: Partial<ContactLink>,
): ContactLink {
  return {
    label: 'Email',
    value: 'test@example.com',
    href: 'mailto:test@example.com',
    ...overrides,
  };
}

export function createAvailabilityStatus(
  overrides?: Partial<AvailabilityStatus>,
): AvailabilityStatus {
  return {
    shortLabel: 'Available',
    longLabel: 'Available for AI Engineering roles',
    ...overrides,
  };
}

export function createFooterMeta(overrides?: Partial<FooterMeta>): FooterMeta {
  return {
    name: 'Or Barak',
    role: 'AI Engineer',
    stack: 'React / TypeScript / Tailwind / Framer Motion',
    ...overrides,
  };
}
