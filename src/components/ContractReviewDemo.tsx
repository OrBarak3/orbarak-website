import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { resolveDemoApiConfig } from '../utils/demoApiConfig';

// ── types ─────────────────────────────────────────────────────────────────────

interface ClauseExtractionOut {
  clause_id: string;
  clause_type: string;
  summary: string;
  obligations: string[];
  key_dates: string[];
  amounts: string[];
  jurisdiction: string | null;
  risk_level: 'low' | 'medium' | 'high';
  confidence: number;
  evidence_spans: string[];
}

interface PolicyResults {
  route: string;
  reasons: string[];
  auto_pass_eligible: boolean;
  clause_results: Array<{
    clause_id: string;
    requires_human_review: boolean;
    reasons: string[];
  }>;
}

interface InterruptPayload {
  action_required: string;
  contract_id: string;
  route: string;
  policy_reasons: string[];
  extractions: ClauseExtractionOut[];
  instructions: Record<string, unknown>;
}

interface RunCompletedResponse {
  status: 'completed';
  thread_id: string;
  final_status: string;
  route: string;
  extractions: ClauseExtractionOut[];
  policy_results: PolicyResults;
}

interface RunInterruptedResponse {
  status: 'interrupted';
  thread_id: string;
  interrupt_payload: InterruptPayload;
}

type RunResponse = RunCompletedResponse | RunInterruptedResponse;

interface ResumeResponse {
  status: 'completed';
  thread_id: string;
  final_status: string;
  route: string;
  extractions: ClauseExtractionOut[];
  review_decision: Record<string, string>;
}

// ── constants ─────────────────────────────────────────────────────────────────

const GRAPH_NODES = [
  { id: 'ingest_contract', label: 'Ingest Contract' },
  { id: 'parse_and_chunk_clauses', label: 'Parse & Chunk Clauses' },
  { id: 'extract_details_and_flag_risk', label: 'Extract & Flag Risk' },
  { id: 'check_policy_rules', label: 'Check Policy Rules' },
  { id: 'route_decision', label: 'Route Decision' },
] as const;

const NODE_DELAYS_MS = [600, 600, 700, 600, 1200];

const RISK_COLORS: Record<'low' | 'medium' | 'high', string> = {
  high: 'border-rose-400/25 bg-rose-400/5 text-rose-300',
  medium: 'border-amber-400/25 bg-amber-400/5 text-amber-300',
  low: 'border-emerald-400/25 bg-emerald-400/5 text-emerald-300',
};

const STATUS_CONFIG: Record<string, { classes: string; label: string }> = {
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

// ── helpers ───────────────────────────────────────────────────────────────────

function isInterrupted(r: RunResponse): r is RunInterruptedResponse {
  return r.status === 'interrupted';
}

function getStatusConfig(status: string) {
  return STATUS_CONFIG[status] ?? { classes: 'border-white/10 bg-white/5 text-slate-300', label: status };
}

// ── sub-components ────────────────────────────────────────────────────────────

function ClauseCard({ clause }: { clause: ClauseExtractionOut }) {
  const riskClass = RISK_COLORS[clause.risk_level];
  return (
    <div className="rounded-2xl border border-white/8 bg-slate-950/75 p-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-xs text-slate-500">{clause.clause_id}</span>
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-xs text-slate-300">
          {clause.clause_type}
        </span>
        <span className={`ml-auto rounded-full border px-2 py-0.5 font-mono text-xs ${riskClass}`}>
          {clause.risk_level.toUpperCase()} RISK
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-200">{clause.summary}</p>
      {clause.obligations.length > 0 && (
        <div className="mt-2 space-y-1">
          {clause.obligations.map((ob) => (
            <p key={ob} className="text-xs leading-5 text-slate-400">
              · {ob}
            </p>
          ))}
        </div>
      )}
      <div className="mt-3 flex items-center gap-3">
        <span className="text-xs text-slate-500">Confidence</span>
        <div className="h-1 flex-1 rounded-full bg-white/10">
          <div
            className="h-1 rounded-full bg-accent/60"
            style={{ width: `${Math.round(clause.confidence * 100)}%` }}
          />
        </div>
        <span className="font-mono text-xs text-slate-400">{Math.round(clause.confidence * 100)}%</span>
      </div>
    </div>
  );
}

// ── main component ────────────────────────────────────────────────────────────

interface ContractReviewDemoProps {
  exampleContract: string;
}

type DemoPhase = 'idle' | 'running' | 'interrupted' | 'completed' | 'error';

export function ContractReviewDemo({ exampleContract }: ContractReviewDemoProps) {
  const shouldReduceMotion = useReducedMotion();
  const detailEase = [0.22, 1, 0.36, 1] as const;
  const hostname = typeof window === 'undefined' ? '' : window.location.hostname;
  const { apiUrl, isInteractive, statusMessage } = resolveDemoApiConfig(import.meta.env, hostname);
  const unavailableMessage =
    statusMessage ?? 'Interactive demo unavailable on this deployment.';

  // ── core state ──
  const [phase, setPhase] = useState<DemoPhase>('idle');
  const [activeTab, setActiveTab] = useState<'text' | 'file'>('text');
  const [textInput, setTextInput] = useState(exampleContract);
  const [fileInput, setFileInput] = useState<File | null>(null);

  // ── progress animation ──
  const [visibleNodeIndex, setVisibleNodeIndex] = useState(0);
  const progressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── results ──
  const [threadId, setThreadId] = useState<string | null>(null);
  const [runResult, setRunResult] = useState<RunCompletedResponse | null>(null);
  const [interruptPayload, setInterruptPayload] = useState<InterruptPayload | null>(null);
  const [resumeResult, setResumeResult] = useState<ResumeResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // ── reviewer state ──
  const [reviewDecision, setReviewDecision] = useState<'approve' | 'edit' | 'reject'>('approve');
  const [reviewerNotes, setReviewerNotes] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  // ── progress animation effect ──
  useEffect(() => {
    if (phase !== 'running') {
      if (progressTimerRef.current) clearTimeout(progressTimerRef.current);
      return;
    }
    setVisibleNodeIndex(0);
    let nodeIndex = 0;

    const advance = () => {
      nodeIndex += 1;
      if (nodeIndex < GRAPH_NODES.length) {
        setVisibleNodeIndex(nodeIndex);
        progressTimerRef.current = setTimeout(advance, NODE_DELAYS_MS[nodeIndex] ?? 600);
      }
    };

    progressTimerRef.current = setTimeout(advance, NODE_DELAYS_MS[0]);
    return () => {
      if (progressTimerRef.current) clearTimeout(progressTimerRef.current);
    };
  }, [phase]);

  // ── handlers ──

  async function handleRun() {
    if (!apiUrl) {
      setErrorMessage(unavailableMessage);
      setPhase('error');
      return;
    }

    setPhase('running');
    setErrorMessage(null);
    setRunResult(null);
    setInterruptPayload(null);
    setResumeResult(null);
    setThreadId(null);

    const formData = new FormData();
    if (activeTab === 'text') {
      formData.append('text', textInput);
    } else if (fileInput) {
      formData.append('file', fileInput);
    } else {
      setErrorMessage('Please select a file to upload.');
      setPhase('error');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/run`, {
        method: 'POST',
        body: formData,
        // Do NOT set Content-Type — browser sets multipart boundary automatically
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({ detail: `HTTP ${response.status}` }));
        throw new Error(errData.detail ?? `HTTP ${response.status}`);
      }

      const data: RunResponse = await response.json();

      if (isInterrupted(data)) {
        setThreadId(data.thread_id);
        setInterruptPayload(data.interrupt_payload);
        setPhase('interrupted');
      } else {
        setRunResult(data);
        setPhase('completed');
      }
    } catch (err) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Unexpected error. Is the API server running?',
      );
      setPhase('error');
    }
  }

  async function handleReview() {
    if (!threadId || !apiUrl) {
      setErrorMessage(unavailableMessage);
      setPhase('error');
      return;
    }

    setSubmittingReview(true);

    try {
      const response = await fetch(`${apiUrl}/api/resume/${threadId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          decision: reviewDecision,
          reviewer_notes: reviewerNotes,
          reviewer_id: 'portfolio-visitor',
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({ detail: `HTTP ${response.status}` }));
        throw new Error(errData.detail ?? `HTTP ${response.status}`);
      }

      const data: ResumeResponse = await response.json();
      setResumeResult(data);
      setPhase('completed');
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : 'Unexpected error resuming review.',
      );
      setPhase('error');
    } finally {
      setSubmittingReview(false);
    }
  }

  function handleReset() {
    setPhase('idle');
    setTextInput(exampleContract);
    setFileInput(null);
    setThreadId(null);
    setRunResult(null);
    setInterruptPayload(null);
    setResumeResult(null);
    setErrorMessage(null);
    setReviewDecision('approve');
    setReviewerNotes('');
  }

  // ── motion helpers ──
  const panelAnim = shouldReduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
        transition: { duration: 0.28, ease: detailEase },
      };

  // ── shared tab-pill class ──
  const tabPill = (active: boolean) =>
    `inline-flex items-center rounded-full border px-4 py-2 text-sm transition ${
      active
        ? 'panel-active text-accent'
        : 'border-white/10 bg-white/5 text-slate-200 hover:border-white/20 hover:bg-white/10'
    }`;

  // ── completed extractions (from either run or resume) ──
  const completedExtractions =
    resumeResult?.extractions ?? runResult?.extractions ?? [];
  const completedStatus =
    resumeResult?.final_status ?? runResult?.final_status ?? '';
  const completedRoute =
    resumeResult?.route ?? runResult?.route ?? '';
  const completedPolicyResults = runResult?.policy_results;

  return (
    <article className="panel-hover rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-card backdrop-blur-xl sm:rounded-[2rem] sm:p-8">
      <AnimatePresence mode="wait">
        {/* ── INPUT PANEL ── */}
        {phase === 'idle' && (
          <motion.div key="input" {...panelAnim}>
            {statusMessage && (
              <div className="mb-4 rounded-2xl border border-amber-400/20 bg-amber-400/5 p-4">
                <div className="ui-eyebrow text-amber-300">Preview Notice</div>
                <p className="mt-2 text-sm leading-6 text-amber-100/90">{statusMessage}</p>
              </div>
            )}

            {/* Tab switcher */}
            <div className="flex gap-3">
              <button
                type="button"
                className={tabPill(activeTab === 'text')}
                onClick={() => setActiveTab('text')}
              >
                Paste Text
              </button>
              <button
                type="button"
                className={tabPill(activeTab === 'file')}
                onClick={() => setActiveTab('file')}
              >
                Upload File
              </button>
            </div>

            {/* Text tab */}
            {activeTab === 'text' && (
              <div className="mt-4">
                <textarea
                  className="w-full rounded-2xl border border-white/8 bg-slate-950/75 px-4 py-3 font-mono text-xs leading-6 text-slate-200 placeholder-slate-600 outline-none focus:border-accent/40 focus:ring-0"
                  rows={14}
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Paste contract text here…"
                  spellCheck={false}
                />
                <p className="mt-1 text-xs text-slate-600">
                  Pre-loaded with a high-risk vendor MSA — will trigger the human review path.
                </p>
              </div>
            )}

            {/* File tab */}
            {activeTab === 'file' && (
              <div className="mt-4">
                <label
                  htmlFor="contract-file-input"
                  className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-white/15 bg-white/[0.02] p-10 text-center transition hover:border-accent/30 hover:bg-accent/[0.03]"
                >
                  <svg
                    className="h-8 w-8 text-slate-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                    />
                  </svg>
                  {fileInput ? (
                    <span className="text-sm text-slate-200">{fileInput.name}</span>
                  ) : (
                    <>
                      <span className="text-sm text-slate-300">Drop your contract here</span>
                      <span className="text-xs text-slate-500">PDF · DOCX · TXT · MD — max 5 MB</span>
                    </>
                  )}
                </label>
                <input
                  id="contract-file-input"
                  type="file"
                  accept=".txt,.pdf,.docx,.md"
                  className="sr-only"
                  onChange={(e) => setFileInput(e.target.files?.[0] ?? null)}
                />
              </div>
            )}

            {/* Run button */}
            <button
              type="button"
              disabled={!isInteractive || (activeTab === 'file' && !fileInput)}
              onClick={handleRun}
              className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-accent/35 bg-accent px-6 py-3 text-sm font-medium text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-300 hover:shadow-glow-btn disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
            >
              Run Contract Review →
            </button>
          </motion.div>
        )}

        {/* ── PROGRESS PANEL ── */}
        {phase === 'running' && (
          <motion.div key="progress" {...panelAnim}>
            <div className="ui-eyebrow text-accent-soft">Analyzing contract…</div>
            <div className="mt-6 space-y-3">
              {GRAPH_NODES.map((node, idx) => {
                const done = idx < visibleNodeIndex;
                const active = idx === visibleNodeIndex;
                return (
                  <div key={node.id} className="flex items-center gap-3">
                    {done && (
                      <span className="flex h-4 w-4 items-center justify-center text-emerald-400">
                        <svg viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3">
                          <path d="M13.485 3.515a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L6 9.586l6.07-6.07a1 1 0 011.415 0z" />
                        </svg>
                      </span>
                    )}
                    {active && (
                      <span className="flex h-4 w-4 items-center justify-center">
                        <span className="h-3 w-3 animate-spin rounded-full border-2 border-accent border-t-transparent" />
                      </span>
                    )}
                    {!done && !active && (
                      <span className="flex h-4 w-4 items-center justify-center">
                        <span className="h-2 w-2 rounded-full border border-white/20 bg-transparent" />
                      </span>
                    )}
                    <span
                      className={`text-sm transition-colors ${
                        done
                          ? 'text-emerald-400'
                          : active
                            ? 'text-cyan-200'
                            : 'text-slate-600'
                      }`}
                    >
                      {node.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ── INTERRUPTED: HUMAN REVIEW PANEL ── */}
        {phase === 'interrupted' && interruptPayload && (
          <motion.div key="interrupted" {...panelAnim} className="space-y-6">
            {/* Header */}
            <div>
              <div className="ui-eyebrow text-amber-400/80">Human Review Required</div>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Policy flagged this contract. Review the clauses below and submit your decision.
              </p>
            </div>

            {/* Policy reasons */}
            {interruptPayload.policy_reasons.length > 0 && (
              <div>
                <div className="ui-eyebrow text-slate-500">Policy Triggers</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {interruptPayload.policy_reasons.map((reason) => (
                    <span
                      key={reason}
                      className="rounded-full border border-amber-400/20 bg-amber-400/5 px-3 py-1 font-mono text-xs text-amber-200"
                    >
                      {reason}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Clause cards (read-only) */}
            {interruptPayload.extractions.length > 0 && (
              <div>
                <div className="ui-eyebrow text-slate-500">Extracted Clauses</div>
                <div className="mt-3 space-y-3">
                  {interruptPayload.extractions.map((clause) => (
                    <ClauseCard key={clause.clause_id} clause={clause} />
                  ))}
                </div>
              </div>
            )}

            {/* Decision */}
            <div>
              <div className="ui-eyebrow text-slate-500">Your Decision</div>
              <div className="mt-3 flex flex-wrap gap-3">
                {(['approve', 'reject', 'edit'] as const).map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setReviewDecision(d)}
                    className={tabPill(reviewDecision === d)}
                  >
                    {d === 'approve' ? 'Approve' : d === 'reject' ? 'Reject' : 'Approve with Edits'}
                  </button>
                ))}
              </div>

              <textarea
                className="mt-4 w-full rounded-2xl border border-white/8 bg-slate-950/75 px-4 py-3 text-sm leading-6 text-slate-200 placeholder-slate-600 outline-none focus:border-accent/40"
                rows={3}
                placeholder="Reviewer notes (optional)…"
                value={reviewerNotes}
                onChange={(e) => setReviewerNotes(e.target.value)}
              />

              <button
                type="button"
                disabled={submittingReview}
                onClick={handleReview}
                className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-accent/35 bg-accent px-6 py-3 text-sm font-medium text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-300 hover:shadow-glow-btn disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
              >
                {submittingReview ? 'Submitting…' : 'Submit Decision →'}
              </button>
            </div>
          </motion.div>
        )}

        {/* ── COMPLETED RESULTS ── */}
        {phase === 'completed' && (
          <motion.div key="completed" {...panelAnim} className="space-y-6">
            {/* Status badge + meta */}
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`rounded-full border px-4 py-1.5 text-sm font-medium ${getStatusConfig(completedStatus).classes}`}
              >
                {getStatusConfig(completedStatus).label}
              </span>
              {completedRoute && (
                <span className="font-mono text-xs text-slate-500">
                  route: {completedRoute}
                </span>
              )}
              {completedPolicyResults && (
                <span className="font-mono text-xs text-slate-500">
                  provider: heuristic
                </span>
              )}
            </div>

            {/* Review decision summary (if resumed) */}
            {resumeResult?.review_decision && (
              <div className="rounded-2xl border border-white/8 bg-slate-950/75 p-4">
                <div className="ui-eyebrow text-slate-500">Review Decision</div>
                <p className="mt-2 text-sm text-slate-300">
                  Decision:{' '}
                  <span className="font-medium text-slate-100">
                    {resumeResult.review_decision.decision}
                  </span>
                  {resumeResult.review_decision.reviewer_notes && (
                    <> — {resumeResult.review_decision.reviewer_notes}</>
                  )}
                </p>
              </div>
            )}

            {/* Clause analysis */}
            {completedExtractions.length > 0 && (
              <div>
                <div className="ui-eyebrow text-slate-500">
                  Clause Analysis ({completedExtractions.length} clause{completedExtractions.length !== 1 ? 's' : ''})
                </div>
                <div className="mt-3 space-y-3">
                  {completedExtractions.map((clause) => (
                    <ClauseCard key={clause.clause_id} clause={clause} />
                  ))}
                </div>
              </div>
            )}

            {/* Run again */}
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-slate-200 transition hover:border-white/20 hover:bg-white/10"
            >
              ← Run Again
            </button>
          </motion.div>
        )}

        {/* ── ERROR ── */}
        {phase === 'error' && (
          <motion.div key="error" {...panelAnim} className="space-y-4">
            <div className="rounded-2xl border border-red-400/20 bg-red-400/5 p-5">
              <div className="ui-eyebrow text-red-400/80">Error</div>
              <p className="mt-2 text-sm leading-6 text-red-300">{errorMessage}</p>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-slate-200 transition hover:border-white/20 hover:bg-white/10"
            >
              ← Try Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
