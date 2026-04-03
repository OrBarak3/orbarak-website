export interface DemoRuntimeEnv {
  DEV?: boolean;
  VITE_API_URL?: string;
}

export interface DemoApiConfig {
  apiUrl: string | null;
  isInteractive: boolean;
  statusMessage: string | null;
}

const LOCAL_HOSTNAMES = new Set(['localhost', '127.0.0.1', '[::1]']);

export function resolveDemoApiConfig(
  env: DemoRuntimeEnv,
  hostname: string,
): DemoApiConfig {
  const configuredApiUrl = env.VITE_API_URL?.trim();

  if (configuredApiUrl) {
    return {
      apiUrl: configuredApiUrl,
      isInteractive: true,
      statusMessage: null,
    };
  }

  const normalizedHostname = hostname.trim().toLowerCase();
  const isLocalRuntime =
    Boolean(env.DEV) ||
    LOCAL_HOSTNAMES.has(normalizedHostname) ||
    normalizedHostname.endsWith('.local');

  // Never let a hosted preview call localhost on the visitor's machine.
  if (isLocalRuntime) {
    return {
      apiUrl: 'http://localhost:8000',
      isInteractive: true,
      statusMessage: null,
    };
  }

  return {
    apiUrl: null,
    isInteractive: false,
    statusMessage:
      'Interactive demo unavailable on this deployment. Set VITE_API_URL in Vercel to enable the contract-review backend.',
  };
}
