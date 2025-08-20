// app/api/webhooks/clerk/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();

  // handle the webhook event
  // console.log('Received Clerk webhook:', body);

  return NextResponse.json({ received: true });
}
