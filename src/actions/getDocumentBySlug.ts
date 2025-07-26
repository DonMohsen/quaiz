import { prisma } from "@/lib/prisma";

export const getDocumentBySlug = async (slug: string) => {
  try {
    const document = await prisma.document.findUnique({
      where: { slug },
      include: {
        user: true,
        views: true,
        flashCards: true,
        chats: true,
        quaizzes: true,
      },
    });

    return document;
  } catch (error) {
    console.error("❌ Failed to fetch one document:", error);

    // Handle known Prisma error types if needed
    throw new Error("Something went wrong while fetching one document.");
  }
};

export default getDocumentBySlug;
