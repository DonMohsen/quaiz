import { HF_MODEL } from "@/lib/consts/ai";
import { AnsweringAIRequest, Role } from "@/types/ai.types";
import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";

// Create HF client
const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_TOKEN,
});

export async function POST(req: NextRequest) {

      const body = (await req.json()) as AnsweringAIRequest;

  const { prompt,history,doc } = body
if (!prompt || !doc) {
  return NextResponse.json({ error: "No prompt or doc!" }, { status: 400 });
}
const safeHistory = (history || [])
  .filter(
    (msg) =>
      typeof msg?.role === "string" &&
      typeof msg?.content === "string" &&
      ["user", "assistant"].includes(msg.role.toLowerCase()) // normalize roles
  )
  .slice(-5) // only last 5 messages
  .map((msg) => ({
    role: msg.role.toLowerCase() === "ai" ? "assistant" : msg.role.toLowerCase(),
    content: msg.content,
  }));

const stream = await client.chat.completions.create({
  model: HF_MODEL,
  messages: [
    {
      role: "system",
      content: `You are answering the user depending on the document and should keep the answers short. Keep the conversation relevant to the document. If the user goes off-topic, gently remind them. The document: ${doc}`,
    },
    ...safeHistory.map((msg) => ({
      role: msg.role as Role,
      content: msg.content,
    })),
    {
      role: "user",
      content: prompt,
    },
  ],
  stream: true,
});

console.log("stream===============>",stream);

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