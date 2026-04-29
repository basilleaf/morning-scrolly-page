import Anthropic from "@anthropic-ai/sdk";
import { initTaoReflections, getTaoReflection, saveTaoReflection } from "@/app/_lib/db";
import { TAO } from "@/app/_lib/content";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const verse = parseInt(searchParams.get("verse") ?? "1", 10);

  const entry = TAO.find((t) => t.verse === verse);
  if (!entry) {
    return Response.json({ error: "Verse not found" }, { status: 404 });
  }

  await initTaoReflections();

  const cached = await getTaoReflection(verse);
  if (cached) {
    return Response.json({ reflection: cached, verse });
  }

  const message = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 300,
    messages: [
      {
        role: "user",
        content: `Here is Verse ${verse} of the Tao Te Ching:\n\n"${entry.text}"\n\nWrite a brief modern reflection on this verse — 2-3 sentences that translate its wisdom into everyday contemporary life. Be warm, grounded, and direct. No academic framing, no mentions of the Tao Te Ching or its author. Just the living insight.`,
      },
    ],
  });

  const reflection =
    message.content[0].type === "text" ? message.content[0].text.trim() : "";

  await saveTaoReflection(verse, reflection);

  return Response.json({ reflection, verse });
}
