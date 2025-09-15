import { prisma } from "@/lib/prisma";

export const getDocumentBySlug = async (slug: string) => {
  try {
    // decode %20 back into spaces (and other URL-encoded chars)
    const decodedSlug = decodeURIComponent(slug);

    const document = await prisma.document.findUnique({
      where: { slug: decodedSlug },
      include: {
        user: true,
        views: { include: { user: true } },
        flashCards: true,
        chats: {
          include: {
            messages: true,
          },
        },
        quaizzes: true,
      },
    });

    return document;
  } catch (error) {
    console.error("❌ Failed to fetch one document:", error);
    throw new Error("Something went wrong while fetching one document.");
  }
};

export default getDocumentBySlug;
