// src/app/api/document/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
  const { id } = await params;
    const parsedId =await parseInt(id, 10);

    if (isNaN(parsedId)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

    const deleted = await prisma.document.delete({ where: { id:parsedId } });

    return NextResponse.json(deleted, { status: 200 });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json({ error: 'Failed to delete document' }, { status: 500 });
  }
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
  const { id } = await params;
    const parsedId =await parseInt(id, 10);

    if (isNaN(parsedId)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

    const found = await prisma.document.findUnique({ where: { id:parsedId } });

    return NextResponse.json(found, { status: 200 });
  } catch (error) {
    console.error("Find unique error:", error);
    return NextResponse.json({ error: 'Failed to find a single document' }, { status: 500 });
  }
}
