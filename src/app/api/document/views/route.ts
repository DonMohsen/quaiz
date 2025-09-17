// src/app/api/document/views/route.ts
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

   const views = await prisma.documentView.findMany({
  where: { userId },
  include: {
    document: true, // include full document object
  },
  orderBy: {
    viewedAt: "desc", // order by the view timestamp
  },
  take: 3, // latest 3
});

console.log("The views===========>",views);

    return NextResponse.json(views, { status: 200 });
  } catch (error) {
    console.error("Error fetching recent views:", error);
    return NextResponse.json({ error: "Failed to fetch recent views" }, { status: 500 });
  }
}
export async function POST(request: NextRequest) {
  try {
    const { userId, slug } = await request.json();

    if (!userId || !slug) {
      return NextResponse.json(
        { error: "Missing userId or slug" },
        { status: 400 }
      );
    }

    // find the document by slug
    const document = await prisma.document.findUnique({
      where: { slug },
    });

    if (!document) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    // create the view
    const newView = await prisma.documentView.upsert({
  where: {
    documentId_userId: {
      documentId: document.id,
      userId,
    },
  },
  update: {
    viewedAt: new Date(), // refresh the timestamp
  },
  create: {
    userId,
    documentId: document.id,
  },
});

    return NextResponse.json(newView, { status: 201 });
  } catch (error) {
    console.error("Error creating document view:", error);
    return NextResponse.json(
      { error: "Failed to create document view" },
      { status: 500 }
    );
  }
}
