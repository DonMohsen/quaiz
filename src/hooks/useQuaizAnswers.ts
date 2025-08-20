// hooks/useQuaizAnswers.ts
"use client";

import { UserAnswerInput } from "@/types/questions.types";
import { useState } from "react";



interface SaveAnswersPayload {
  userId: string;
  quaizId: number;
  score: number;
  total: number;
  answers: UserAnswerInput[];
}

export function useQuaizAnswers() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveAnswers = async (payload: SaveAnswersPayload) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/quaiz/answers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errMsg = await res.text();
        throw new Error(errMsg || "Failed to save quiz result");
      }

      return await res.json();
    }  catch (err: unknown) {
  if (err instanceof Error) {
    setError(err.message);
  } else if (typeof err === "string") {
    setError(err);
  } else {
    setError("Unknown error");
  }
  throw err; // still rethrow for the caller
}finally {
      setLoading(false);
    }
  };

  return { saveAnswers, loading, error };
}
