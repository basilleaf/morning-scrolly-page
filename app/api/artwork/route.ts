import { seededRandom } from "@/app/_lib/content";

async function getHighlightIds(): Promise<number[]> {
  const res = await fetch(
    "https://collectionapi.metmuseum.org/public/collection/v1/search?isHighlight=true&hasImages=true&isPublicDomain=true&q=*",
    { next: { revalidate: 604800 } }, // refresh weekly
  );
  if (!res.ok) throw new Error("Failed to fetch Met highlights");
  const json = await res.json();
  return json.objectIDs as number[];
}

export async function GET() {
  let ids: number[];
  try {
    ids = await getHighlightIds();
  } catch {
    return Response.json(
      { error: "Failed to fetch artwork list" },
      { status: 502 },
    );
  }

  const dateStr = new Date().toDateString();
  const rng = seededRandom(dateStr);
  const startIdx = Math.floor(rng() * ids.length);

  let a: Record<string, unknown> | null = null;
  for (let i = 0; i < 20; i++) {
    const id = ids[(startIdx + i) % ids.length];
    const res = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`,
      { next: { revalidate: 86400 } },
    );
    if (!res.ok) continue;
    const candidate = await res.json();
    if (candidate.primaryImageSmall || candidate.primaryImage) {
      a = candidate;
      break;
    }
  }

  if (!a) {
    return Response.json(
      { error: "No artwork with image found" },
      { status: 404 },
    );
  }

  return Response.json({
    id: a.objectID,
    title: a.title ?? "Untitled",
    artist: a.artistDisplayName || null,
    date: a.objectDate || null,
    medium: a.medium || null,
    description: a.creditLine || null,
    imageUrl: a.primaryImageSmall || a.primaryImage || null,
    artworkUrl:
      a.objectURL ??
      `https://www.metmuseum.org/art/collection/search/${a.objectID}`,
  });
}
