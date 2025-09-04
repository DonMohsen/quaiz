import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { Prisma } from "@prisma/client";

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
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const userId = searchParams.get("userId");
    const quaizId = searchParams.get("quaizId");

    // Fetch single result by id
    if (id) {
      const quizResult = await prisma.quizResult.findUnique({
        where: { id: Number(id) },
        include: {
          userAnswers: true,
          quaiz: {
            include: {
              questions: {
                include: {
                  options: true,
                },
              },
            },
          },
        },
      });

      if (!quizResult) {
        return NextResponse.json({ error: "QuizResult not found" }, { status: 404 });
      }

      return NextResponse.json(quizResult, { status: 200 });
    }

    // Build dynamic filter
const where: Prisma.QuizResultWhereInput = {};
if (userId) where.userId = userId;
if (quaizId) where.quaizId = Number(quaizId);    if (userId) where.userId = userId;
    if (quaizId) where.quaizId = Number(quaizId);

    // Fetch multiple results
    const results = await prisma.quizResult.findMany({
      where,
      include: {
        userAnswers: true,
        quaiz: true,
      }    });

    return NextResponse.json(results, { status: 200 });
  } catch (err) {
    console.error("Error fetching QuizResult(s):", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
