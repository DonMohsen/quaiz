import useQuaizStore from "@/store/quaizStore";
import React, { useState } from "react";
import { Button } from "../ui/Button";
import useAnswersStore from "@/store/answersStore";
import { useQuaizAnswers } from "@/hooks/useQuaizAnswers";

const Quaiz = () => {
    const { saveAnswers, loading, error } = useQuaizAnswers();

  const [userAnswerState, setUserAnswerState] = useState<number | null>(null);
  const { currentQuestion, setCurrentQuestion, quaiz, setQuaiz } =
    useQuaizStore();
  const { addAnswer, answers, resetAnswers } = useAnswersStore();

  if (!quaiz || currentQuestion === null) {
    return null;
  }

  const currentQ = quaiz.questions[currentQuestion];

  const handleUserAnswer = (
    optionId: number,
    isCorrect: boolean,
    index: number
  ) => {
    if (userAnswerState !== null) return; // prevent re-selecting

    // store locally for styling
    setUserAnswerState(index);

    // persist in zustand
    addAnswer({
      questionId: currentQ.id,
      selectedOptionId: optionId,
      isCorrect,
    });
  };

  const handleClick = () => {
    if (currentQuestion + 1 !== quaiz.questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Finished
      setQuaiz(null);
      setCurrentQuestion(null);
    }
    setUserAnswerState(null); // reset for next question
  };

    const onFinished = async () => {
    try {
      const saved = await saveAnswers({
        userId: quaiz.userId,
        quaizId: quaiz.id,
        score: answers.filter((a) => a.isCorrect).length,
        total: quaiz.questions.length,
        answers,
      });

      console.log("Quiz result saved successfully:", saved);
      setQuaiz(null);
      setCurrentQuestion(null);
      resetAnswers();
    } catch (err) {
      console.error("Failed to save quiz:", err);
    }
  };

  const handleForfiet = () => {};

  return (
    <div className="w-full h-full flex flex-col items-center justify-start relative">
      <p className="w-full text-center">
        {currentQuestion + 1}/{quaiz.questions.length}
      </p>

      <p dir="rtl">{currentQ.text}</p>

      <div className="flex items-center justify-center flex-col w-full gap-5">
        {currentQ.options.map((option, index) => (
          <div
            onClick={() => handleUserAnswer(option.id, option.isCorrect, index)}
            key={option.id}
            className={`w-full rounded-md px-3 py-4 text-right flex items-center justify-end gap-5 ${
              userAnswerState === null && "cursor-pointer hover:bg-slate-200"
            }
              ${
                userAnswerState === null
                  ? "bg-slate-300"
                  : option.isCorrect
                  ? "bg-green-400"
                  : index === userAnswerState
                  ? "bg-red-400"
                  : "bg-slate-300"
              }`}
          >
            <p dir="rtl">{option.text}</p>
            <p className="p-2 rounded-[8px] bg-slate-100 w-10 h-10 text-center">
              {index + 1}
            </p>
          </div>
        ))}
      </div>

      {/* Next / Finish button */}
      <div className="absolute bottom-4 right-4">
        {userAnswerState !== null && (
          <Button
          className={`text-white font-medium ${currentQuestion + 1 === quaiz.questions.length ?'bg-purple-600':'bg-sky-500'}`}
          disabled={loading}
            onClick={
              currentQuestion + 1 === quaiz.questions.length
                ? onFinished
                : handleClick
            }
          >
            {loading?'wait...':
            currentQuestion + 1 === quaiz.questions.length ? "Finish" : "Next"
            }
          </Button>
        )}
      </div>

      {/* Save progress button */}
      <div className="absolute bottom-4 left-4">
        <Button
        disabled={loading}
          className="bg-red-500 text-white font-medium hover:bg-red-400 transition-all duration-300"
          onClick={onFinished}
        >
                      {loading&&'wait...'}

          Forfiet
        </Button>
      </div>
    </div>
  );
};

export default Quaiz;
