import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { resolveDemoApiConfig } from '../utils/demoApiConfig';
import { ContractReviewDemo } from './ContractReviewDemo';

vi.mock('../utils/demoApiConfig', () => ({
  resolveDemoApiConfig: vi.fn(),
}));

const mockResolveDemoApiConfig = vi.mocked(resolveDemoApiConfig);

function enableInteractiveDemo() {
  mockResolveDemoApiConfig.mockReturnValue({
    apiUrl: 'http://localhost:8000',
    isInteractive: true,
    statusMessage: null,
  });
}

describe('ContractReviewDemo', () => {
  beforeEach(() => {
    mockResolveDemoApiConfig.mockReset();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('disables the interactive run button when no backend is configured', async () => {
    const user = userEvent.setup();
    const fetchSpy = vi.fn();

    vi.stubGlobal('fetch', fetchSpy);
    mockResolveDemoApiConfig.mockReturnValue({
      apiUrl: null,
      isInteractive: false,
      statusMessage:
        'Interactive demo unavailable on this deployment. Set VITE_API_URL in Vercel to enable the contract-review backend.',
    });

    render(<ContractReviewDemo exampleContract="1. Services" />);

    expect(screen.getByText(/Set VITE_API_URL in Vercel/i)).toBeInTheDocument();

    const runButton = screen.getByRole('button', { name: /Run Contract Review/i });
    expect(runButton).toBeDisabled();

    await user.click(runButton);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('keeps the demo interactive when an api url is available', () => {
    enableInteractiveDemo();

    render(<ContractReviewDemo exampleContract="1. Services" />);

    expect(screen.queryByText(/Set VITE_API_URL in Vercel/i)).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Run Contract Review/i })).toBeEnabled();
  });

  it('repairs weak clause summaries and formats policy triggers during reviewer flow', async () => {
    const user = userEvent.setup();
    enableInteractiveDemo();

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          status: 'interrupted',
          thread_id: 'thread-123',
          interrupt_payload: {
            action_required: 'review',
            contract_id: 'contract-1',
            route: 'manual_review',
            policy_reasons: ['blocked_clause_type:indemnity', 'high_risk_clause_detected'],
            instructions: {},
            extractions: [
              {
                clause_id: 'clause-1',
                clause_type: 'governing_law',
                summary: '1.',
                obligations: ['Contract applies New York law across all disputes.'],
                key_dates: [],
                amounts: [],
                jurisdiction: 'New York',
                risk_level: 'high',
                confidence: 0.91,
                evidence_spans: ['This Agreement will be governed by the laws of New York.'],
              },
            ],
          },
        }),
      }),
    );

    render(<ContractReviewDemo exampleContract="1. Services" />);

    await user.click(screen.getByRole('button', { name: /Run Contract Review/i }));

    expect(await screen.findByText('Human Review Required')).toBeInTheDocument();
    expect(screen.getByText('Blocked clause: Indemnity')).toBeInTheDocument();
    expect(screen.getByText('High-risk clause detected')).toBeInTheDocument();
    expect(screen.getByText('This Agreement will be governed by the laws of New York.')).toBeInTheDocument();
    expect(screen.getByText('Why it matters: Contract applies New York law across all disputes.')).toBeInTheDocument();
    expect(screen.getByText('Governing Law')).toBeInTheDocument();
    expect(screen.queryByText(/^1\.$/)).not.toBeInTheDocument();
  });

  it('shows cleaned completed results without internal provider metadata', async () => {
    const user = userEvent.setup();
    enableInteractiveDemo();

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          status: 'completed',
          thread_id: 'thread-999',
          final_status: 'approved_by_reviewer',
          route: 'manual_review',
          extractions: [
            {
              clause_id: 'clause-2',
              clause_type: 'indemnity',
              summary: 'Customer indemnifies the vendor for third-party claims.',
              obligations: ['Customer covers defense costs and related losses.'],
              key_dates: [],
              amounts: [],
              jurisdiction: null,
              risk_level: 'high',
              confidence: 0.95,
              evidence_spans: ['Customer shall indemnify, defend, and hold harmless Vendor from third-party claims.'],
            },
          ],
          policy_results: {
            route: 'manual_review',
            reasons: ['blocked_clause_type:indemnity'],
            auto_pass_eligible: false,
            clause_results: [],
          },
        }),
      }),
    );

    render(<ContractReviewDemo exampleContract="1. Services" />);

    await user.click(screen.getByRole('button', { name: /Run Contract Review/i }));

    expect(await screen.findByText('Approved by Reviewer')).toBeInTheDocument();
    expect(screen.getByText('path: Reviewer approval')).toBeInTheDocument();
    expect(screen.queryByText(/provider:/i)).not.toBeInTheDocument();
    expect(screen.getByText('Why it matters: Customer shall indemnify, defend, and hold harmless Vendor from third-party claims.')).toBeInTheDocument();
  });

  it('shows polished error copy while preserving backend detail', async () => {
    const user = userEvent.setup();
    enableInteractiveDemo();

    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new Error('Backend timed out')),
    );

    render(<ContractReviewDemo exampleContract="1. Services" />);

    await user.click(screen.getByRole('button', { name: /Run Contract Review/i }));

    expect(await screen.findByText("The demo couldn't complete this run. Please try again or use the sample contract.")).toBeInTheDocument();
    expect(screen.getByText('Backend timed out')).toBeInTheDocument();
  });
});
