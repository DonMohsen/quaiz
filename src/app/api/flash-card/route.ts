import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

// Payload type (from Prisma)
export type FlashCardCreatePayload = Prisma.FlashCardCreateManyInput[];

// Response type (full FlashCard rows with IDs)
export type FlashCardCreateResponse = {
  flashcards: {
    id: number;
    title: string | null;
    text: string | null;
    image: string | null;
    tip: string | null;
    documentId: number;
    userId: string;
  }[];
};

export async function POST(req: Request) {
  try {
    const data: FlashCardCreatePayload = await req.json();

    if (!data || data.length === 0) {
      return new Response(
        JSON.stringify({ error: "No flashcards provided" }),
        { status: 400 }
      );
    }

    // 1. Create flashcards in bulk
    await prisma.flashCard.createMany({
      data,
    });

    // 2. Fetch the ones we just created
    //    (using documentId + userId from the first item as scope)
    const flashcards = await prisma.flashCard.findMany({
      where: {
        documentId: data[0].documentId,
        userId: data[0].userId,
      },
      orderBy: { id: "desc" }, // newest first
      take: data.length,        // fetch only what was just created
    });

    const response: FlashCardCreateResponse = { flashcards };

       return NextResponse.json(response, { status: 201 });

  } catch (err) {
    console.error("Error creating flashcards:", err);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
