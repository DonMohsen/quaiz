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
  title: z.string().optional(),
  image: z.string().optional(),
  questions: z.array(
    z.object({
      text: z.string(),
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
        title: data.title,
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
