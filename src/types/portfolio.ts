export type DetailKey = 'architecture' | 'schema';

export interface NavItem {
  id: string;
  label: string;
}

export interface MetricStat {
  value: string;
  label: string;
}

export interface SummaryFact {
  label: string;
  value: string;
}

export interface ProjectDetailTab {
  key: DetailKey;
  label: string;
  title: string;
  description: string;
  bullets: string[];
  snippet?: string;
}

export interface Project {
  id: string;
  title: string;
  summary: string;
  impact: string[];
  tags: string[];
  details: Record<DetailKey, ProjectDetailTab>;
}

export interface SkillGroup {
  title: string;
  description: string;
  items: string[];
}

export interface ExperienceEntry {
  company: string;
  role: string;
  label: string;
  summary: string;
  bullets: string[];
}

export interface ContactLink {
  label: string;
  value: string;
  href: string;
}

