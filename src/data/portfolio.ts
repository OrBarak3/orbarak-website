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

export const projects: Project[] = [
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
    details: {
      architecture: {
        key: 'architecture',
        label: 'View Architecture',
        title: 'High-precision multi-model annotation flow',
        description:
          'The tagging system relied on multiple extraction steps and explicit routing logic so only the hard edge cases reached manual review.',
        bullets: [
          'Used parallel extraction to process the same transcript through a shared workflow.',
          'Scored field-level agreement to decide when results were strong enough to accept.',
          'Escalated disagreements through judge-model logic instead of reviewing every record manually.',
          'Reserved human review for complex or ambiguous edge cases only.',
          'Integrated the final routing path into the internal review workflow.',
        ],
        snippet: `parallel_extract(record)
agreement_score = compare_fields(record.outputs)

if agreement_score >= threshold:
  route = "auto_accept"
elif record.is_edge_case:
  route = "judge_or_human_review"
else:
  route = "judge_review"`,
      },
      schema: {
        key: 'schema',
        label: 'View Schema',
        title: 'Validation-ready review payload',
        description:
          'Structured validation, semantic similarity checks, and internal review routing all depended on a predictable payload that could be scored automatically.',
        bullets: [
          'Snowflake retrieval fed the pipeline with transcript data and review targets.',
          'Structured validation logic kept the extracted fields reviewable and consistent.',
          'Semantic similarity scoring supported open-text comparisons alongside exact checks.',
          'Automated routing sent each record into the right internal review path.',
        ],
        snippet: `{
  "transcript_id": "TR-10428",
  "field_agreement": 0.94,
  "semantic_match": true,
  "review_route": "auto_accept",
  "requires_human_review": false
}`,
      },
    },
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
    details: {
      architecture: {
        key: 'architecture',
        label: 'View Architecture',
        title: 'Human-in-the-loop transcript judging flow',
        description:
          'The review path started with ASR candidates, automated the straightforward cases, and used model review only where the transcript decision was still uncertain.',
        bullets: [
          'Collected Triton ASR n-best outputs as the starting point for transcript review.',
          'Used Python and LangGraph to orchestrate the review and routing logic.',
          'Sent ambiguous recordings to LLM review instead of forcing a manual-first process.',
          'Escalated only uncertain recordings to human reviewers.',
          'Improved annotation throughput by automating the easy cases end to end.',
        ],
        snippet: `triton_asr_nbest
  -> confidence_gate
  -> llm_review
  -> human_reviewer_if_needed`,
      },
      schema: {
        key: 'schema',
        label: 'View Schema',
        title: 'Transcript review decision record',
        description:
          'The decision payload kept the chosen transcript, its review path, and whether it still needed a human reviewer.',
        bullets: [
          'Stored the selected transcript with the route that produced it.',
          'Made it clear whether the record came from automated review or needed a human.',
          'Kept the ASR candidate source attached for downstream auditing.',
        ],
        snippet: `{
  "audio_id": "AUDIO-8821",
  "review_path": "llm_review",
  "candidate_source": "triton_asr_nbest",
  "selected_transcript": "Valve pressure dropped after startup",
  "needs_human_review": false
}`,
      },
    },
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
