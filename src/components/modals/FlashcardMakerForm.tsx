import React, { useState } from "react";
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
import { flashcardsPreferencesSchema } from "@/lib/validations/flashcards-creation-validation";
import { FlashCardCreatePayload } from "@/types/flashcards.types";
import useFlashcardsStore from "@/store/flashcardsStore";
import { FlashCardCreateResponse } from "@/app/api/flash-card/route";
import Flashcard from "../Flashcard/Flashcard";
const FlashcardMakerForm = ({
  onClose,
  document,
  user,
}: {
  onClose: () => void;
  document: DocumentWithRelations;
  user: User;
}) => {
  const { flashcards, setFlashcards,setCurrentFlashcard } = useFlashcardsStore();
  const [loading, setLoading] = useState(false)
  async function onSubmit(
    values: z.output<typeof flashcardsPreferencesSchema>
  ) {
    try {
      setLoading(true)
      // 1. Fetch AI-generated quiz data
      const aiRes = await fetch("/api/answering-ai", {
        method: "POST",
        body: JSON.stringify({
          stream: false,
          prompt: `Depending on the document, create a list of ${values.numberOfFlashcards} number of flashcards
           in the same language as the document, you must answer
            in this exact json only to automatically use it in my frontend, No markdown, no explanation, no backticks. Only raw JSON:[{title:"api","tip":"api is interface","text":"API is..."}] 
            the title is the thing user see first, then after the flip of flash card, they gonna see the tip as the remembering 
            of the flashcard, and the text is the short explanation of the title`,
          doc: document.text ?? "", // Ensure document is defined
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (!aiRes.ok) {
        console.error("AI response error:", aiRes.statusText);
        return;
      }
      type AiQuizResponse = Array<{
        title: string;
        tip: string;
        text: string;
      }>;
      const aiData: AiQuizResponse = await aiRes.json();

      // 2. Transform AI data to match your schema

      const payload: FlashCardCreatePayload = aiData.map((item) => ({
        title: item.title,
        text: item.text,
        tip: item.tip,
        image: null,
        documentId: document.id,
        userId: user.id,
      }));

      // setQuaiz(payload);

      // 4. Call your API route to save quiz in DB
      const saveRes = await fetch("/api/flash-card", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });
      if (!saveRes.ok) {
        console.error("Failed to save quiz:", saveRes.statusText);
        return;
      }

      const { flashcards: flashcardsRes }: FlashCardCreateResponse =
        await saveRes.json();
      console.log("flashcards saved successfully:", flashcardsRes);
      setFlashcards(flashcardsRes);
      setCurrentFlashcard(0)
      
      // Optional: show success UI, reset form, navigate, etc.
    } catch (error) {
      console.error("Error in onSubmit:", error);
    }finally{
      setLoading(false)
    }
  }
const form = useForm<z.infer<typeof flashcardsPreferencesSchema>>({
  resolver: zodResolver(flashcardsPreferencesSchema),
  defaultValues: {
    numberOfFlashcards: "5", // must be string
  },
});

  return (
    <Modal onClose={onClose}>
      {flashcards ? (
        <Flashcard />
      ) : (
        <div className="w-full h-full bg-white relative">
          {/* Create Quiz Button */}
          <div className="absolute bottom-0 w-full flex items-center justify-end">
            <Button
            loading={loading}
              type="submit"
              form="quizForm"
              className="bg-[#4f36f4] text-white font-semibold text-[18px] shadow-[#382b96] shadow-md md:hover:brightness-150"
            >
              Generate 
            </Button>
          </div>

          <p className="text-[30px] font-semibold text-center max-md:text-[24px]">
            How would you like your <br /> Flash cards?
          </p>
          <p className="text-[16px] font-medium text-center max-md:text-[14px] mt-2 mb-10 text-black/[0.5]">
            adjust your preferences below
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
                  name="numberOfFlashcards"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of flash cards</FormLabel>
                      <FormControl>
                        <Select
                          defaultValue={form.getValues("numberOfFlashcards")}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-[100%]">
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

                {/* Submit Button */}
              </form>
            </Form>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default FlashcardMakerForm;
