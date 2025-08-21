import { z } from "zod";
import { Difficulty } from '@prisma/client';

export const quaizSchema = z.object({
  questionCount: z.enum(["auto", "5", "10", "15", "20"]),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"], {
    required_error: "Please select a difficulty",
  }),


});
// src/lib/quaizSchema.ts



