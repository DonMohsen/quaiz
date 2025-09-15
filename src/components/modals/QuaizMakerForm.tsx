import React, { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import { DocumentWithRelations } from "@/types/document.types";
import { Button } from "../ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { quaizSchema } from "@/lib/validations/quaiz-creation-validation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Difficulty, Prisma, User } from "@prisma/client";
import useQuaizStore from "@/store/quaizStore";
import {
  QuaizCreatePayload,
  QuaizPayload,
  QuaizQuestionInput,
  QuaizWithRelations,
  
} from "@/types/quaiz.types";
import Quaiz from "../quaiz/Quaiz";
import { usePathname, useRouter } from "next/navigation";
import { useCreateQuaiz } from "@/hooks/useCreateQuaiz";
import { LoadingButton } from "../ui/LoadingButton";
import { toast } from "sonner";
export type GetPayloadQuaizType={
quaiz:{
  quaiz:QuaizWithRelations
}
}
const QuaizMakerForm = ({
  onClose,
  document,
  user,
}: {
  onClose: () => void;
  document: DocumentWithRelations;
  user: User;
}) => {
  const form = useForm<z.infer<typeof quaizSchema>>({
    resolver: zodResolver(quaizSchema),
    defaultValues: {
      questionCount: "auto",
      difficulty: "MEDIUM",
    },
  });
const [loading, setLoading] = useState(false)

  const { quaiz, setQuaiz, currentQuestion, setCurrentQuestion } =useQuaizStore();
      const pathName=usePathname();


// inside your component
// const { mutateAsync: createQuaiz, isPending, isError, error } = useCreateQuaiz();
async function onSubmit(values: z.output<typeof quaizSchema>) {
    try {
      setLoading(true)
      // 1. Fetch AI-generated quiz data
      const aiRes = await fetch("/api/answering-ai", {
        method: "POST",
        body: JSON.stringify({
          stream: false,
          prompt: `Depending on the document, create a quiz with difficulty ${values.difficulty} 
and the number of questions ${values.questionCount}. 
Answer only with one array of objects and the questions and options in the same language as the document exactly like this:
[{"title":"Math hard","question":"what is 2*2?","options":{"1":"2","2":"4"},"correctAnswerIndex":"4(start from 1 not 0)"}]`,
          doc: document?.text ?? "", // Ensure document is defined
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (!aiRes.ok) {
        console.error("AI response error:", aiRes.statusText);
                          toast(`AI is corrently overloaded !`)

        return;
      }
      type AiQuizResponse = Array<{
        title: string;
        question: string;
        options: Record<string, string>; // keys like "1", "2" with string values
        correctAnswerIndex: string; // numeric string index ("0", "1", etc.)
      }>;
      const aiData: AiQuizResponse = await aiRes.json();

      // 2. Transform AI data to match your schema
      const quizData: QuaizQuestionInput[] = aiData.map((item) => ({
        title:item.title,
        text: item.question,
        options: Object.values(item.options).map((optText, idx) => ({
          text: optText,
          isCorrect: idx === Number(item.correctAnswerIndex) - 1,
        })),
      }));

      // 3. Prepare payload for your /api/quaiz route
      const payload: QuaizPayload = {
        userId: user?.id ?? "",
        documentSlug: document?.slug ?? "",
        difficulty: values.difficulty,
        questionCount:
          values.questionCount === "auto" ? 5 : Number(values.questionCount),
        questions: quizData,
      };

      // setQuaiz(payload);
      
      setCurrentQuestion(0);
      // 4. Call your API route to save quiz in DB
      const saveRes = await fetch("/api/quaiz", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });
      if (!saveRes.ok) {
                                  toast(`Seems like AI got confused ! Try again please`)

        console.error("Failed to save quiz:", saveRes.statusText);
        return;
      }

      const savedQuiz:QuaizWithRelations  = await saveRes.json();
      console.log("Quiz saved successfully:", savedQuiz);
      setQuaiz(savedQuiz)
                                toast(`Your quaiz is ready !`)


      // Optional: show success UI, reset form, navigate, etc.
    } catch (error) {

      console.error("Error in onSubmit:", error);
    }finally{
      setLoading(false)
    }
  }
  useEffect(() => {
    console.log("The full quaiz=====>", quaiz);
  }, [quaiz,currentQuestion]);
 const isDocumentPage = /^\/documents\/[^/]+$/.test(pathName);

  if (!isDocumentPage) return null;

  return (
    <Modal onClose={onClose}>
      {quaiz&&currentQuestion!==null ? (
        <Quaiz userId={user.id}/>
      ) : (
        <div className="w-full h-full  relative">
          {/* Create Quiz Button */}
          <div className="absolute bottom-0 w-full flex items-center justify-end">
            <Button
            loading={loading}
              type="submit"
              form="quizForm"
              disabled={loading}
              className="bg-[#4f36f4]  text-white font-semibold text-[18px] shadow-[#382b96] shadow-md md:hover:brightness-150"
            >
              {loading?'...':'Create Quiz'}
              
            </Button>
          </div>

          <p className="text-[30px] font-semibold text-center max-md:text-[24px]">
            How would you like <br /> your Quaiz?
          </p>
          <p className="text-[16px] font-medium text-center max-md:text-[14px] mt-2 mb-10 text-black/[0.5]">
            adjust your quaiz settings below
          </p>
          {/* //!The form  */}
          <div className="w-full mx-auto max-lg:w-full">
            <Form {...form}>
              <form
                id="quizForm"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                {/* Username Field */}

                <FormField
                  control={form.control}
                  name="questionCount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of questions</FormLabel>
                      <FormControl>
                        <Select
                          defaultValue={field.value}
                          onValueChange={(val) =>
                            field.onChange(val === "auto" ? "auto" : val)
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                          <SelectContent className="z-[99999]">
                            <SelectGroup>
                              <SelectLabel>Options</SelectLabel>
                              <SelectItem value="auto">Auto</SelectItem>
                              <SelectItem value="5">5</SelectItem>
                              <SelectItem value="10">10</SelectItem>
                              <SelectItem value="15">15</SelectItem>
                              <SelectItem value="20">20</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="difficulty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Difficulty</FormLabel>
                      <FormControl>
                        <div className="flex gap-3">
                          {["EASY", "MEDIUM", "HARD"].map((level) => (
                            <button
                              key={level}
                              type="button"
                              onClick={() => field.onChange(level)}
                              className={`px-4 py-2 rounded-lg border font-medium capitalize
                ${
                  field.value === level
                    ? "bg-[#4f36f4] text-white border-[#4f36f4]"
                    : "bg-white text-black border-gray-300"
                }
              `}
                            >
                              {level.toLocaleLowerCase()}
                            </button>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
              </form>
            </Form>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default QuaizMakerForm;
