import { z } from "zod";

export const quaizSchema = z.object({
  questionCount: z.enum(["auto", "5", "10", "15", "20"]),
  difficulty: z.enum(["easy", "medium", "hard"], {
    required_error: "Please select a difficulty",
  }),


});
