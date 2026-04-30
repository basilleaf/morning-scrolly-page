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
  const res = await fetch(
    "https://www.goodnewsnetwork.org/wp-json/wp/v2/posts?per_page=5&_embed",
    { next: { revalidate: 3600 }, headers: { "User-Agent": "Mozilla/5.0" } },
  );

  if (!res.ok) {
    return Response.json({ error: "Failed to fetch" }, { status: 502 });
  }

  const posts = await res.json();

  const stories = posts.map((post: Record<string, unknown>) => {
    const title = decodeEntities(
      ((post.title as Record<string, string>).rendered ?? "").replace(/<[^>]+>/g, ""),
    );

    const rawExcerpt = ((post.excerpt as Record<string, string>).rendered ?? "")
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim();
    const description = decodeEntities(rawExcerpt)
      .replace(/\s*\[…\]\s*$/, "")
      .trim();

    const media = ((post._embedded as Record<string, unknown[]>)?.["wp:featuredmedia"] ?? [])[0] as Record<string, unknown> | undefined;
    const sizes = (media?.media_details as Record<string, unknown>)?.sizes as Record<string, { source_url: string }> | undefined;
    const imageUrl =
      sizes?.medium?.source_url ??
      sizes?.["medium_large"]?.source_url ??
      (media?.source_url as string | undefined) ??
      null;

    return {
      title,
      link: post.link as string,
      description,
      imageUrl,
      pubDate: post.date as string,
    };
  });

  return Response.json({ stories });
}
