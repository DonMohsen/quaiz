"use client";

import { keepPreviousData, useQuery, type UseQueryResult } from "@tanstack/react-query";
// If you prefer exact Prisma types (recommended):
import { QuaizWithResults } from "@/types/quaiz.types";

async function fetchJSON<T>(input: string): Promise<T> {
  const res = await fetch(input, { credentials: "same-origin" });
  let payload: any = null;

  try {
    payload = await res.json();
  } catch {
    // ignore JSON parse errors (e.g., empty body)
  }

  if (!res.ok) {
    const message =
      (payload && (payload.error || payload.message)) ||
      `Request failed (${res.status} ${res.statusText})`;
    throw new Error(message);
  }
  console.log("This is payload===>",payload);
  
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
export function useQuaizzes(params?: { userId?: string; documentSlug?: string }) {
  const qs = buildQS(params as Record<string, string | undefined>);

  return useQuery<QuaizWithResults[], Error>({
    queryKey: ["quaiz", "list", params ?? {}],
    queryFn: () => fetchJSON<QuaizWithResults[]>(`/api/quaiz${qs}`),
    // Nice defaults; tweak as you like
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
    enabled: !!id, // don't run until id exists
    staleTime: 30_000,
    gcTime: 5 * 60_000,
  });
}
