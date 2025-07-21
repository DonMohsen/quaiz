import { Prisma } from "@prisma/client";

export type DocumentWithRelations = Prisma.DocumentGetPayload<{
  include: {
    views: true;
    chats: true;
    flashCards: true;
    quaizzes: true;
    user: true;
  };
}>;
