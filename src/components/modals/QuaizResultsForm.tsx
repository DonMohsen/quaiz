import { QuaizWithResults } from "@/types/quaiz.types";
import React from "react";
import Modal from "../ui/Modal";
import { getTextDirection } from "@/lib/utils/getTextDirection";
import { getDateFromPrisma } from "@/lib/utils/getDateFromPrisma";
import CircularProgressBar from "../ui/CircularProgressProps";
import { getColorByValue } from "@/lib/utils/getColorByValue";
import { motion } from "framer-motion";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CircleCheck, CircleX } from "lucide-react";

type Props = {
  quaizResults: QuaizWithResults;
  onClose: () => void;
};
const QuaizResultsForm = ({ quaizResults, onClose }: Props) => {
  const percentage = Math.round(
    (quaizResults.results[0].score / quaizResults.results[0].total) * 100
  );
  return (
    <Modal onClose={onClose}>
  <div className="w-full flex flex-col">
    {/* Header */}
    <div className="flex items-center justify-between px-[15%] pt-6 pb-4 max-sm:px-6 bg-gradient-to-r from-sky-500/10 to-purple-500/10 rounded-t-2xl">
      <div>
        <motion.p
          className="text-2xl font-bold"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {quaizResults.user.userName}
        </motion.p>
        <p className="text-[16px] text-black/60">
          Points:{" "}
          <span className="font-semibold text-sky-600">
            {quaizResults.results[0].score}/{quaizResults.results[0].total}
          </span>
        </p>
        <p className="text-[14px] text-black/50">
          Finished at {getDateFromPrisma(quaizResults.createdAt)}
        </p>
      </div>

      {/* Score Circle */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <CircularProgressBar
          color={getColorByValue(percentage)}
          max={quaizResults.results[0].total || 5}
          value={quaizResults.results[0].score}
          size={120}
          strokeWidth={10}
          textColor={getColorByValue(percentage)}
        />
      </motion.div>
    </div>

    {/* Metadata cards */}
    <div className="flex items-center justify-center gap-4 px-[15%] pt-4 max-sm:px-6">
      <div className="bg-white shadow rounded-xl px-4 py-2 text-sm font-medium text-gray-700">
        📘 Title:{" "}
        <span dir={getTextDirection(quaizResults.title || "ltr")}>
          {quaizResults.title}
        </span>
      </div>
      <div className="bg-white shadow rounded-xl px-4 py-2 text-sm font-medium text-gray-700">
        🎯 Level: {quaizResults.difficulty}
      </div>
    </div>

    {/* Results list */}
    <div className="flex flex-col items-center px-[15%] pt-6 max-sm:px-6">
      <p className="text-lg font-semibold mb-3">Your Answers</p>
      <motion.div
        className={`overflow-y-auto flex flex-col gap-3 max-h-[300px] w-full`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {quaizResults.questions.map((q, i) => {
          const userAnswer = q.userAnswers[0];
          const selectedOption = q.options.find(
            (o) => o.id === userAnswer?.selectedOptionId
          );
          const correctOption = q.options.find((o) => o.isCorrect);
          const titleDirection = getTextDirection(q.text || "ltr");

          const isCorrect = userAnswer?.isCorrect;

          return (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Accordion
                className={`rounded-xl px-3 py-2 border shadow-sm ${
                  isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                }`}
                dir={titleDirection}
                type="single"
                collapsible
              >
                <AccordionItem value={q.text}>
                  <AccordionTrigger className="font-medium">
                    {q.text}
                  </AccordionTrigger>
                  <AccordionContent className="space-y-2 text-sm">
                    {selectedOption ? (
                      <div className="flex items-center gap-2" dir={titleDirection}>
                        {selectedOption.isCorrect ? (
                          <CircleCheck className="text-green-600 w-4 h-4" />
                        ) : (
                          <CircleX className="text-red-600 w-4 h-4" />
                        )}
                        <span>{selectedOption.text}</span>
                      </div>
                    ) : (
                      <span className="italic text-gray-500">No answer</span>
                    )}

                    {/* Show correct option if user was wrong */}
                    {selectedOption &&
                      !selectedOption.isCorrect &&
                      correctOption && (
                        <div
                          dir={titleDirection}
                          className="flex items-center gap-2 text-green-600"
                        >
                          <CircleCheck className="w-4 h-4" />
                          <span>{correctOption.text}</span>
                        </div>
                      )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  </div>
</Modal>

  );
};

export default QuaizResultsForm;
