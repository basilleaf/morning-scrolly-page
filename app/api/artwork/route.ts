import { seededRandom } from "@/app/_lib/content";
import { getMetArtworkCount, getMetArtworkAtOffset } from "@/app/_lib/db";

export async function GET() {
  const count = await getMetArtworkCount();
  if (!count) {
    return Response.json({ error: "No artworks in database" }, { status: 503 });
  }

  const dateStr = new Date().toDateString();
  const offset = Math.floor(seededRandom(dateStr)() * count);
  const artwork = await getMetArtworkAtOffset(offset);

  if (!artwork) {
    return Response.json({ error: "Artwork not found" }, { status: 404 });
  }

  return Response.json({
    id: artwork.object_id,
    title: artwork.title,
    artist: artwork.artist,
    date: artwork.date,
    medium: artwork.medium,
    description: artwork.description,
    imageUrl: artwork.image_url_small || artwork.image_url,
    artworkUrl:
      artwork.artwork_url ??
      `https://www.metmuseum.org/art/collection/search/${artwork.object_id}`,
  });
}
