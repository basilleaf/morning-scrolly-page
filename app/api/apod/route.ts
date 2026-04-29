export async function GET() {
  // TODO: fetch from https://api.nasa.gov/planetary/apod?api_key=NASA_API_KEY
  // requires NASA_API_KEY env var
  return Response.json({
    title: null,
    url: null,
    explanation: null,
    media_type: null,
    date: new Date().toDateString(),
  });
}
