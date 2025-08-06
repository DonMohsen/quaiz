// app/api/chat/send/route.ts
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { content, documentSlug,userId,role} = body;

  if (!content || !documentSlug||!userId||!role) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // 🔍 Find or create the chat linked to the document
  let chat = await prisma.chat.findFirst({
    where: { documentSlug ,userId},
  });

  if (!chat) {
    chat = await prisma.chat.create({
      data: { documentSlug , userId },
    });
  }

  // ✅ Now create a new message in that chat
  const newMessage = await prisma.message.create({
    data: {
      content,
      role,// or "assistant" if you're streaming AI response
      chatId: chat.id,
    },
  });

  return NextResponse.json(newMessage);
}
