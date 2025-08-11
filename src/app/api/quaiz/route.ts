// src/app/api/quaiz/route.ts
import { prisma } from '@/lib/prisma';
import { QuaizCreatePayload, quaizCreateSchema } from '@/lib/validations/quaiz-creation-validation';

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const data: QuaizCreatePayload = quaizCreateSchema.parse(json);

    const createdQuaiz = await prisma.quaiz.create({
      data,
      include: {
        user: true,
        document: true,
        questions: { include: { options: true } },
      },
    });

    return Response.json(createdQuaiz);
  } catch (error) {
    console.error(error);
    return new Response('Failed to create quiz', { status: 500 });
  }
}
