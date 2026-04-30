import { NextResponse } from "next/server";
import { initNewsCache, getNewsCache, saveNewsCache } from "@/app/_lib/db";

export async function POST() {
  try {
    await initNewsCache();
    const cached = await getNewsCache(60);
    if (cached) return NextResponse.json(cached);

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY!,
        "anthropic-version": "2023-06-01",
        "anthropic-beta": "web-search-2025-03-05",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1000,
        tools: [{ type: "web_search_20250305", name: "web_search" }],
        system: `You are a concise local news filter. Search for breaking news and emergencies in the given location from the last 24 hours. Also check if Donald Trump has died or if a huge national event has occurred.

Respond in this exact JSON format only, no other text:
{
  "status": "all_clear" or "heads_up",
  "summary": "one sentence — either 'Nothing notable.' or a brief summary",
  "items": [] or [{"headline": "short headline", "severity": "low" or "medium" or "high"}]
}

Only flag: fires, floods, major accidents, road closures, power outages, major crime, significant weather, deaths of major public figures. Ignore: minor crime, politics, sports, celebrity news, real estate.`,
        messages: [
          {
            role: "user",
            content: "Check for anything I need to know about in 94546 (Castro Valley, CA) right now.",
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Anthropic API error:", data?.error?.message ?? JSON.stringify(data));
      return NextResponse.json(
        { status: "all_clear", summary: "Could not load briefing.", items: [] },
        { status: 500 }
      );
    }

    const textBlocks = (data.content ?? [])
      .filter((b: { type: string }) => b.type === "text")
      .map((b: { text: string }) => b.text)
      .join("");

    const clean = textBlocks.replace(/```json|```/g, "").trim();
    const result = JSON.parse(clean);
    await saveNewsCache(result);
    return NextResponse.json(result);
  } catch (err) {
    console.error("news-check error:", err);
    return NextResponse.json(
      { status: "all_clear", summary: "Could not load briefing.", items: [] },
      { status: 500 }
    );
  }
}
