import { DocumentView, Prisma } from "@prisma/client";

export type DocumentWithRelations = Prisma.DocumentGetPayload<{
  include: {
    views: {
      include:{
        user:true
      }
    }
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

// Type for DocumentView including its related document
export type DocumentViewWithDocument = Prisma.DocumentViewGetPayload<{
  include: { document: true };
}>;
