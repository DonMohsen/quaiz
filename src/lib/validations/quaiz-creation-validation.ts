import { z } from "zod";
import { Difficulty } from '@prisma/client';

export const quaizSchema = z.object({
  questionCount: z.enum(["auto", "5", "10", "15", "20"]),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"], {
    required_error: "Please select a difficulty",
  }),


});
// src/lib/quaizSchema.ts

export const quaizCreateSchema = z.object({
  title: z.string().optional(),
  image: z.string().nullable().optional(),
  difficulty: z.nativeEnum(Difficulty),
  questionCount: z.number().int().positive(),
  user: z.object({
    connect: z.object({ id: z.string() }),
  }),
  document: z.object({
    connect: z.object({ slug: z.string() }),
  }),
  questions: z.object({
    create: z.array(
      z.object({
        text: z.string(),
        options: z.object({
          create: z.array(
            z.object({
              text: z.string(),
              isCorrect: z.boolean(),
            })
          ),
        }),
      })
    ),
  }),
});

export type QuaizCreatePayload = z.infer<typeof quaizCreateSchema>;
