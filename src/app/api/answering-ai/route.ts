import { HF_MODEL } from "@/lib/consts/ai";
import { NextRequest } from "next/server";
import { OpenAI } from "openai";

// Create HF client
const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_TOKEN,
});

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  const stream = await client.chat.completions.create({
    model: HF_MODEL, // ✅ You can change to another HF-compatible model
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    stream: true,
  });

  // Convert Hugging Face stream to a ReadableStream for Next.js
  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const content = chunk.choices?.[0]?.delta?.content || "";
        controller.enqueue(encoder.encode(content));
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}