// Example: /api/chat/by-user-doc.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const slug = searchParams.get("slug");

  if (!userId || !slug) {
    return NextResponse.json({ error: "Missing params" }, { status: 400 });
  }

  const chat = await prisma.chat.findFirst({
    where: {
      userId,
      document: {
        slug,
      },
    },
    include: {
      messages: {
        orderBy: { createdAt: "asc" },
      },
    },
  });
  console.log("id of chat------------", chat);

  return NextResponse.json(chat);
}
