import { prisma } from "@/lib/prisma";

export const getAllDocuments = async () => {
  try {
    const documents = await prisma.document.findMany();

    return documents;
  } catch (error) {
    console.error("❌ Failed to fetch documents:", error);

    // Handle known Prisma error types if needed
    throw new Error("Something went wrong while fetching documents.");
  }
};

export default getAllDocuments;