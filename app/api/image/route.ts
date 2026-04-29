export async function GET() {
  // TODO: rotate between Met Open Access, Rijksmuseum, Wikimedia Featured Images
  // seeded by date so the same image shows all day
  return Response.json({
    url: null,
    title: null,
    source: null,
    artist: null,
    date: new Date().toDateString(),
  });
}
