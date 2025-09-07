import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { Difficulty } from '@prisma/client';

// Map Prisma Difficulty enum to Zod enum
const difficultyEnum = z.enum([Difficulty.EASY, Difficulty.MEDIUM, Difficulty.HARD]);

// Validation schema for quiz creation
const quaizCreateSchema = z.object({
  userId: z.string(),
  documentSlug: z.string(),
  difficulty: difficultyEnum,
  questionCount: z.number().int().positive(),
  image: z.string().optional(),
  questions: z.array(
    z.object({
      text: z.string(),
  title: z.string().optional(),
      options: z.array(
        z.object({
          text: z.string(),
          isCorrect: z.boolean(),
        }),
      ),
    }),
  ),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const data = quaizCreateSchema.parse(json);

    // Create quiz with nested questions and options
    const createdQuaiz = await prisma.quaiz.create({
      data: {
        title: data.questions[0].title,
        image: data.image||null,
        difficulty: data.difficulty,
        questionCount: data.questionCount,
        documentSlug: data.documentSlug,
        userId: data.userId,
        questions: {
          create: data.questions.map((q) => ({
            text: q.text,
            options: {
              create: q.options.map((o) => ({
                text: o.text,
                isCorrect: o.isCorrect,
              })),
            },
          })),
        },
      },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

return NextResponse.json(createdQuaiz);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    console.error("Error creating quiz:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const quaizId = Number(searchParams.get("id"));
    const userId = searchParams.get("userId");
    const documentSlug = searchParams.get("documentSlug");

    let where = {};

    if (quaizId) {
      where = { quaizId };
    } else if (userId) {
      where = { userId };
    } else if (documentSlug) {
      where = { documentSlug };
    }

    // If `id` is passed → return one quiz
    if (quaizId) {
      const quiz = await prisma.quaiz.findUnique({
        where: { id:quaizId },
        include: {
                  document:true,
                  user:true,

          results:true,
          questions: {
            include: {
              options: true,
            },
          },
        },
      });

      if (!quiz) {
        return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
      }
      
      return NextResponse.json(quiz);
    }

    // Otherwise return multiple quizzes
    const quizzes = await prisma.quaiz.findMany({
      where,
      include: {
        document:true,
        user:true,
        results:true,
        questions: {
          include: {
            options: true,
          },
        },
      },
    });
      console.log("this is payload in server============>",quizzes);

    return NextResponse.json(quizzes);
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
