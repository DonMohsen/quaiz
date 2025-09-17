import { UserAnswerInput } from "@/types/questions.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useQuaizAnswers() {
  const queryClient = useQueryClient();

interface SaveAnswersPayload {
  userId: string;
  quaizId: number;
  score: number;
  total: number;
  answers: UserAnswerInput[];
}
interface SaveAnswersResponse {
  quizResult: {
    score: number;
    total: number;
    id: string;
  };
}
  return useMutation<SaveAnswersResponse, Error, SaveAnswersPayload>({
    mutationFn: async (payload: SaveAnswersPayload) => {
      const res = await fetch("/api/quaiz/answers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errMsg = await res.text();
        throw new Error(errMsg || "Failed to save quiz result");
      }

      return res.json() as Promise<SaveAnswersResponse>;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["quaiz", "list"] });
      queryClient.invalidateQueries({ queryKey: ["quaiz", "detail", variables.quaizId] });
    },
  });
}
