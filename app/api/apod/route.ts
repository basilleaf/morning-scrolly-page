export async function GET() {
  const apiKey = process.env.NASA_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "Missing NASA_API_KEY" }, { status: 500 });
  }

  const res = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`,
    { next: { revalidate: 86400 } },
  );

  if (!res.ok) {
    return Response.json({ error: "Failed to fetch APOD" }, { status: 502 });
  }

  const data = await res.json();

  return Response.json({
    title: data.title ?? null,
    url: data.url ?? null,
    hdurl: data.hdurl ?? null,
    explanation: data.explanation ?? null,
    media_type: data.media_type ?? "image",
    thumbnail_url: data.thumbnail_url ?? null,
    copyright: data.copyright ?? null,
    date: data.date ?? null,
  });
}
