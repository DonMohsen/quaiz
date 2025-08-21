import { z } from "zod";

export const flashcardsPreferencesSchema = z.object({
  numberOfFlashcards: z.union([
    z.literal("auto"),
    z.literal("5"),
    z.literal("10"),
    z.literal("15"),
    z.literal("20"),
  ]),
});



export type UserPreferencesInput = z.infer<typeof flashcardsPreferencesSchema>;
