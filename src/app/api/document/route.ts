import { NextRequest, NextResponse } from "next/server"
import { Prisma } from "@prisma/client"
import { prisma } from "@/lib/prisma"
import { revalidateTag } from "next/cache"

// Create a new document
export async function POST(req: NextRequest) {
  try {
    const documentData: Prisma.DocumentCreateInput = await req.json()

    if (!documentData.slug || !documentData.user) {
      return NextResponse.json(
        { error: "Missing required fields or invalid data." },
        { status: 400 }
      )
    }

    const newDocument = await prisma.document.create({
      data: documentData,
    })

    revalidateTag("document")

    return NextResponse.json(newDocument, { status: 201 })
  } catch (error) {
    console.error("Error creating document:", error)
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    )
  }
}

// Fetch documents (optionally filtered by userId)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get("userId")
    const slug = searchParams.get("slug")

    // ✅ Slug check
    if (slug) {
      const exists = await prisma.document.findFirst({
        where: { slug }, // findFirst works even if slug isn't unique
      })
      return NextResponse.json({ exists: !!exists }, { status: 200 })
    }

    // ✅ User filter
    const documents = await prisma.document.findMany({
      where: userId ? { userId } : undefined,
    })

    return NextResponse.json(documents, { status: 200 })
  } catch (error) {
    console.error("Error fetching documents:", error)
    return NextResponse.json(
      { error: "Failed to fetch documents." },
      { status: 500 }
    )
  }
}
