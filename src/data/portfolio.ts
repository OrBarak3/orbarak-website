import type {
  AvailabilityStatus,
  ContactLink,
  EducationEntry,
  ExperienceEntry,
  FooterMeta,
  MetricStat,
  NavItem,
  Project,
  ServiceEntry,
  SkillGroup,
  SummaryFact,
} from '../types/portfolio';

export const navItems: NavItem[] = [
  { id: 'projects', label: 'Projects' },
  { id: 'demo', label: 'Demo' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'background', label: 'Background' },
  { id: 'contact', label: 'Contact' },
];

export const heroMetrics: MetricStat[] = [
  { value: '$12K/mo', label: 'saved by reducing external annotation work' },
  { value: 'Weeks -> Minutes', label: 'LLM tagging process turnaround' },
  { value: '2025-Present', label: 'AI Engineer at aiOla' },
];

export const heroFacts: SummaryFact[] = [
  { label: 'Role', value: 'AI Engineer, aiOla' },
  { label: 'Focus', value: 'LLM workflows, AI validation systems, structured outputs' },
  { label: 'Stack', value: 'Python, SQL, Snowflake, LangGraph, Streamlit' },
  { label: 'Location', value: 'Tel Aviv, Israel' },
];

export const availabilityStatus: AvailabilityStatus = {
  shortLabel: 'Available',
  longLabel: 'Available for AI Engineering roles',
};

export const footerMeta: FooterMeta = {
  name: 'Or Barak',
  role: 'AI Engineer',
  stack: 'React / TypeScript / Tailwind / Framer Motion',
};

export const workflowSteps = ['Transcribe', 'Extract', 'Validate', 'Route'];

export const heroSnippet = `{
  "pipeline": "llm_agentic_tagging",
  "source": "spoken_conversation",
  "target": "structured_business_data",
  "validation": {
    "json_schema": true,
    "agreement_scored": true,
    "needs_human_review": false
  },
  "routing": "selective_review"
}`;

export const demoSection = {
  eyebrow: 'Live Demo',
  title: 'Contract Review — try the actual LangGraph workflow.',
  description:
    'Paste or upload a vendor contract and watch the 7-node LangGraph pipeline parse clauses, extract risk details, apply policy rules, and route to automatic approval or a human review panel — all backed by a real Python service.',
  exampleContract: `1. Services

Vendor will provide implementation and support services for the platform described in the order form.

2. Indemnity

Customer shall indemnify, defend, and hold harmless Vendor and its affiliates from any and all claims, damages, and losses arising from Customer's use of the services.

3. Liability

Vendor's liability is unlimited for any claim related to this Agreement, including indirect, consequential, and punitive damages.

4. Renewal

This Agreement renews automatically for successive one-year terms unless Customer provides written notice at least 90 days before the renewal date.`,
};

export const projects: Project[] = [
  {
    id: 'agentic-contract-review',
    eyebrow: 'Contract Intelligence',
    title: 'Agentic Contract Review',
    summary:
      'A LangGraph-based contract review workflow that parses vendor agreements into clauses, uses AI to extract obligations and flag risk, applies deterministic policy rules to route contracts, and surfaces a human-in-the-loop review panel for high-risk cases — all with a full audit trail.',
    impact: [
      'End-to-end HITL pipeline: AI proposes, policy routes, humans decide',
      'Supports PDF, DOCX, and plain-text contracts via a FastAPI service',
      'Deterministic policy routing keeps governance predictable and auditable',
    ],
    tags: [
      'Python',
      'LangGraph',
      'FastAPI',
      'Human-in-the-Loop',
      'Pydantic',
      'Policy Routing',
      'Audit Logging',
      'Railway',
    ],
    highlights: [
      'Built a 7-node LangGraph graph: ingest → parse → extract → policy → route → review → audit',
      'Multi-provider LLM adapter (OpenAI, Gemini, Grok) with deterministic heuristic fallback',
      'YAML-based policy packs define blocked clause types and confidence thresholds without redeploying',
      'Interrupt/resume pattern enables a real human reviewer to approve, reject, or edit AI extractions',
    ],
  },
  {
    id: 'llm-agentic-tagging',
    eyebrow: 'Annotation Automation',
    title: 'LLM Agentic Tagging',
    summary:
      'Designed and built an AI-based annotation pipeline that replaced large portions of manual transcript tagging with a high-precision multi-model workflow, reducing cost, turnaround time, and dependence on external annotators.',
    impact: [
      'Saved the company about $12,000 per month',
      'Reduced the tagging process from weeks to a few minutes',
      'Lowered dependence on external annotators through selective human review',
    ],
    tags: [
      'Python',
      'LangGraph',
      'Snowflake',
      'JSON Schema',
      'Structured Validation',
      'Semantic Similarity',
      'Judge Models',
      'Workflow Automation',
    ],
    highlights: [
      'Built an AI annotation pipeline using LangGraph to automate manual transcript tagging at scale',
      'Designed multi-step extraction and routing logic using structured outputs and JSON schema validation',
      'Integrated Snowflake data pipelines to retrieve transcripts and measure workflow quality',
      'Applied semantic similarity scoring and judge-model logic to minimize human review requirements',
    ],
  },
  {
    id: 'asr-agentic-tagger',
    eyebrow: 'Transcript Adjudication',
    title: 'AI Automatic Speech Recognition Agentic Tagger',
    summary:
      'Built a human-in-the-loop ASR transcript judging pipeline in Python and LangGraph, combining Triton ASR n-best outputs with Gemini via OpenRouter to process straightforward transcripts automatically and route ambiguous cases to LLM review.',
    impact: [
      'Automatically processed straightforward transcripts with an AI review path',
      'Escalated only uncertain recordings to human reviewers',
      'Improved annotation efficiency and review speed',
    ],
    tags: [
      'Python',
      'LangGraph',
      'Triton ASR',
      'Gemini',
      'OpenRouter',
      'Human-in-the-Loop',
      'LLM Review',
      'Workflow Orchestration',
    ],
    highlights: [
      'Built a human-in-the-loop ASR transcript judging pipeline in Python and LangGraph',
      'Combined Triton ASR n-best outputs with Gemini via OpenRouter for automated transcript review',
      'Designed confidence-based routing logic to escalate only uncertain recordings to human reviewers',
      'Automated straightforward transcript processing end-to-end to improve annotation throughput',
    ],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: 'LLM Systems',
    description: 'Designing prompt-driven workflows that produce reviewable, structured outputs.',
    items: [
      'Prompt Engineering',
      'LLM Evaluation',
      'Structured Outputs',
      'JSON Schemas',
      'Semantic Similarity',
      'Embeddings',
    ],
  },
  {
    title: 'Agentic Tooling',
    description: 'Daily tools and orchestration patterns used to ship internal AI systems.',
    items: [
      'LangGraph',
      'Claude Code',
      'Codex',
      'Cursor',
      'AI Agents and Orchestration',
      'Workflow Automation',
      'RAG',
    ],
  },
  {
    title: 'Engineering',
    description: 'Building production-oriented internal tools, integrations, and data pipelines.',
    items: ['Python', 'SQL', 'Snowflake', 'Streamlit', 'API Integrations', 'Docker', 'AWS'],
  },
  {
    title: 'Modeling & Collaboration',
    description: 'Applying analysis, experimentation, and cross-functional delivery to real AI work.',
    items: [
      'Data Analysis',
      'Technical Communication',
      'Cross-Functional Collaboration',
      'PyTorch',
      'Model Fine-Tuning',
    ],
  },
];

export const experience: ExperienceEntry[] = [
  {
    company: 'aiOla',
    role: 'AI Engineer',
    label: '2025 - Present',
    summary:
      'Design, evaluate, and improve LLM-based workflows that convert spoken conversations into structured business data.',
    bullets: [
      'Built internal Python tools using LangGraph that reduced the LLM tagging process from weeks to a few minutes and saved about $12,000 per month.',
      'Built production-oriented AI solutions using Claude Code, Cursor, Codex, JSON schema design, structured outputs, and multi-step workflow logic.',
      'Developed Python tools and internal systems for evaluation, automation, validation, and operational analysis.',
      'Worked with Snowflake data pipelines to retrieve transcripts, compare outputs, and measure workflow quality across use cases.',
      'Collaborated directly with clients in technical scoping sessions to translate business logic into POCs, extraction rules, and AI workflows.',
    ],
  },
];

export const education: EducationEntry[] = [
  {
    institution: 'Tel Aviv University',
    degree: 'B.Sc. in Mechanical Engineering',
    label: '2019 - 2024',
    summary:
      'Built the quantitative and systems foundation behind current AI engineering work through Mechanical Engineering studies and applied technical coursework.',
    bullets: [
      'Relevant coursework: Machine Learning, Data Analysis, Statistics, Intro to Python, Advanced Python, and Robotics.',
    ],
  },
];

export const militaryService: ServiceEntry = {
  title: 'Search and Rescue Combat Soldier',
  organization: 'Israel Defense Forces',
  label: '2015 - 2018',
  description: 'Served as a Search and Rescue Combat Soldier.',
};

export const volunteering: ServiceEntry = {
  title: 'First Aid Volunteer',
  organization: 'Magen David Adom',
  label: 'Volunteer',
  description: 'Volunteer first-aid responder with Magen David Adom.',
};

export const languages: { language: string; level: string }[] = [
  { language: 'Hebrew', level: 'Native' },
  { language: 'English', level: 'Fluent' },
];

export const contactLinks: ContactLink[] = [
  {
    label: 'Email',
    value: 'orbarak1997@gmail.com',
    href: 'mailto:orbarak1997@gmail.com',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/or-barak-b046b71a2',
    href: 'https://www.linkedin.com/in/or-barak-b046b71a2/',
  },
  {
    label: 'GitHub',
    value: 'github.com/OrBarak3',
    href: 'https://github.com/OrBarak3',
  },
  {
    label: 'Resume',
    value: 'Download CV',
    href: '#',
    note: 'PDF link coming soon',
  },
];
