import useQuaizStore from "@/store/quaizStore";
import React, { useState } from "react";
import { Button } from "../ui/Button";
import useAnswersStore from "@/store/answersStore";
import { useQuaizAnswers } from "@/hooks/useQuaizAnswers";
import { useQuaizzes } from "@/hooks/useQuaizzes";
import { useModalStore } from "@/store/ModalStore";
import { toast } from "sonner";
import { getTextDirection } from "@/lib/utils/getTextDirection";
import MarkerBar from "../modals/MarkerBar";
import { motion } from "framer-motion";

const Quaiz = ({ userId }: { userId: string }) => {
const { mutate: saveAnswers, isPending:loading, error } = useQuaizAnswers();
  const { closeModal } = useModalStore();
  const [userAnswerState, setUserAnswerState] = useState<number | null>(null);
  const { currentQuestion, setCurrentQuestion, quaiz, setQuaiz } =
    useQuaizStore();
  const { addAnswer, answers, resetAnswers } = useAnswersStore();
  const { refetch } = useQuaizzes({ userId });

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

    // everything here runs *after* the mutation is finished
    setQuaiz(null);
    setCurrentQuestion(null);
    resetAnswers();
    closeModal();
    refetch();

    toast(`Quaiz is completed, Now wait for the results!`);
  } catch (err) {
    console.error("Failed to save quiz:", err);
  }
};

  return (
    <div className="w-full h-full flex flex-col items-center justify-start relative p-5">
       <div className="absolute top-0 w-[50%] max-md:w-[80%] ">
      <MarkerBar current={currentQuestion} max={quaiz.questions.length-1} />

      </div>
      {/* <p className="w-full text-center">
        {currentQuestion + 1}/{quaiz.questions.length}
      </p> */}

<motion.p
  className="mt-[70px] text-xl font-semibold text-center px-4"
  dir={getTextDirection(currentQ.text)}
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
>
  {currentQ.text}
</motion.p>
     <div className="flex flex-col w-full gap-4 mt-6">
  {currentQ.options.map((option, index) => {
    const isSelected = userAnswerState === index;
    const isCorrect = option.isCorrect && userAnswerState !== null;

    return (
      <motion.div
        key={option.id}
        onClick={() =>
          userAnswerState === null &&
          handleUserAnswer(option.id, option.isCorrect, index)
        }
        className={`flex items-center cursor-pointer justify-between w-full px-4 py-4 rounded-2xl shadow-sm border transition-all 
          ${
            userAnswerState === null
              ? "cursor-pointer bg-white hover:shadow-md hover:bg-slate-50"
              : isCorrect
              ? "bg-green-400 text-white"
              : isSelected
              ? "bg-red-400 text-white"
              : "bg-slate-200 text-gray-700"
          }`}
        whileTap={{ scale: 0.97 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
      >
        <p
          className="flex-1 text-right font-medium"
          dir={getTextDirection(option.text)}
        >
          {option.text}
        </p>
        <motion.div
          className="flex items-center justify-center w-10 h-10 ml-2 rounded-xl bg-slate-100 font-semibold"
          animate={
            isCorrect
              ? { scale: [1, 1.2, 1], backgroundColor: "#22c55e" }
              : isSelected
              ? { scale: [1, 1.1, 1], backgroundColor: "#ef4444", color: "#fff" }
              : {}
          }
          transition={{ duration: 0.4 }}
        >
          {index + 1}
        </motion.div>
      </motion.div>
    );
  })}
</div>

      {/* Next / Finish button */}
      <div className="absolute bottom-4 right-4">
        {userAnswerState !== null && (
          <Button
            loading={loading}
            className={`text-white font-medium ${
              currentQuestion + 1 === quaiz.questions.length
                ? "bg-purple-600"
                : "bg-sky-500"
            }`}
            disabled={loading}
            onClick={
              currentQuestion + 1 === quaiz.questions.length
                ? onFinished
                : handleClick
            }
          >
            {loading
              ? "wait..."
              : currentQuestion + 1 === quaiz.questions.length
              ? "Finish"
              : "Next"}
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
          {loading && "wait..."}
          Forfiet
        </Button>
      </div>
    </div>
  );
};

export default Quaiz;
