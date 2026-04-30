import Anthropic from "@anthropic-ai/sdk";
import {
  initArtworkStories,
  getArtworkStory,
  saveArtworkStory,
} from "@/app/_lib/db";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = parseInt(searchParams.get("id") ?? "0", 10);
  const title = searchParams.get("title") ?? "";
  const artist = searchParams.get("artist") ?? "";
  const date = searchParams.get("date") ?? "";
  const medium = searchParams.get("medium") ?? "";

  if (!id || !title) {
    return Response.json({ error: "Missing id or title" }, { status: 400 });
  }

  await initArtworkStories();

  const cached = await getArtworkStory(id);
  if (cached) {
    return Response.json({ story: cached });
  }

  const meta = [
    `Title: "${title}"`,
    artist && `Artist: ${artist}`,
    date && `Created: ${date}`,
    medium && `Medium: ${medium}`,
  ]
    .filter(Boolean)
    .join("\n");

  const prompt = `${meta}\n\nWrite 2–3 sentences about this artwork for a morning reader. Draw on the artist's life, the historical moment, the making of the piece, or a surprising detail. Be vivid and warm — no dry museum-card framing, no opener like "This painting…". Just the living story.`;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const webSearchTool: any = {
    type: "web_search_20250305",
    name: "web_search",
    max_uses: 3,
  };

  const messages: Anthropic.MessageParam[] = [
    { role: "user", content: prompt },
  ];

  let story = "";

  for (let turn = 0; turn < 8; turn++) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: any = await (client.messages.create as any)({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 400,
      tools: [webSearchTool],
      messages,
    });

    if (response.stop_reason === "end_turn") {
      story = (response.content as Anthropic.ContentBlock[])
        .filter((b) => b.type === "text")
        .map((b) => (b as Anthropic.TextBlock).text)
        .join("")
        .trim();
      break;
    }

    if (response.stop_reason === "tool_use") {
      // For server-side tools (web_search), the API handles execution and
      // returns results in the content. We add the assistant turn (which
      // includes both the tool_use request and any server_tool_result blocks)
      // then add placeholder tool_result blocks so the next user turn is valid.
      messages.push({ role: "assistant", content: response.content });

      const toolResults = (response.content as any[])
        .filter((b) => b.type === "tool_use")
        .map((b) => ({
          type: "tool_result",
          tool_use_id: b.id,
          content: "",
        }));

      if (toolResults.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        messages.push({ role: "user", content: toolResults as any });
      }
      continue;
    }

    break;
  }

  if (!story) {
    return Response.json({ error: "Failed to generate story" }, { status: 500 });
  }

  await saveArtworkStory(id, story);

  return Response.json({ story });
}
