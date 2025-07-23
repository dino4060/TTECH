function getEnvSafely(value: string | undefined, name: string): string {
  if (value) return value;
  throw new Error(`>>> getEnv: Missing ${name}`);
}

export const getEnv = {
  BACKEND_API: getEnvSafely(process.env.NEXT_PUBLIC_BACKEND_API, 'NEXT_PUBLIC_BACKEND_API'),
  FILES_ENDPOINT: getEnvSafely(process.env.NEXT_PUBLIC_BACKEND_API, 'NEXT_PUBLIC_BACKEND_API'),

  GOOGLE_CLIENT_ID: getEnvSafely(process.env.NEXT_PUBLIC_CLIENT_ID, 'NEXT_PUBLIC_CLIENT_ID'),
  GOOGLE_AUTH_URI: getEnvSafely(process.env.NEXT_PUBLIC_AUTH_URI, 'NEXT_PUBLIC_AUTH_URI'),
  GOOGLE_REDIRECT_URI: getEnvSafely(process.env.NEXT_PUBLIC_REDIRECT_URI, 'NEXT_PUBLIC_REDIRECT_URI'),
};