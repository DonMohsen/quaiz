import { prisma } from "@/lib/prisma";

export const getChatWithDocument = async (userId:string,documentSlug:string) => {
  try {
const chat = await prisma.chat.findUnique({
  where: {
    userId_documentSlug: {
      userId,
      documentSlug,
    },
  },
});

    return chat;
  } catch (error) {
    console.error("❌ Failed to fetch documents:", error);

    // Handle known Prisma error types if needed
    throw new Error("Something went wrong while fetching documents.");
  }
};

export default getChatWithDocument;