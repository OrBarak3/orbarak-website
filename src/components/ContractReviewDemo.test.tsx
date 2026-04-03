import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { resolveDemoApiConfig } from '../utils/demoApiConfig';
import { ContractReviewDemo } from './ContractReviewDemo';

vi.mock('../utils/demoApiConfig', () => ({
  resolveDemoApiConfig: vi.fn(),
}));

const mockResolveDemoApiConfig = vi.mocked(resolveDemoApiConfig);

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
    mockResolveDemoApiConfig.mockReturnValue({
      apiUrl: 'http://localhost:8000',
      isInteractive: true,
      statusMessage: null,
    });

    render(<ContractReviewDemo exampleContract="1. Services" />);

    expect(screen.queryByText(/Set VITE_API_URL in Vercel/i)).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Run Contract Review/i })).toBeEnabled();
  });
});
