import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  const documentSlug = searchParams.get('documentSlug');

  if (!userId || !documentSlug) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  const chat = await prisma.chat.findFirst({
    where: {
      user:{id:userId},
      documentSlug,
    },
    include: {
      messages: {
        
       
      },
    },
  });

  return NextResponse.json(chat);
}
