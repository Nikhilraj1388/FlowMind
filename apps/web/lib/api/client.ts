/**
 * Typed API client — Phase 5
 * Automatically attaches the Clerk session token to every request.
 * Uses @clerk/nextjs's getToken() on the client side.
 */
import { useAuth } from '@clerk/nextjs';
import type { Project, CreateProjectInput, UpdateProjectInput } from '@/types/project';
import type { Execution, CreateExecutionInput } from '@/types/execution';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api/v1';

// ── Error class ──────────────────────────────────────────────────────────────

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly data: unknown,
  ) {
    super(`API Error ${status}`);
    this.name = 'ApiError';
  }
}

// ── Standard response wrapper ────────────────────────────────────────────────

interface ApiResponse<T> {
  data: T;
}

interface PaginatedResponse<T> {
  data: T[];
  meta: { page: number; limit: number; total: number };
}

// ── Core fetch helper ────────────────────────────────────────────────────────

async function request<T>(
  path: string,
  token: string | null,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new ApiError(res.status, errorData);
  }

  // 204 No Content
  if (res.status === 204) return undefined as T;

  return res.json() as Promise<T>;
}

// ── React hook — returns a typed API client bound to the current session ─────

export function useApiClient() {
  const { getToken } = useAuth();

  const withToken = async <T>(
    path: string,
    options?: RequestInit,
  ): Promise<T> => {
    const token = await getToken();
    return request<T>(path, token, options);
  };

  return {
    projects: {
      list: (params?: { page?: number; limit?: number; language?: string; search?: string }) => {
        const qs = params ? '?' + new URLSearchParams(
          Object.entries(params)
            .filter(([, v]) => v !== undefined)
            .map(([k, v]) => [k, String(v)])
        ).toString() : '';
        return withToken<PaginatedResponse<Project>>(`/projects${qs}`);
      },
      get: (id: string) => withToken<ApiResponse<Project>>(`/projects/${id}`),
      create: (data: CreateProjectInput) =>
        withToken<ApiResponse<Project>>('/projects', {
          method: 'POST',
          body: JSON.stringify(data),
        }),
      update: (id: string, data: UpdateProjectInput) =>
        withToken<ApiResponse<Project>>(`/projects/${id}`, {
          method: 'PATCH',
          body: JSON.stringify(data),
        }),
      delete: (id: string) => withToken<void>(`/projects/${id}`, { method: 'DELETE' }),
      listExecutions: (id: string) =>
        withToken<PaginatedResponse<any>>(`/projects/${id}/executions`),
      duplicate: (id: string) =>
        withToken<ApiResponse<Project>>(`/projects/${id}/duplicate`, { method: 'POST' }),
    },

    executions: {
      create: (data: CreateExecutionInput) =>
        withToken<ApiResponse<{ id: string; status: string; createdAt: string }>>('/executions', {
          method: 'POST',
          body: JSON.stringify(data),
        }),
      get: (id: string) => withToken<ApiResponse<Execution>>(`/executions/${id}`),
      getStatus: (id: string) => withToken<ApiResponse<Execution>>(`/executions/${id}/status`),
      cancel: (id: string) => withToken<ApiResponse<Execution>>(`/executions/${id}`, { method: 'DELETE' }),
    },

    users: {
      me: () => withToken<ApiResponse<{ id: string; email: string; name: string | null; plan: string; usage: Record<string, number> }>>('/users/me'),
    },
  };
}
