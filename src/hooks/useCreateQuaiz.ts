"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Prisma } from "@prisma/client";
import { QuaizPayload } from "@/types/quaiz.types";

// Use your full include type from Prisma (same as GET)
export type QuaizWithRelations = Prisma.QuaizGetPayload<{
  include: { questions: { include: { options: true } } };
}>;

// POST fetcher
async function createQuaiz(payload:QuaizPayload) {
  const res = await fetch("/api/quaiz", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  let data: QuaizWithRelations|null = null;
  try {
    data = await res.json();
  } catch {
    /* ignore */
  }

  if (!res.ok) {
    throw new Error( `Failed to create quiz (${res.status})`);
  }

  return data as QuaizWithRelations;
}

// Mutation hook
export function useCreateQuaiz() {
  const queryClient = useQueryClient();

  return useMutation<QuaizWithRelations, Error, Parameters<typeof createQuaiz>[0]>({
    mutationFn: createQuaiz,
    onSuccess: (newQuiz) => {
      // 🔥 Invalidate all queries that could be affected
      queryClient.invalidateQueries({ queryKey: ["quaiz", "list"] });
      queryClient.invalidateQueries({ queryKey: ["quaiz", "detail", newQuiz.id] });

      // Optional: Optimistically insert newQuiz into cache for instant update
      queryClient.setQueryData<QuaizWithRelations[]>(["quaiz", "list", {}], (old) => {
        if (!old) return [newQuiz];
        return [...old, newQuiz];
      });
    },
  });
}
