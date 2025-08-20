export type UserAnswerInput = {
  questionId: number;
  selectedOptionId: number | null;
  isCorrect: boolean;
};

export type QuizResultInput = {
  userId: string;
  quaizId: number;
  score: number;
  total: number;
  answers: UserAnswerInput[];
};

