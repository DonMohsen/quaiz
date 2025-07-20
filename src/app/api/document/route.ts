// app/api/documents/route.ts
import { PrismaClient } from '@/generated/prisma'
import { NextResponse } from 'next/server'

export async function GET() {

const prisma = new PrismaClient()

  const docs = await prisma.document.findMany({
    include: {
      user: true,
      flashCards: true,
      quaizzes: true,
    },
  })

  return NextResponse.json(docs)
}
