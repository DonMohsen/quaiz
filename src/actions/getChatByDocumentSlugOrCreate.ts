import { prisma } from "@/lib/prisma";

export const getChatByDocumentSlugOrCreate=async({userId,slug}:{userId:string,slug:string})=>{


  let chat = await prisma.chat.findUnique({
    where: {
      userId_documentSlug: {
        userId,
        documentSlug: slug,
      },
    },
    include: {
      messages: {
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!chat) {
    chat = await prisma.chat.create({
      data: {
        userId,
        documentSlug: slug,
      },
      include: {
        messages: true,
      },
    });
    return chat
  }
  return chat
}