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

    const found = await prisma.document.findUnique({ where: { slug:documentSlug } });

    return NextResponse.json(found, { status: 200 });
  } catch (error) {
    console.error("Find unique error:", error);
    return NextResponse.json({ error: 'Failed to find a single document' }, { status: 500 });
  }
}