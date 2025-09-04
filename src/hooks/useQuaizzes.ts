"use client";

import { keepPreviousData, useQuery, type UseQueryResult } from "@tanstack/react-query";
// If you prefer exact Prisma types (recommended):
import { QuaizWithResults } from "@/types/quaiz.types";

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
      // Try to read error or message from payload
      const obj = payload as Record<string, unknown>;
      if (typeof obj.error === "string") message = obj.error;
      else if (typeof obj.message === "string") message = obj.message;
    }

    throw new Error(message); // always a string now
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
