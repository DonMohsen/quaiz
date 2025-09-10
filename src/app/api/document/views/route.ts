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