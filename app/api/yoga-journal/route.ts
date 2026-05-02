import { BLOCKED_TOPICS } from "@/lib/content-filters";

function decodeEntities(str: string): string {
  return str
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&hellip;/g, "…")
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–");
}

export async function GET() {
  const res = await fetch("https://www.yogajournal.com/feed", {
    next: { revalidate: 3600 },
    headers: { "User-Agent": "Mozilla/5.0" },
  });

  if (!res.ok) {
    return Response.json({ error: "Failed to fetch" }, { status: 502 });
  }

  const xml = await res.text();

  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)]
    .filter((match) => {
      const titleMatch = match[1].match(
        /<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/,
      );
      const title = (titleMatch?.[1] ?? "").trim();
      return !title.includes("Deal of the Week") && !BLOCKED_TOPICS.test(title);
    })
    .slice(0, 5);

  const stories = items.map((match) => {
    const item = match[1];

    const titleMatch = item.match(
      /<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/,
    );
    const title = decodeEntities((titleMatch?.[1] ?? "").trim());

    const linkMatch = item.match(/<link>([\s\S]*?)<\/link>/);
    const link = (linkMatch?.[1] ?? "").trim();

    const descMatch = item.match(
      /<description>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/,
    );
    const rawDesc = (descMatch?.[1] ?? "")
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim();
    const description = decodeEntities(rawDesc)
      .replace(/\s*\[…\]\s*$/, "")
      .trim();

    const imageMatch =
      item.match(/<media:content[^>]+url="([^"]+)"/) ??
      item.match(/<media:thumbnail[^>]+url="([^"]+)"/) ??
      item.match(/<enclosure[^>]+url="([^"]+)"/) ??
      item.match(/<figure>\s*<img[^>]+src="([^"]+)"/);
    const imageUrl = imageMatch?.[1] ?? null;

    const pubDateMatch = item.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
    const pubDate = (pubDateMatch?.[1] ?? "").trim();

    return { title, link, description, imageUrl, pubDate };
  });

  return Response.json({ stories });
}
