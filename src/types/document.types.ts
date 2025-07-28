import { Prisma } from "@prisma/client";

export type DocumentWithRelations = Prisma.DocumentGetPayload<{
  include: {
    views: true;
    flashCards: true;
    quaizzes: true;
    user: true;
    chats: {
      include: {
        messages:true;
      };
    };
  };
}>;
