// src/lib/fetch/config.ts
import { TApi, TApiResult, THttpMethod } from "@/types/base.types";
import { getEnv } from "../utils/env";
import { createAppError } from "../constants";

export function buildEndpoint(domain: string, route: string, query?: any): RequestInfo {
  const endpoint = `${domain}${route}`;
  console.log(`>>> buildEndpoint: ${endpoint}`);

  if (!query) return endpoint;
  const queryRecord: Record<string, string> = query;
  const queryString = new URLSearchParams(queryRecord).toString();
  return `${endpoint}?${queryString}`;
}

export function buildOptions(method: THttpMethod, body?: any): RequestInit {
  if (!body) return { method };
  return {
    method,
    body: JSON.stringify(body),
  }
}

export function shouldAuth(route: string, withAuth: boolean = false): boolean {
  if (withAuth) return true;

  if (!route || typeof route !== 'string') throw new Error('>>> shouldAuth: invalid endpoint');
  const normalized = route.toLowerCase().trim();
  if (normalized.startsWith('/public')) return false;

  return true;
}

export const normalizeResponse = async <T>(response: Response) => {
  const json = await response.json() as TApiResult<T>;

  if (!json.success) {
    console.warn(`>>> normalizeResponse: ${json.error}`);
  }

  if (!json.success && json.code === 1010) {
    json.error = "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại";
  }

  return json;
}

export const normalizeError = <T>(error: any) => {
  console.error(`>>> normalizeError: ${error.message || 'Lỗi không xác định'}`);

  return createAppError<T>('Thật tiết! Đã có lỗi xảy ra');
}

// NOTE: URL
// URL: <protocol>://<domain>:<port>/<route>?<query>#<fragment>
// Domain      | Tên miền (gốc)                     | `https://api.example.com`
// Route       | Đường dẫn sau domain               | `/users`, `/products/[id]/reviews`
// Path        | Giá trị cụ thể của route           | `/product/123`
// Query       |                                    | `?name=dino`
// Method      |                                    | `GET`, `POST`, `PATCH`, `DELETE`
// Endpoint    | URL cụ thể đại diện cho tài nguyên | `https://api.example.com` + `/users` + `?name=dino`
// Endpoint    | Ngoại lệ: Một API được expose ra bởi controller, dù có chứa biến route, miễn là client có thể gọi được khi biết giá trị cụ thể.
export const fetchSafely = async <T = any>(
  api: TApi<T>,
  fetchCore: (endpoint: RequestInfo, options?: RequestInit, withAuth?: boolean) => Promise<Response>
): Promise<TApiResult<T>> => {

  const domain = getEnv.BACKEND_API;
  const { route, method, withAuth, query, body } = api

  try {
    const response = await fetchCore(
      buildEndpoint(domain, route, query),
      buildOptions(method, body),
      shouldAuth(route, withAuth),
    );
    return normalizeResponse<T>(response)

  } catch (error: any) {
    return normalizeError<T>(error)
  }
}