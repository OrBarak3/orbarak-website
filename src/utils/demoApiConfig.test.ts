import { describe, expect, it } from 'vitest';
import { resolveDemoApiConfig } from './demoApiConfig';

describe('resolveDemoApiConfig', () => {
  it('prefers an explicitly configured backend url', () => {
    expect(
      resolveDemoApiConfig(
        { DEV: false, VITE_API_URL: ' https://api.example.com ' },
        'preview.orbarak.vercel.app',
      ),
    ).toEqual({
      apiUrl: 'https://api.example.com',
      isInteractive: true,
      statusMessage: null,
    });
  });

  it('falls back to localhost during local development', () => {
    expect(resolveDemoApiConfig({ DEV: false }, 'localhost')).toEqual({
      apiUrl: 'http://localhost:8000',
      isInteractive: true,
      statusMessage: null,
    });
  });

  it('disables the demo for hosted previews without a backend url', () => {
    expect(resolveDemoApiConfig({ DEV: false }, 'preview.orbarak.vercel.app')).toEqual({
      apiUrl: null,
      isInteractive: false,
      statusMessage:
        'Interactive demo unavailable on this deployment. Set VITE_API_URL in Vercel to enable the contract-review backend.',
    });
  });
});
