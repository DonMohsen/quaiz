import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const quizResultSchema = z.object({
  userId: z.string(),
  quaizId: z.number().int(),
  score: z.number().int(),
  total: z.number().int(),
  answers: z.array(
    z.object({
      questionId: z.number().int(),
      selectedOptionId: z.number().int().nullable(), // null if skipped
      isCorrect: z.boolean(),
    })
  ),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const data = quizResultSchema.parse(json);

    const createdResult = await prisma.quizResult.create({
      data: {
        userId: data.userId,
        quaizId: data.quaizId,
        score: data.score,
        total: data.total,
        userAnswers: {
          create: data.answers.map((a) => ({
            userId: data.userId,
            questionId: a.questionId,
            selectedOptionId: a.selectedOptionId ?? null,
            isCorrect: a.isCorrect,
          })),
        },
      },
      include: {
        userAnswers: true,
      },
    });

    return NextResponse.json({ quizResult: createdResult }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ errors: err.errors }, { status: 400 });
    }
    console.error("Error creating QuizResult:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
