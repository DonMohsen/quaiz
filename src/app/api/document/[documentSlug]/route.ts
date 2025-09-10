// src/app/api/document/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ documentSlug: string }> }
) {
  try {
  const { documentSlug } = await params;

    if (!documentSlug) return NextResponse.json({ error: 'Invalid documentSlug' }, { status: 400 });

    const deleted = await prisma.document.delete({ where: { slug:documentSlug } });

    return NextResponse.json(deleted, { status: 200 });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json({ error: 'Failed to delete document' }, { status: 500 });
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ documentSlug: string }> }
) {
  try {
  const { documentSlug } = await params;

    if (!documentSlug) return NextResponse.json({ error: 'Invalid documentSlug' }, { status: 400 });

  const found = await prisma.document.findUnique({
    where: { slug: documentSlug },
    include: {
      user: true,
      chats: true,
      flashCards: true,
      quaizzes: true,
      views: true,
    },
  });
    return NextResponse.json(found, { status: 200 });
  } catch (error) {
    console.error("Find unique error:", error);
    return NextResponse.json({ error: 'Failed to find a single document' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ documentSlug: string }> }
) {
  try {
    const { documentSlug } = await params;
    if (!documentSlug) {
      return NextResponse.json({ error: 'Invalid documentSlug' }, { status: 400 });
    }

    // ✅ get userId (this part depends on your auth, adjust as needed)
    const { userId } = await request.json(); // or from auth/session middleware
    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }

    // ✅ find the document by slug
    const document = await prisma.document.findUnique({
      where: { slug: documentSlug },
      select: { id: true },
    });

    if (!document) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }

    // ✅ upsert a view (unique constraint on [documentId, userId])
    const view = await prisma.documentView.upsert({
      where: {
        documentId_userId: {
          documentId: document.id,
          userId,
        },
      },
      update: {
        viewedAt: new Date(), // update timestamp if already exists
      },
      create: {
        documentId: document.id,
        userId,
      },
    });

    return NextResponse.json(view, { status: 200 });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ error: 'Failed to add view' }, { status: 500 });
  }
}
