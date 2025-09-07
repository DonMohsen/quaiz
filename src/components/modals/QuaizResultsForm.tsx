import { QuaizWithResults } from "@/types/quaiz.types";
import React from "react";
import Modal from "../ui/Modal";
import { getTextDirection } from "@/lib/utils/getTextDirection";
import { getDateFromPrisma } from "@/lib/utils/getDateFromPrisma";
import CircularProgressBar from "../ui/CircularProgressProps";
import { getColorByValue } from "@/lib/utils/getColorByValue";
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
      <div>
        <div className="flex items-center justify-between  w-full px-[20%] pt-5 max-sm:px-5">
          <div>
            <p className="text-2xl font-bold mb-4">
              {quaizResults.user.userName}
            </p>
            <p className="text-[16px] text-black/[0.5] mb-1">
              Points : {quaizResults.results[0].score}/
              {quaizResults.results[0].total}
            </p>

            <p className="text-[16px] text-black/[0.5]">
              Finished at {getDateFromPrisma(quaizResults.createdAt)}
            </p>
          </div>
          <div className="max-sm:hidden flex flex-col items-center justify-center">
            <CircularProgressBar
              color={getColorByValue(percentage)}
              max={quaizResults.results[0].total || 5}
              value={quaizResults.results[0].score}
              size={150}
              strokeWidth={10}
              textColor={getColorByValue(percentage)}
            />
          </div>
          <div className="sm:hidden">
            <CircularProgressBar
              color={getColorByValue(percentage)}
              max={quaizResults.results[0].total || 5}
              value={quaizResults.results[0].score}
              size={100}
              strokeWidth={10}
            />
          </div>
        </div>
        <div className="flex flex-col items-start justify-center  w-full px-[20%] pt-5 max-sm:px-5">
          <div className="flex items-center justify-center w-full gap-4">
            <p className="text-[16px] bg-slate-300 p-2 rounded-md ">
              Quaiz Title:{" "}
              <span dir={getTextDirection(quaizResults.title || "ltr")}>
                {quaizResults.title}
              </span>
            </p>
            <p className="text-[16px] bg-slate-200 p-2 rounded-md ">
              Quaiz Level: {quaizResults.difficulty}
            </p>
          </div>
          <div className="w-full flex flex-col items-center justify-center max-h-[300px] ">
            <p className="mt-5">Quaiz Content</p>
            <div
              className={`overflow-y-auto flex flex-col gap-2 ${
                getTextDirection(quaizResults.questions[0].text) === "rtl"
                  ? "text-right"
                  : "text-left"
              }`}
            >
              {quaizResults.questions.map((q) =>{
const userAnswer = q.userAnswers[0]; // or find by questionId if needed
const selectedOption = q.options.find(o => o.id === userAnswer?.selectedOptionId);
const correctOption = q.options.find(o => o.isCorrect); // if only one correct
const titleDirection = getTextDirection(q.text || "ltr");

               return(
                <Accordion
                  key={q.id}
                  className={` rounded-xl px-2 w-full ${
                    q.userAnswers.find((a) => a.questionId === q.id)?.isCorrect
                      ? "bg-green-50"
                      : "bg-red-50"
                  }`}
                  dir={getTextDirection(q.text)}
                  type="single"
                  collapsible
                >
                  <AccordionItem value={q.text}>
                    <AccordionTrigger
                      className={` ${
                        getTextDirection(quaizResults.questions[0].text) ===
                        "rtl"
                          ? "text-right"
                          : "text-left"
                      }`}
                      dir={getTextDirection(q.text)}
                    >
                      {q.text}
                    </AccordionTrigger>
                    <AccordionContent
                      className={` ${
                        getTextDirection(quaizResults.questions[0].text) ===
                        "rtl"
                          ? "text-right"
                          : "text-left"
                      }`}
                    >
                 {selectedOption ? (
    <div 
              dir={titleDirection}
className="flex items-center gap-2">
      {selectedOption.isCorrect ? (
        <CircleCheck className="text-green-600 w-4 h-4" />
      ) : (
        <CircleX className="text-red-600 w-4 h-4" />
      )}
      <span>{selectedOption.text}</span>
    </div>
  ) : (
    "No answer"
  )}

  {/* Show correct option if user was wrong */}
  {selectedOption && !selectedOption.isCorrect && correctOption && (
    <div
              dir={titleDirection}

    className="flex items-center gap-2 text-green-600">
      <CircleCheck className="w-4 h-4" />
      <span>{correctOption.text}</span>
    </div>
  )}
                      {/* {q.userAnswers.find(a=>a.questionId===q.id)} */}
                      {/* {q.options
                        .filter((o) => o.isCorrect === true)
                        .map((o) => (
                          <p className="flex gap-2" dir={getTextDirection(quaizResults.questions[0].text)} key={o.id}>
                            {q.userAnswers.find(a=>a.questionId===q.id)?.isCorrect?<CircleCheck className="" />:<CircleX />}
                            {o.text} 
                            </p>
                        ))} */}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )})}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default QuaizResultsForm;
