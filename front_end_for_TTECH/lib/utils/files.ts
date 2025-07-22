import { getEnv } from "./env";

/**
 * Create URL to access files from backend
 */
export function getFile(fileName: string): string {
  if (!fileName) throw new Error(">>> getFileUrl: fileName is empty");

  const domain = getEnv.BACKEND_API;
  const endpoint = getEnv.FILES_ENDPOINT;

  return `${domain}${endpoint}/${encodeURIComponent(fileName)}`;
}
