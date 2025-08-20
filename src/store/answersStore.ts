// stores/useQuizStore.ts
import { QuizResultInput, UserAnswerInput } from "@/types/questions.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type QuizState = {
  answers: UserAnswerInput[];
  addAnswer: (answer: UserAnswerInput) => void;
    resetAnswers: () => void;

};

const useAnswersStore = create<QuizState>()(
  persist(
    (set) => ({
      answers: [],

      addAnswer: (answer) =>
        set((state) => {
          // prevent duplicates (unique per questionId)
          const filtered = state.answers.filter(
            (a) => a.questionId !== answer.questionId
          );
          return { answers: [...filtered, answer] };
        }),

      resetAnswers: () => set({ answers: [] }),
    }),
    {
      name: "quiz-answers-storage", // key in localStorage
    }
  )
);

export default useAnswersStore;