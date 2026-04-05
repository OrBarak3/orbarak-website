import { describe, expect, it } from 'vitest';
import {
  formatClauseTypeLabel,
  formatPolicyTriggerLabel,
  formatRouteLabel,
  getClauseDisplayContent,
  getStatusConfig,
  isWeakClauseSummary,
} from './formatContractReview';

describe('formatContractReview', () => {
  it('detects weak clause summaries', () => {
    expect(isWeakClauseSummary('', 'general')).toBe(true);
    expect(isWeakClauseSummary('1.', 'indemnity')).toBe(true);
    expect(isWeakClauseSummary('general', 'general')).toBe(true);
    expect(isWeakClauseSummary('Vendor must notify customer within 24 hours of an incident.', 'security')).toBe(false);
  });

  it('falls back to the best available snippet when summaries are weak', () => {
    expect(
      getClauseDisplayContent({
        clause_type: 'indemnity',
        summary: '2.',
        obligations: ['Customer must defend and indemnify the vendor against third-party claims.'],
        evidence_spans: ['Customer shall indemnify, defend, and hold harmless Vendor from all third-party claims.'],
        risk_level: 'high',
      }),
    ).toMatchObject({
      summary: 'Customer shall indemnify, defend, and hold harmless Vendor from all third-party claims.',
      supportLine: 'Customer must defend and indemnify the vendor against third-party claims.',
      emphasizedEvidence: true,
    });
  });

  it('formats visitor-facing labels cleanly', () => {
    expect(formatClauseTypeLabel('governing_law')).toBe('Governing Law');
    expect(formatPolicyTriggerLabel('blocked_clause_type:indemnity')).toBe('Blocked clause: Indemnity');
    expect(formatPolicyTriggerLabel('high_risk_clause_detected')).toBe('High-risk clause detected');
    expect(getStatusConfig('approved_by_reviewer').label).toBe('Approved by Reviewer');
    expect(formatRouteLabel('manual_review')).toBe('Reviewer approval');
  });
});
