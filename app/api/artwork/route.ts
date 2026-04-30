import { seededRandom } from "@/app/_lib/content";

const TOTAL_PAGES = 131571;

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .trim();
}

export async function GET() {
  const dateStr = new Date().toDateString();
  const rng = seededRandom(dateStr);
  const page = Math.floor(rng() * TOTAL_PAGES) + 1;

  const res = await fetch(
    `https://api.artic.edu/api/v1/artworks?limit=1&page=${page}`,
    { next: { revalidate: 86400 } },
  );

  if (!res.ok) {
    return Response.json({ error: "Failed to fetch" }, { status: 502 });
  }

  const json = await res.json();
  const a = json.data?.[0];
  const iiifUrl: string =
    json.config?.iiif_url ?? "https://www.artic.edu/iiif/2";

  if (!a) {
    return Response.json({ error: "No artwork" }, { status: 404 });
  }

  const imageUrl: string | null = a.image_id
    ? `${iiifUrl}/${a.image_id}/full/843,/0/default.jpg`
    : null;

  const artistLine: string | null = a.artist_display
    ? (a.artist_display as string).split("\n")[0]
    : null;

  return Response.json({
    id: a.id,
    title: (a.title as string) ?? "Untitled",
    artist: artistLine,
    date: (a.date_display as string) ?? null,
    medium: (a.medium_display as string) ?? null,
    description: a.short_description
      ? stripHtml(a.short_description as string)
      : null,
    imageUrl,
    artworkUrl: `https://www.artic.edu/artworks/${a.id}`,
  });
}
