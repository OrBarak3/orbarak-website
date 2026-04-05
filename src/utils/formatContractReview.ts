interface ClauseDisplayInput {
  clause_type: string;
  summary: string;
  obligations: string[];
  evidence_spans: string[];
  clause_text?: string;
  display_snippet?: string;
  risk_level?: 'low' | 'medium' | 'high';
}

interface StatusDisplayConfig {
  label: string;
  classes: string;
}

const DEFAULT_SUMMARY_FALLBACK = 'Key clause extracted; review details above.';

const STATUS_CONFIG: Record<string, StatusDisplayConfig> = {
  approved_automatically: {
    classes: 'border-emerald-400/25 bg-emerald-400/10 text-emerald-200',
    label: 'Approved Automatically',
  },
  approved_by_reviewer: {
    classes: 'border-emerald-400/25 bg-emerald-400/10 text-emerald-200',
    label: 'Approved by Reviewer',
  },
  approved_with_edits: {
    classes: 'border-cyan-400/25 bg-cyan-400/10 text-cyan-200',
    label: 'Approved with Edits',
  },
  rejected_by_reviewer: {
    classes: 'border-rose-400/25 bg-rose-400/10 text-rose-200',
    label: 'Rejected by Reviewer',
  },
  needs_manual_parse: {
    classes: 'border-amber-400/25 bg-amber-400/10 text-amber-200',
    label: 'Needs Manual Review',
  },
  failed: {
    classes: 'border-red-400/25 bg-red-400/10 text-red-300',
    label: 'Failed',
  },
};

function normalizeWhitespace(value: string | null | undefined) {
  return (value ?? '').replace(/\s+/g, ' ').trim();
}

function normalizeComparisonValue(value: string | null | undefined) {
  return normalizeWhitespace(value)
    .toLowerCase()
    .replace(/[_-]+/g, ' ')
    .replace(/[^\p{L}\p{N}\s]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function isNumberingOnly(value: string) {
  return /^(\d+(\.\d+)*\.?|[ivxlcdm]+\.?)$/i.test(value.trim());
}

function isMeaningfulSnippet(value: string | null | undefined) {
  const normalized = normalizeWhitespace(value);
  if (!normalized) return false;
  if (isNumberingOnly(normalized)) return false;
  return /[\p{L}]/u.test(normalized);
}

function trimPreview(value: string | null | undefined, maxLength = 140) {
  const normalized = normalizeWhitespace(value);
  if (!normalized) return '';
  if (normalized.length <= maxLength) return normalized;

  const truncated = normalized.slice(0, maxLength).trimEnd();
  const safeBoundary = truncated.lastIndexOf(' ');
  const preview = safeBoundary > 60 ? truncated.slice(0, safeBoundary) : truncated;
  return `${preview}...`;
}

export function formatClauseTypeLabel(clauseType: string) {
  const normalized = normalizeComparisonValue(clauseType);
  if (!normalized) return 'General';
  return normalized
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function isWeakClauseSummary(summary: string, clauseType: string) {
  const normalizedSummary = normalizeWhitespace(summary);
  if (!normalizedSummary) return true;
  if (isNumberingOnly(normalizedSummary)) return true;

  const comparableSummary = normalizeComparisonValue(normalizedSummary);
  if (!comparableSummary) return true;

  const comparableType = normalizeComparisonValue(clauseType);
  if (comparableType && comparableSummary === comparableType) return true;

  return ['clause', 'section', 'article', 'general'].includes(comparableSummary);
}

function pickFirstMeaningful(values: string[]) {
  return values.find((value) => isMeaningfulSnippet(value)) ?? '';
}

export function getClauseDisplayContent(clause: ClauseDisplayInput) {
  const repairedSummary = isWeakClauseSummary(clause.summary, clause.clause_type);
  const evidenceSnippet = trimPreview(pickFirstMeaningful(clause.evidence_spans));
  const obligationSnippet = trimPreview(pickFirstMeaningful(clause.obligations));
  const clausePreview = trimPreview(clause.display_snippet ?? clause.clause_text);

  const summary = repairedSummary
    ? evidenceSnippet || obligationSnippet || clausePreview || DEFAULT_SUMMARY_FALLBACK
    : trimPreview(clause.summary, 180);

  const supportCandidates =
    clause.risk_level === 'high'
      ? [evidenceSnippet, obligationSnippet, clausePreview]
      : [obligationSnippet, evidenceSnippet, clausePreview];
  const supportLine = supportCandidates.find((candidate) => candidate && candidate !== summary) ?? '';

  return {
    summary,
    supportLine,
    emphasizedEvidence: clause.risk_level === 'high' && Boolean(evidenceSnippet),
  };
}

function titleCaseWords(value: string) {
  return value
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function formatPolicyTriggerLabel(trigger: string) {
  const normalized = normalizeWhitespace(trigger);
  if (!normalized) return 'Policy review triggered';

  const blockedClauseMatch = normalized.match(/^blocked_clause_type:(.+)$/i);
  if (blockedClauseMatch) {
    return `Blocked clause: ${formatClauseTypeLabel(blockedClauseMatch[1])}`;
  }

  const knownLabels: Record<string, string> = {
    high_risk_clause_detected: 'High-risk clause detected',
  };
  if (knownLabels[normalized]) {
    return knownLabels[normalized];
  }

  const generic = normalized.replace(/[:_]+/g, ' ').trim().toLowerCase();
  if (!generic) return 'Policy review triggered';

  const sentence = generic.charAt(0).toUpperCase() + generic.slice(1);
  return sentence.replace(/\bmsa\b/g, 'MSA');
}

export function getStatusConfig(status: string): StatusDisplayConfig {
  return STATUS_CONFIG[status] ?? {
    classes: 'border-white/10 bg-white/5 text-slate-300',
    label: titleCaseWords(normalizeComparisonValue(status) || 'Review Complete'),
  };
}

export function formatRouteLabel(route: string) {
  const normalized = normalizeComparisonValue(route);
  if (!normalized) return '';

  const overrides: Record<string, string> = {
    'auto approve': 'Auto approval',
    'automatic approval': 'Auto approval',
    'auto approved': 'Auto approval',
    'approved automatically': 'Auto approval',
    'human review': 'Reviewer approval',
    'manual review': 'Reviewer approval',
    'reviewer approval': 'Reviewer approval',
    'escalate to review': 'Reviewer approval',
  };

  return overrides[normalized] ?? titleCaseWords(normalized);
}
