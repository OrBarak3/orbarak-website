import type {
  ContactLink,
  ExperienceEntry,
  MetricStat,
  NavItem,
  Project,
  SkillGroup,
  SummaryFact,
} from '../types/portfolio';

export const navItems: NavItem[] = [
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export const heroMetrics: MetricStat[] = [
  { value: '74%', label: 'less manual review' },
  { value: '89%', label: 'open-text accuracy' },
  { value: 'Enterprise', label: 'speech-to-JSON workflows' },
];

export const heroFacts: SummaryFact[] = [
  { label: 'Role', value: 'AI Engineer / LLM Workflow Analyst' },
  { label: 'Focus', value: 'Prompt Engineering, Evals, Structured Outputs' },
  { label: 'Stack', value: 'Python, SQL, React, TypeScript, LangGraph' },
  { label: 'Domain', value: 'Voice AI, Workflow Automation, Enterprise AI' },
];

export const workflowSteps = ['Extract', 'Evaluate', 'Judge', 'Human Review'];

export const heroSnippet = `{
  "workflow_id": "enterprise_intake_v2",
  "status": "production_ready",
  "signals": {
    "schema_valid": true,
    "confidence": 0.91,
    "needs_human_review": false
  },
  "outputs": {
    "site": "Plant 14",
    "issue_type": "safety_report",
    "priority": "high"
  }
}`;

export const projects: Project[] = [
  {
    id: 'pseudo-tagging',
    title: 'LLM Pseudo Tagging System',
    summary:
      'Built a multi-model AI annotation and review workflow that reduced manual transcript tagging by comparing model outputs, scoring agreement, routing ambiguous fields to a judge model, and escalating only critical cases to humans.',
    impact: [
      'Reduced manual annotation workload by about 74%',
      'Improved open-text accuracy from about 77% to 89%',
      'Cut tagging errors significantly versus the manual baseline',
    ],
    tags: [
      'Python',
      'LangGraph',
      'OpenRouter',
      'Gemini',
      'Sonnet',
      'Embeddings',
      'JSON Schema',
      'Snowflake',
      'Evaluation Pipelines',
    ],
    details: {
      architecture: {
        key: 'architecture',
        label: 'View Architecture',
        title: 'Field-level agreement with model escalation',
        description:
          'The workflow balanced cost, accuracy, and human effort by using model agreement as a routing signal instead of sending every record through the same path.',
        bullets: [
          'Pull transcript records and schema targets from Snowflake.',
          'Run multiple extractor models against a shared JSON schema.',
          'Compare outputs at the field level using exact checks and semantic similarity.',
          'Route low-agreement fields to a judge model for arbitration.',
          'Escalate only business-critical or low-confidence cases to human review.',
        ],
        snippet: `agreement_score := mean(field_match_scores)
if agreement_score >= 0.92:
  accept(record)
elif critical_field_disagreement:
  send_to_judge(record)
else:
  human_review(record)`,
      },
      schema: {
        key: 'schema',
        label: 'View Schema',
        title: 'Structured annotation contract',
        description:
          'The extraction layer stayed stable by enforcing a predictable response shape that downstream scoring and reviewer tools could trust.',
        bullets: [
          'Shared schema ensured every model answered the same task.',
          'Typed fields supported both exact and semantic evaluation strategies.',
          'Reviewer tooling consumed the same payload to avoid translation steps.',
        ],
        snippet: `{
  "message_id": "MSG-10428",
  "intent": "maintenance_request",
  "equipment": "compressor_12",
  "severity": "medium",
  "open_text_summary": "Intermittent pressure drop during startup",
  "requires_review": false
}`,
      },
    },
  },
  {
    id: 'asr-judging',
    title: 'ASR Transcript Judging Pipeline',
    summary:
      'Built a human-in-the-loop transcript review pipeline that combined ASR n-best candidates with LLM reasoning to accept easy cases automatically, review ambiguous ones with a judge model, and escalate uncertain transcripts to humans.',
    impact: [
      'Reduced manual labeling load on transcript reviewers',
      'Improved annotation efficiency for high-volume review queues',
      'Increased reliability in transcript quality decisions',
    ],
    tags: [
      'Python',
      'LangGraph',
      'Triton ASR',
      'Gemini',
      'OpenRouter',
      'Workflow Orchestration',
      'Human-in-the-Loop',
    ],
    details: {
      architecture: {
        key: 'architecture',
        label: 'View Architecture',
        title: 'Decisioning pipeline for transcript acceptance',
        description:
          'Instead of treating transcript review as a binary manual task, the pipeline used confidence bands and model reasoning to choose the cheapest trustworthy path.',
        bullets: [
          'Collect n-best transcript hypotheses and confidence signals from ASR.',
          'Auto-accept high-confidence cases when ranking and heuristics align.',
          'Send ambiguous records to an LLM judge that compares competing transcripts.',
          'Escalate uncertain or policy-sensitive cases to human annotators.',
          'Log outcomes for continuous threshold tuning and QA analysis.',
        ],
        snippet: `asr_candidates -> heuristic_gate -> judge_model -> reviewer_queue
        | high confidence |        | ambiguous |
        +-----------------+        +-----------> human`,
      },
      schema: {
        key: 'schema',
        label: 'View Schema',
        title: 'Transcript decision payload',
        description:
          'The review record preserved the chosen transcript, the decision path, and the exact signal that justified escalation.',
        bullets: [
          'Downstream teams could audit every automated accept/reject decision.',
          'Signal logging made threshold tuning and failure analysis measurable.',
          'Human reviewers received compact context rather than raw model dumps.',
        ],
        snippet: `{
  "audio_id": "AUDIO-8821",
  "decision": "judge_review",
  "selected_transcript": "Valve pressure dropped after startup",
  "candidate_count": 5,
  "confidence_band": "medium",
  "escalate_to_human": false
}`,
      },
    },
  },
  {
    id: 'enterprise-workflows',
    title: 'Enterprise Speech-to-Structured-Output Workflows',
    summary:
      'Worked directly with enterprise clients to translate business requirements into production AI workflows that transformed speech into structured JSON outputs, with prompts, schemas, and evaluation loops designed around accuracy, latency, and business value.',
    impact: [
      'Delivered workflows that saved clients substantial time',
      'Built eval methods to measure whether systems were truly useful in production',
      'Connected product requirements directly with technical implementation',
    ],
    tags: [
      'Prompt Engineering',
      'JSON Schema',
      'Python',
      'Evaluation Design',
      'Workflow Design',
      'Enterprise AI',
    ],
    details: {
      architecture: {
        key: 'architecture',
        label: 'View Architecture',
        title: 'From business process to reliable AI workflow',
        description:
          'The delivery model connected client operations, prompt and schema design, and production evaluation so the workflow solved a measurable business problem rather than only a model-quality problem.',
        bullets: [
          'Map the business process into extractable structured fields and review states.',
          'Design prompts and JSON schemas around the operational decisions the client needs.',
          'Create evaluation sets that test usefulness, not only lexical accuracy.',
          'Track latency, reviewer burden, and downstream value alongside model accuracy.',
          'Iterate prompts and routing logic with client feedback from real usage.',
        ],
        snippet: `business need -> schema design -> prompt chain -> eval loop -> production rollout`,
      },
      schema: {
        key: 'schema',
        label: 'View Schema',
        title: 'Example enterprise output shape',
        description:
          'A stable contract made it possible to plug speech-derived outputs into existing business systems and reviewer workflows.',
        bullets: [
          'Schemas were tailored per client workflow and downstream action.',
          'Validation rules prevented low-quality payloads from flowing silently.',
          'Structured outputs supported both automation and human review.',
        ],
        snippet: `{
  "workflow": "field_service_dispatch",
  "customer_id": "C-2041",
  "site_name": "North Terminal",
  "issue_type": "equipment_failure",
  "priority": "urgent",
  "next_action": "dispatch_technician"
}`,
      },
    },
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: 'Core AI',
    description: 'Designing reliable, measurable LLM behavior for production use cases.',
    items: [
      'Prompt Engineering',
      'LLM Evaluation',
      'Structured Outputs',
      'JSON Schema Design',
      'Human-in-the-Loop Systems',
      'AI Workflow Design',
      'Model Output Validation',
    ],
  },
  {
    title: 'LLM / Agent Systems',
    description: 'Orchestration patterns for multi-step reasoning and review flows.',
    items: [
      'LangGraph',
      'AI Orchestration',
      'Multi-step Workflows',
      'Judge Models',
      'Semantic Similarity',
      'Embeddings',
      'OpenRouter',
    ],
  },
  {
    title: 'Engineering',
    description: 'Shipping robust tools, interfaces, and internal systems around AI.',
    items: ['Python', 'SQL', 'TypeScript', 'React', 'Tailwind CSS', 'Streamlit', 'Git'],
  },
  {
    title: 'Data / Analytics',
    description: 'Measurement frameworks that connect model quality to business value.',
    items: [
      'Snowflake',
      'Data Analysis',
      'Experimentation',
      'Metrics Design',
      'Workflow Performance Analysis',
    ],
  },
];

export const experience: ExperienceEntry[] = [
  {
    company: 'aiOla',
    role: 'LLM Workflow Analyst / AI Engineer',
    label: 'Voice AI Company',
    summary:
      'Built production-minded AI workflows that turned speech into structured outputs for enterprise use cases.',
    bullets: [
      'Built LLM-driven workflows for enterprise speech-to-JSON use cases.',
      'Designed evaluation methods for accuracy, latency, and business value.',
      'Developed human-in-the-loop pipelines for transcript review and structured extraction.',
      'Worked with prompts, schemas, model orchestration, and workflow optimization.',
      'Collaborated with clients to translate business processes into production AI systems.',
    ],
  },
  {
    company: 'Tel Aviv University',
    role: 'B.Sc. in Mechanical Engineering',
    label: 'Education',
    summary:
      'Developed a strong quantitative and systems foundation that now supports applied AI engineering work.',
    bullets: [
      'Relevant focus: Machine Learning, Advanced Programming, Robotics, Statistics, and Data Analysis.',
      'Built a strong engineering mindset around problem decomposition and system reliability.',
    ],
  },
];

export const contactLinks: ContactLink[] = [
  {
    label: 'Email',
    value: 'your.email@example.com',
    href: 'mailto:your.email@example.com',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/your-profile',
    href: 'https://linkedin.com/in/your-profile',
  },
  {
    label: 'GitHub',
    value: 'github.com/your-handle',
    href: 'https://github.com/your-handle',
  },
];

