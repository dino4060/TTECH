function getEnvSafely(value: string | undefined, name: string): string {
  if (value) return value;
  throw new Error(`>>> getEnv: Missing ${name}`);
}

export const getEnv = {
  BACKEND_API: 'http://localhost:8080/api',
  FILES_ENDPOINT: '/files',
};