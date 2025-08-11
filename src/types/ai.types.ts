import { Prisma } from "@prisma/client";

export interface ChatMessage {
  role: Role;
  content: string;
}

export interface AnsweringAIRequest {
  stream:boolean
  prompt: string;
  doc: string;
  history: ChatMessage[];
}
export type Role = "user" | "system" | "assistant";


export type QuaizWithRelations = Prisma.QuaizGetPayload<{
  include: {
    user: true;            // include the user relation
    document: true;        // include the document relation
    questions: {
      include: {
        options: true;     // include options for each question
      };
    };
  };
}>;
