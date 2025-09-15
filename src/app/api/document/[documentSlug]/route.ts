// src/app/api/document/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";


export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ documentSlug: string }> }
) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { documentSlug } = await params;
    if (!documentSlug) {
      return NextResponse.json(
        { error: "Invalid documentSlug" },
        { status: 400 }
      );
    }

    // ✅ Find document
    const existingDoc = await prisma.document.findUnique({
      where: { slug: documentSlug },
    });

    if (!existingDoc) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    // ✅ Check ownership
    if (existingDoc.userId !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // ✅ Delete if owner
    const deleted = await prisma.document.delete({
      where: { slug: documentSlug },
    });

    return NextResponse.json(deleted, { status: 200 });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete document" },
      { status: 500 }
    );
  }
}
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ documentSlug: string }> }
) {
  try {
    const { documentSlug } = await params;

    if (!documentSlug)
      return NextResponse.json(
        { error: "Invalid documentSlug" },
        { status: 400 }
      );

    const found = await prisma.document.findUnique({
      where: { slug: documentSlug },
      include: {
        user: true,
        chats: true,
        flashCards: true,
        quaizzes: true,
        views: {
          include: { user: true },
        },
      },
    });
    return NextResponse.json(found, { status: 200 });
  } catch (error) {
    console.error("Find unique error:", error);
    return NextResponse.json(
      { error: "Failed to find a single document" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ documentSlug: string }> }
) {
  try {
    const { userId } = getAuth(req); // get current logged-in user
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { documentSlug } = await params;
    const data = await req.json();

    // ✅ Find existing doc
    const existingDoc = await prisma.document.findUnique({
      where: { slug: documentSlug },
    });

    if (!existingDoc) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 }
      );
    }

    // ✅ Check ownership
    if (existingDoc.userId !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // ✅ Prevent slug change (ignore if provided)
    const { slug, ...updatableFields } = data;

    const updatedDoc = await prisma.document.update({
      where: { slug: documentSlug },
      data: updatableFields,
    });

    return NextResponse.json(updatedDoc, { status: 200 });
  } catch (error) {
    console.error("Update Document Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
