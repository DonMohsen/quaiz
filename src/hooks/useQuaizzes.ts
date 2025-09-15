"use client";

import {
  keepPreviousData,
  useQuery,
  type UseQueryResult,
} from "@tanstack/react-query";
import { QuaizWithResults } from "@/types/quaiz.types";

// ---- fetch helper ----
async function fetchJSON<T>(input: string): Promise<T> {
  const res = await fetch(input, { credentials: "same-origin" });

  let payload: unknown = null;

  try {
    payload = await res.json();
  } catch {
    // ignore JSON parse errors
  }

  if (!res.ok) {
    let message = `Request failed (${res.status} ${res.statusText})`;

    if (payload && typeof payload === "object" && payload !== null) {
      const obj = payload as Record<string, unknown>;
      if (typeof obj.error === "string") message = obj.error;
      else if (typeof obj.message === "string") message = obj.message;
    }

    throw new Error(message);
  }

  return payload as T;
}

function buildQS(params?: Record<string, string | undefined>) {
  const sp = new URLSearchParams();
  Object.entries(params || {}).forEach(([k, v]) => {
    if (v != null && v !== "") sp.set(k, v);
  });
  const q = sp.toString();
  return q ? `?${q}` : "";
}

// ---------- Hooks ----------

/**
 * List hook: fetch many quizzes (optionally filtered).
 * GET /api/quaiz?userId=...&documentSlug=...
 */
export function useQuaizzes(params?: {
  userId?: string;
  documentSlug?: string;
}) {
  const qs = buildQS(params);

  return useQuery<QuaizWithResults[], Error>({
    queryKey: ["quaiz", "list", params ?? {}],
    queryFn: () => fetchJSON<QuaizWithResults[]>(`/api/quaiz${qs}`),
    staleTime: 30_000,
    gcTime: 5 * 60_000,
    placeholderData: keepPreviousData,
  });
}

/**
 * Single hook: fetch one quiz by id.
 * GET /api/quaiz?id=...
 */
export function useQuaiz(id?: string) {
  const qs = buildQS({ id });

  return useQuery<QuaizWithResults, Error>({
    queryKey: ["quaiz", "detail", id],
    queryFn: () => fetchJSON<QuaizWithResults>(`/api/quaiz${qs}`),
    enabled: !!id,
    staleTime: 30_000,
    gcTime: 5 * 60_000,
  });
}
